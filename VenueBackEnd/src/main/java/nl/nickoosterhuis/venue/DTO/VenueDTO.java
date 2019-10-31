package nl.nickoosterhuis.venue.DTO;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class VenueDTO {
    @NotBlank
    private String id;
    @NotBlank
    private UserDTO user;
    @NotBlank
    private String companyName;
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

    private String phoneNumber;
}
