package com.ecm.ecmis.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecm.ecmis.models.DureeStage;

@Repository
public interface DureeStageDao extends JpaRepository<DureeStage, Long> {
    DureeStage findByAnneeAnneeAndTypeStageType(String annee, String type);

    List<DureeStage> findByAnneeAnnee(String annee);

    List<DureeStage> findByTypeStageType(String type);

    void deleteByAnneeAnneeAndTypeStageType(String annee, String type);
}
