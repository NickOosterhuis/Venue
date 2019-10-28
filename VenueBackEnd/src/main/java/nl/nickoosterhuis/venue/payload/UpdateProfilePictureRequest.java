package nl.nickoosterhuis.venue.payload;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class UpdateProfilePictureRequest {
    @NotBlank
    private String imageUrl;

    //TODO: check whats necessary to save image in POSTGRESQL
}
