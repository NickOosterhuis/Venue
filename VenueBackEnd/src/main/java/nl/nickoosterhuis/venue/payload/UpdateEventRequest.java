package nl.nickoosterhuis.venue.payload;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.time.OffsetDateTime;

@Getter
@Setter
public class UpdateEventRequest {
    @NotBlank
    private String title;

    @NotBlank
    private String description;

    private OffsetDateTime startDateAndTime;

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
