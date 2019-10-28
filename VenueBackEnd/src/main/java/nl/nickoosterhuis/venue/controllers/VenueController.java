package nl.nickoosterhuis.venue.controllers;

import nl.nickoosterhuis.venue.exceptions.BadRequestException;
import nl.nickoosterhuis.venue.exceptions.ResourceNotFoundException;
import nl.nickoosterhuis.venue.models.Role;
import nl.nickoosterhuis.venue.models.User;
import nl.nickoosterhuis.venue.models.Venue;
import nl.nickoosterhuis.venue.payload.ApiResponse;
import nl.nickoosterhuis.venue.payload.VenueRequest;
import nl.nickoosterhuis.venue.repositories.RoleRepository;
import nl.nickoosterhuis.venue.repositories.UserRepository;
import nl.nickoosterhuis.venue.repositories.VenueRepository;
import nl.nickoosterhuis.venue.security.CurrentUser;
import nl.nickoosterhuis.venue.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.Collections;

@RestController
@RequestMapping("/venue")
public class VenueController {

    @Autowired
    private VenueRepository venueRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @GetMapping()
    public ResponseEntity<?> getVenues() {
        Iterable<Venue> venues = venueRepository.findAll();
        return new ResponseEntity<>(venues, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getVenueById(@PathVariable("id") String id) {
        Venue venue = venueRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Venue", "id", id));

        return new ResponseEntity<>(venue, HttpStatus.OK);
    }

    @PostMapping
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<?> postVenue(@Valid @RequestBody VenueRequest venueRequest, @CurrentUser UserPrincipal userPrincipal) {
        if(venueRepository.existsByCompanyName(venueRequest.getCompanyName())) {
            throw new BadRequestException("Company name already in use.");
        }

        Role role = roleRepository.findByRoleName("VENUE");

        User registeredUser = userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));

        registeredUser.setRoles(Collections.singletonList(role));
        userRepository.save(registeredUser);

        Venue venue = new Venue();
        venue.setCompanyName(venueRequest.getCompanyName());
        venue.setCountry(venueRequest.getCountry());
        venue.setPostalCode(venueRequest.getPostalCode());
        venue.setHouseNumber(venueRequest.getHouseNumber());
        venue.setPhoneNumber(venueRequest.getPhoneNumber());
        venue.setState(venueRequest.getState());
        venue.setStreetName(venueRequest.getStreetName());
        venue.setUser(registeredUser);

        Venue result = venueRepository.save(venue);

        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/venue/")
                .buildAndExpand(result.getId()).toUri();

        return ResponseEntity.created(location)
                .body(new ApiResponse(true, "Venue registered successfully@"));
    }
}
