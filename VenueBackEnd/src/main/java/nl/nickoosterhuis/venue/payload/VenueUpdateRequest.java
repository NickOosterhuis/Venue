package nl.nickoosterhuis.venue.payload;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class VenueUpdateRequest {
    @NotBlank
    private String streetName;

    @NotBlank
    private String houseNumber;

    @NotBlank
    private String postalCode;

    @NotBlank
    private String state;

    @NotBlank
    private String country;

    private String phoneNumber;
}