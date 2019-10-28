package nl.nickoosterhuis.venue.payload;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.time.OffsetDateTime;

@Getter
@Setter
public class EventRequest {

    @NotBlank
    private String title;

    @NotBlank
    private String description;

    //@NotBlank
    private OffsetDateTime startDateAndTime;

    //s@NotBlank
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
}
