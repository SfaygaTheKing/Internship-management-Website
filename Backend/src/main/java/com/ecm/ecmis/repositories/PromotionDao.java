package com.ecm.ecmis.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecm.ecmis.models.Promotion;

@Repository
public interface PromotionDao extends JpaRepository<Promotion, Long> {
    Promotion findByAnnee(String annee);

    List<Promotion> findByProfesseurNumero(String numero);

    void deleteByAnnee(String annee);
}
