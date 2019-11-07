package nl.nickoosterhuis.venue.controllers;

import nl.nickoosterhuis.venue.DTO.UserDTO;
import nl.nickoosterhuis.venue.DTO.VenueDTO;
import nl.nickoosterhuis.venue.exceptions.BadRequestException;
import nl.nickoosterhuis.venue.exceptions.ResourceNotFoundException;
import nl.nickoosterhuis.venue.models.Role;
import nl.nickoosterhuis.venue.models.User;
import nl.nickoosterhuis.venue.models.Venue;
import nl.nickoosterhuis.venue.payload.ApiResponse;
import nl.nickoosterhuis.venue.payload.VenueRequest;
import nl.nickoosterhuis.venue.payload.UpdateVenueRequest;
import nl.nickoosterhuis.venue.repositories.RoleRepository;
import nl.nickoosterhuis.venue.repositories.UserRepository;
import nl.nickoosterhuis.venue.repositories.VenueRepository;
import nl.nickoosterhuis.venue.security.CurrentUser;
import nl.nickoosterhuis.venue.security.UserPrincipal;
import nl.nickoosterhuis.venue.util.UserPrincipalHelper;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/venue")
public class VenueController {

    @Autowired
    private VenueRepository venueRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserPrincipalHelper userPrincipalHelper;

    private static ModelMapper modelMapper = new ModelMapper();

    @GetMapping()
    public ResponseEntity<?> getVenues() {
        Iterable<Venue> venues = venueRepository.findAll();
        List<VenueDTO> venueDto = new ArrayList<>();

        venues.forEach(v -> venueDto.add(convertToDTO(v)));
        return new ResponseEntity<>(venueDto, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getVenueById(@PathVariable("id") String id) {
        Venue venue = venueRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Venue", "id", id));

        return new ResponseEntity<>(convertToDTO(venue), HttpStatus.OK);
    }

    @PostMapping("/checkname")
    public ResponseEntity<?> checkIfNameIsTaken(@RequestBody String name) {
        if(venueRepository.existsByCompanyName(name)) {
            throw new BadRequestException("Company name already in use.");
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<?> postVenue(@Valid @RequestBody VenueRequest venueRequest, @CurrentUser UserPrincipal userPrincipal) {
        if(venueRepository.existsByCompanyName(venueRequest.getCompanyName())) {
            throw new BadRequestException("Company name already in use.");
        }

        Role role = roleRepository.findByRoleName("ROLE_VENUE").orElseThrow(() -> new ResourceNotFoundException("Role"));;

        User registeredUser = userPrincipalHelper.getUserPrincipal(userPrincipal);

        registeredUser.setRoles(Collections.singletonList(role));
        userRepository.save(registeredUser);

        Venue venue = new Venue();
        venue.setCompanyName(venueRequest.getCompanyName().trim());
        venue.setCountry(venueRequest.getCountry().trim());
        venue.setPostalCode(venueRequest.getPostalCode().trim());
        venue.setHouseNumber(venueRequest.getHouseNumber().trim());
        venue.setPhoneNumber(venueRequest.getPhoneNumber().trim());
        venue.setState(venueRequest.getState().trim());
        venue.setStreetName(venueRequest.getStreetName().trim());
        venue.setUser(registeredUser);

        Venue result = venueRepository.save(venue);

        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/venue/")
                .buildAndExpand(result.getId()).toUri();

        return ResponseEntity.created(location)
                .body(new ApiResponse(true, "Venue registered successfully@"));
    }

    @PutMapping
    @PreAuthorize("hasRole('ROLE_VENUE')")
    public ResponseEntity<?> putVenue(@Valid @RequestBody UpdateVenueRequest venueRequest, @CurrentUser UserPrincipal userPrincipal) {
        User currentUser = userPrincipalHelper.getUserPrincipal(userPrincipal);

        Venue venue = venueRepository.findByUser(currentUser)
                .orElseThrow(() -> new ResourceNotFoundException("Venue", "user_id", userPrincipal.getId()));

        venue.setPostalCode(venueRequest.getPostalCode().trim());
        venue.setStreetName(venueRequest.getStreetName().trim());
        venue.setState(venueRequest.getState().trim());
        venue.setHouseNumber(venueRequest.getHouseNumber().trim());
        venue.setCountry(venueRequest.getCountry().trim());
        venue.setPhoneNumber(venueRequest.getPhoneNumber().trim());

        venueRepository.save(venue);

        return ResponseEntity.accepted().body(new ApiResponse(true, "Venue updated successfully@"));
    }

    private VenueDTO convertToDTO(Venue venue) {
        VenueDTO venueDto = modelMapper.map(venue, VenueDTO.class);
        return venueDto;
    }
}
