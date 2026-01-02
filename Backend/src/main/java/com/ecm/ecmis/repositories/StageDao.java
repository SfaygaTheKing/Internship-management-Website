package com.ecm.ecmis.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecm.ecmis.models.Stage;

@Repository
public interface StageDao extends JpaRepository<Stage, Long> {
    Stage findByNumero(String numero);

    List<Stage> findByEtudiantNumero(String numero);

    List<Stage> findByProfesseurNumero(String numero);

    List<Stage> findByAnneeAnnee(String annee);

    List<Stage> findByTuteurNumero(String numero);

    List<Stage> findByEntrepriseNumero(String numero);

    List<Stage> findByTypeStageType(String type);

    void deleteByNumero(String numero);
}
