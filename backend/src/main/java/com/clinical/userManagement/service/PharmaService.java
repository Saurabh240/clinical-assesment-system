package com.clinical.userManagement.service;

import com.clinical.userManagement.dto.PharmacyRequest;
import com.clinical.userManagement.dto.PharmacyResponse;
import com.clinical.userManagement.dto.UserResponse;
import com.clinical.userManagement.model.Pharmacy;
import com.clinical.userManagement.model.SubscriptionDuration;
import com.clinical.userManagement.model.SubscriptionStatus;
import com.clinical.userManagement.model.Users;
import com.clinical.userManagement.repository.PharmaRepo;
import com.clinical.userManagement.repository.UserRepo;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PharmaService {

    private UserRepo userRepo;

    private PharmaRepo pharmaRepo;

    public PharmaService(UserRepo userRepo, PharmaRepo pharmaRepo) {
        this.userRepo = userRepo;
        this.pharmaRepo = pharmaRepo;
    }

    public UserResponse registerPharmacy(PharmacyRequest pharmacyRequest, Authentication authentication){

        String username = authentication.getName();

        Users user = userRepo.findByEmail(username);

        if(user==null){
            throw new UsernameNotFoundException("User don't exist! First login properly");
        }

        Pharmacy newPharma = null;

        SubscriptionDuration subscriptionDuration = new SubscriptionDuration(LocalDateTime.now(), LocalDateTime.now().plusDays(14));

        if(!pharmaRepo.existsByName(pharmacyRequest.name())){

            newPharma = new Pharmacy(
                    pharmacyRequest.name(),
                    pharmacyRequest.address(),
                    pharmacyRequest.phone(),
                    pharmacyRequest.fax(),
                    pharmacyRequest.logoUrl(),
                    SubscriptionStatus.TRIAL,
                    subscriptionDuration,
                    LocalDateTime.now()
            );

            newPharma = pharmaRepo.save(newPharma);

        }else{

            newPharma = pharmaRepo.getByName(newPharma.getName());

        }

        user.setPharmacy(newPharma);

        Users savedUser = userRepo.save(user);

        return new UserResponse(
                savedUser.getId(),
                savedUser.getPharmacy(),
                savedUser.getEmail(),
                savedUser.getPassword(),
                savedUser.getRole(),
                savedUser.getCreatedAt()
        );
    }

    public List<PharmacyResponse> getAllPharma(){

        List<Pharmacy> allPharma = pharmaRepo.findAll();

        return allPharma.stream().map(this::mapper).toList();
    }

    private PharmacyResponse mapper(Pharmacy pharmacy){

        return new PharmacyResponse(
                pharmacy.getId(),
                pharmacy.getName(),
                pharmacy.getAddress(),
                pharmacy.getPhone(),
                pharmacy.getFax(),
                pharmacy.getLogoUrl(),
                pharmacy.getSubscriptionStatus(),
                pharmacy.getCreatedAt()
        );

    }
}
