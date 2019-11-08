package nl.nickoosterhuis.venue.payload;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class UpdatePasswordRequest {
    @NotBlank
    private String newPassword;

    @NotBlank
    private String newPasswordVerification;
}
