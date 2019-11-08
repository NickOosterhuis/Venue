package nl.nickoosterhuis.venue.DTO;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class UserDTO {
    @NotBlank
    private String id;
    @NotBlank
    private String name;
    @NotBlank
    private String email;

    private String profilePicture;

}
