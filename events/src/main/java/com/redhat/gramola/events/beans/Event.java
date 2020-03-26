package com.redhat.gramola.events.beans;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;

import io.quarkus.hibernate.orm.panache.PanacheEntity;

@Entity
public class Event extends PanacheEntity {

    public String name;
    public String address;
    public String city;
    public String province;
    public String country;
    public String date;
    @Column(name="start_date")
    public String startDate;
    @Column(name="end_date")
    public String endDate;
    @Column(name="start_time")
    public String startTime;
    @Column(name="end_time")
    public String endTime;
    public String location;
    public String artist;
    public String description;
    public String image;

    public static List<Event> findEventsByCountryAndCity(String country, String city) {
        return find("country = ?1 and city = ?2", country, city).list();
    }
}