package com.clinical.userManagement.service;

import com.clinical.userManagement.dto.*;
import com.clinical.userManagement.model.Pharmacy;
import com.clinical.userManagement.model.User;
import com.clinical.userManagement.model.UserStatus;
import com.clinical.userManagement.repository.PharmacyRepository;
import com.clinical.userManagement.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class PharmacyService {

    private final UserRepository userRepository;

    private final PharmacyRepository pharmacyRepository;

    public NextStepResponse joinExisting(JoinPharmacyRequest request, Authentication auth) {

        AuthUser authUser = (AuthUser) auth.getPrincipal();
        User user = userRepository
                .findByEmail(authUser.email())
                .orElseThrow();

        if (user.getPharmacy() != null) {
            throw new IllegalStateException("User already linked to pharmacy");
        }

        Pharmacy pharmacy = pharmacyRepository.findById(request.pharmacyId())
                .orElseThrow(() -> new RuntimeException("Pharmacy not found"));

        user.setPharmacy(pharmacy);
        user.setStatus(UserStatus.ACTIVE);
        userRepository.save(user);

        return new NextStepResponse("SUBSCRIPTION");
    }

    public NextStepResponse createNew(CreatePharmacyRequest request, Authentication auth) {

        AuthUser authUser = (AuthUser) auth.getPrincipal();
        User user = userRepository
                .findByEmail(authUser.email())
                .orElseThrow();

        if (user.getPharmacy() != null) {
            throw new IllegalStateException("User already linked to pharmacy");
        }

        Pharmacy pharmacy = new Pharmacy();
        pharmacy.setName(request.name());
        pharmacy.setAddress(request.address());
        pharmacy.setPhone(request.phone());
        pharmacy.setFax(request.fax());

        pharmacyRepository.save(pharmacy);

        user.setPharmacy(pharmacy);
        user.setStatus(UserStatus.ACTIVE);
        userRepository.save(user);

        return new NextStepResponse("SUBSCRIPTION");
    }

    public List<PharmacyResponse> listPharmacies(){

        List<Pharmacy> allPharma = pharmacyRepository.findAll();

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
                pharmacy.getCreatedAt()
        );

    }
}
