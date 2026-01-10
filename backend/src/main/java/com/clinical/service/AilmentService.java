package com.clinical.service;

import com.clinical.dto.AilmentRequest;
import com.clinical.dto.AilmentResponse;
import com.clinical.model.Ailment;
import com.clinical.repository.AilmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AilmentService{

    private final AilmentRepository ailmentRepository;

    public List<Ailment> getAllAilments(){
        return ailmentRepository.findAll();
    }

    public AilmentResponse getAilment(String code){

        Optional<Ailment> ailment = ailmentRepository.findByCode(code);

        if(ailment.isEmpty()){
            throw new RuntimeException("Ailment doesn't exist!");
        }

        return toAilmentResponse(ailment.get());
    }

    public AilmentResponse createOrUpdateAilment(AilmentRequest ailmentRequest){

        Optional<Ailment> optionalAilment = ailmentRepository.findByCode(ailmentRequest.code());

        Ailment ailment = null;

        if(optionalAilment.isPresent()){
            ailment = optionalAilment.get();
        }else{
            ailment = new Ailment();
        }

        ailment.setCode(ailmentRequest.code());
        ailment.setName(ailmentRequest.name());
        ailment.setFieldsConfig(ailmentRequest.fieldsConfig());
        ailment.setActive(ailmentRequest.active());

        return toAilmentResponse(ailmentRepository.save(ailment));
    }

    private AilmentResponse toAilmentResponse(Ailment savedAilment) {
        return new AilmentResponse(
                savedAilment.getId(),
                savedAilment.getCode(),
                savedAilment.getName(),
                savedAilment.getFieldsConfig(),
                savedAilment.isActive()
        );
    }
}
