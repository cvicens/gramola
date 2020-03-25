CREATE OR REPLACE FUNCTION db_update(text) RETURNS integer
LANGUAGE plpgsql
AS $$
DECLARE
    
    -- Declare aliases for user input.
    user_name ALIAS FOR $1;
    
    -- Declare constants
    C_VERSION CONSTANT TEXT := '0.0.1';
    C_SCRIPT_NAME CONSTANT TEXT := 'events-database-update-0.0.1.sql';
    C_START_TIME CONSTANT TIME := NOW();

    -- Declare variables
    found_table TEXT;
    found_sequence TEXT;
    current_run_count INT;
BEGIN
    SELECT table_name INTO found_table FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'event';
    IF NOT FOUND THEN
        --
        -- Name: event; Type: TABLE; Schema: public; Owner: {{DB_USERNAME}}
        --

        CREATE TABLE IF NOT EXISTS public.event (
            id bigint NOT NULL,
            address CHARACTER VARYING(255),
            artist CHARACTER VARYING(255),
            city CHARACTER VARYING(255),
            country CHARACTER VARYING(255),
            date CHARACTER VARYING(255),
            description CHARACTER VARYING(255),
            end_time CHARACTER VARYING(255),
            image CHARACTER VARYING(255),
            location CHARACTER VARYING(255),
            name CHARACTER VARYING(255),
            province CHARACTER VARYING(255),
            start_time CHARACTER VARYING(255)
        );

        EXECUTE 'ALTER TABLE public.event OWNER TO ' || user_name;
        -- ALTER TABLE public.event OWNER TO user_name;

        --
        -- Name: event event_pkey; Type: CONSTRAINT; Schema: public; Owner: {{DB_USERNAME}}
        --

        ALTER TABLE ONLY public.event
            ADD CONSTRAINT event_pkey PRIMARY KEY (id);
    END IF;

    SELECT sequence_name INTO found_sequence FROM information_schema.sequences WHERE sequence_name = 'hibernate_sequence';
    IF NOT FOUND THEN
        --
        -- Name: hibernate_sequence; Type: SEQUENCE; Schema: public; Owner: {{DB_USERNAME}}
        --

        CREATE SEQUENCE  IF NOT EXISTS public.hibernate_sequence
            START WITH 1
            INCREMENT BY 1
            NO MINVALUE
            NO MAXVALUE
            CACHE 1;

        EXECUTE 'ALTER TABLE public.hibernate_sequence OWNER TO ' || user_name;
        --ALTER TABLE public.hibernate_sequence OWNER TO user_name;
    END IF;
    
    SELECT table_name INTO found_table FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'operator_version';
    IF NOT FOUND THEN
        --
        -- Name: event; Type: TABLE; Schema: public; Owner: {{DB_USERNAME}}
        --

        CREATE TABLE IF NOT EXISTS public.operator_version (
            version CHARACTER VARYING(50) NOT NULL,
            start_time TIME NOT NULL,
            end_time TIME NOT NULL,
            script_name CHARACTER VARYING(50) NOT NULL,
            run_count INT NOT NULL
        );

        EXECUTE 'ALTER TABLE public.operator_version OWNER TO ' || user_name;
        -- ALTER TABLE public.event OWNER TO user_name;

        --
        -- Name: event event_pkey; Type: CONSTRAINT; Schema: public; Owner: {{DB_USERNAME}}
        --

        ALTER TABLE ONLY public.operator_version
            ADD CONSTRAINT operator_version_pkey PRIMARY KEY (version);        
    END IF;

    SELECT operator_version.run_count INTO current_run_count FROM public.operator_version WHERE version = C_VERSION;
    IF NOT FOUND THEN
        INSERT INTO operator_version(version, start_time, end_time, script_name, run_count) VALUES (C_VERSION, C_START_TIME, NOW(), C_SCRIPT_NAME, 1);
    ELSE
        UPDATE operator_version SET run_count = current_run_count + 1 WHERE version = C_VERSION;
    END IF;

    RETURN 1;

END;
$$;

SELECT db_update('{{DB_USERNAME}}');
