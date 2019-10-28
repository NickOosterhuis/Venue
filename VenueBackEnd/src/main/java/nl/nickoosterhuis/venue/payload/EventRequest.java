package nl.nickoosterhuis.venue.payload;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Getter
@Setter
public class EventRequest {

    @NotBlank
    private String title;

    @NotBlank
    private String description;

    @NotBlank
    private LocalDateTime startDateAndTime;

    @NotBlank
    private LocalDateTime endDateAndTime;

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
