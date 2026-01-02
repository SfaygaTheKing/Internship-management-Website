package com.ecm.ecmis.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecm.ecmis.models.Entreprise;

@Repository
public interface EntrepriseDao extends JpaRepository<Entreprise, Long> {
    Entreprise findByNumero(String numero);

    void deleteByNumero(String numero);
}
