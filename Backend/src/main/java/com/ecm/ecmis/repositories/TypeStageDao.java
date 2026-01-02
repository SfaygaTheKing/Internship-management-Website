package com.ecm.ecmis.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecm.ecmis.models.TypeStage;

@Repository
public interface TypeStageDao extends JpaRepository<TypeStage, Long> {
    TypeStage findByType(String type);

    void deleteByType(String type);
}
