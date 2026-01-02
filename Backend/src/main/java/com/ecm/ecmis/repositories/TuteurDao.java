package com.ecm.ecmis.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecm.ecmis.models.Tuteur;

@Repository
public interface TuteurDao extends JpaRepository<Tuteur, Long> {
    Tuteur findByNumero(String numero);

    List<Tuteur> findByEntrepriseNumero(String numero);

    void deleteByNumero(String numero);
}
