package nl.nickoosterhuis.venue.controllers;

import nl.nickoosterhuis.venue.exceptions.BadRequestException;
import nl.nickoosterhuis.venue.exceptions.ResourceNotFoundException;
import nl.nickoosterhuis.venue.models.Event;
import nl.nickoosterhuis.venue.models.User;
import nl.nickoosterhuis.venue.models.Venue;
import nl.nickoosterhuis.venue.payload.ApiResponse;
import nl.nickoosterhuis.venue.payload.EventRequest;
import nl.nickoosterhuis.venue.payload.UpdateEventRequest;
import nl.nickoosterhuis.venue.repositories.EventRepository;
import nl.nickoosterhuis.venue.repositories.UserRepository;
import nl.nickoosterhuis.venue.repositories.VenueRepository;
import nl.nickoosterhuis.venue.security.CurrentUser;
import nl.nickoosterhuis.venue.security.UserPrincipal;
import nl.nickoosterhuis.venue.util.UserPrincipalHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;

@RestController
@RequestMapping("/event")
public class EventController {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private VenueRepository venueRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserPrincipalHelper userPrincipalHelper;

    @GetMapping()
    public ResponseEntity<?> getEvents() {
        Iterable<Event> events = eventRepository.findAll();
        return new ResponseEntity<>(events, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getEventById(@PathVariable("id") String id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Event", "id", id));

        return new ResponseEntity<>(event, HttpStatus.OK);
    }

    @PostMapping
    //@PreAuthorize("hasRole('ROLE_VENUE')")
    public ResponseEntity<?> postVenue(@Valid @RequestBody EventRequest eventRequest, @CurrentUser UserPrincipal userPrincipal) {
        if(eventRepository.existsByTitle(eventRequest.getTitle())) {
            throw new BadRequestException("Event name already in use.");
        }

        User registeredUser = userPrincipalHelper.getUserPrincipal(userPrincipal);
        Venue registeredVenue = venueRepository.findByUser(registeredUser)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));

        Event event = new Event();
        event.setTitle(eventRequest.getTitle());
        event.setDescription(eventRequest.getDescription());
        event.setCountry(eventRequest.getCountry());
        event.setPostalCode(eventRequest.getPostalCode());
        event.setHouseNumber(eventRequest.getHouseNumber());
        event.setState(eventRequest.getState());
        event.setStreetName(eventRequest.getStreetName());
        event.setEndDateAndTime(eventRequest.getEndDateAndTime());
        event.setStartDateAndTime(eventRequest.getStartDateAndTime());
        event.setVenue(registeredVenue);


        Event result = eventRepository.save(event);

        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/event/")
                .buildAndExpand(result.getId()).toUri();

        return ResponseEntity.created(location)
                .body(new ApiResponse(true, "Event created successfully@"));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_VENUE')")
    public ResponseEntity<?> putEvent(@Valid @RequestBody UpdateEventRequest eventRequest, @PathVariable String id, @CurrentUser UserPrincipal userPrincipal) {
        if(eventRepository.existsByTitle(eventRequest.getTitle())) {
            throw new BadRequestException("Event name already in use.");
        }

        User registeredUser = userPrincipalHelper.getUserPrincipal(userPrincipal);
        Venue registeredVenue = venueRepository.findByUser(registeredUser)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));;

        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Venue", "id", id));

        if(!registeredVenue.getId().equals(event.getVenue().getId()))
            throw new BadRequestException("Venue is not the owner of the event");

        event.setPostalCode(eventRequest.getPostalCode());
        event.setStreetName(eventRequest.getStreetName());
        event.setState(eventRequest.getState());
        event.setHouseNumber(eventRequest.getHouseNumber());
        event.setCountry(eventRequest.getCountry());
        event.setDescription(eventRequest.getDescription());
        event.setTitle(eventRequest.getTitle());
        event.setEndDateAndTime(eventRequest.getEndDateAndTime());
        event.setStartDateAndTime(eventRequest.getStartDateAndTime());

        eventRepository.save(event);

        return ResponseEntity.accepted().body(new ApiResponse(true, "Event updated successfully@"));
    }

    @DeleteMapping("/{id}")
    //@PreAuthorize("hasRole('ROLE_VENUE')")
    public ResponseEntity<?> deleteEvent(@Valid @RequestBody UpdateEventRequest eventRequest, @PathVariable String id, @CurrentUser UserPrincipal userPrincipal) {
        User registeredUser = userPrincipalHelper.getUserPrincipal(userPrincipal);

        Venue registeredVenue = venueRepository.findByUser(registeredUser)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));
        ;

        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Venue", "id", id));

        if (!registeredVenue.getId().equals(event.getVenue().getId()))
            throw new BadRequestException("Venue is not the owner of the event");

        eventRepository.delete(event);

        return ResponseEntity.accepted().body(new ApiResponse(true, "Event deleted successfully@"));

    }
}
