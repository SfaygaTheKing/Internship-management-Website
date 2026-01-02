package com.ecm.ecmis.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecm.ecmis.models.Annee;

@Repository
public interface AnneeDao extends JpaRepository<Annee, Long> {
    Annee findByAnnee(String annee);

    void deleteByAnnee(String annee);
}
