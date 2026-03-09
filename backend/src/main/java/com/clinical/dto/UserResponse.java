package com.clinical.dto;

import com.clinical.model.Role;
import com.clinical.model.UserStatus;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserResponse {

    private Long id;
    private String email;
    private String firstName;
    private String lastName;
    private Role role;
    private UserStatus status;

    public UserResponse(Long id, String email, Role role, UserStatus status,String firstName,String lastName) {
        this.id = id;
        this.email = email;
        this.role = role;
        this.status = status;
        this.firstName= firstName;
        this.lastName= lastName;
    }

}
