package com.ecm.ecmis.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecm.ecmis.models.Professeur;

@Repository
public interface ProfesseurDao extends JpaRepository<Professeur, Long> {
    Professeur findByNumero(String numero);

    void deleteByNumero(String numero);
}
