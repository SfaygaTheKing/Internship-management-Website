package com.ecm.ecmis.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecm.ecmis.models.Competence;

@Repository
public interface CompetenceDao extends JpaRepository<Competence, Long> {
    Competence findByCode(String code);

    Competence findByLibelle(String libelle);

    void deleteByCode(String code);
}
