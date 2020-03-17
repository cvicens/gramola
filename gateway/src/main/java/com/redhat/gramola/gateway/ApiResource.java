package com.redhat.gramola.gateway;

import com.redhat.gramola.gateway.beans.Event;
import com.redhat.gramola.gateway.beans.FileResponse;
import com.redhat.gramola.gateway.beans.FileUpload;
import com.redhat.gramola.gateway.beans.TimelineEntry;
import java.lang.String;
import java.util.List;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;

/**
 * A JAX-RS interface.  An implementation of this interface must be provided.
 */
@Path("/api")
public interface ApiResource {
  /**
   * Get all events
   */
  @Path("/events")
  @GET
  @Produces("application/json")
  List<Event> eventsGetAll();

  /**
   * Create new event
   */
  @Path("/events")
  @POST
  @Produces("application/octet-stream")
  @Consumes("application/json")
  Response eventsPost(Event data);

  @Path("/events/{country}/{city}")
  @GET
  @Produces("application/json")
  List<Event> eventsGetByCountryAndCity(@PathParam("country") String country,
      @PathParam("city") String city);

  @Path("/files/{fileId}")
  @GET
  @Produces({"image/png", "image/jpeg"})
  String filesGet(@PathParam("fileId") String fileId);

  @Path("/files/upload")
  @POST
  @Produces("application/json")
  @Consumes("multipart/form-data")
  FileResponse filesPost(FileUpload data);

  @Path("/timeline")
  @POST
  @Produces("application/json")
  @Consumes("application/json")
  TimelineEntry timelinePost(TimelineEntry data);

  @Path("/timeline/{eventId}/{userId}")
  @GET
  @Produces("application/json")
  List<TimelineEntry> timelineGetByEventIdAndUserId(@PathParam("eventId") String eventId,
      @PathParam("userId") String userId);
}
