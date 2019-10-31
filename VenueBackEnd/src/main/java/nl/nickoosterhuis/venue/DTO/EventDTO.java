package nl.nickoosterhuis.venue.DTO;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import java.time.OffsetDateTime;

@Getter
@Setter
public class EventDTO {
    @NotBlank
    private String id;
    @NotBlank
    private VenueDTO venue;
    @NotBlank
    private String title;
    @NotBlank
    private String description;
    @NotBlank
    private OffsetDateTime startDateAndTime;
    @NotBlank
    private OffsetDateTime endDateAndTime;
    @NotBlank
    private String streetName;
    @NotBlank
    private String postalCode;
    @NotBlank
    private String houseNumber;
    @NotBlank
    private String state;
    @NotBlank
    private String country;

    private Double payment;
}
