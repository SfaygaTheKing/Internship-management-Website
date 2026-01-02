package com.ecm.ecmis.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ecm.ecmis.models.Entreprise;
import com.ecm.ecmis.models.Tuteur;
import com.ecm.ecmis.repositories.TuteurDao;

@Service
public class TuteurService {
    @Autowired
    private TuteurDao tuteurDao;
    @Autowired
    private EntrepriseService entrepriseService;
    @Autowired
    private StageService stageService;

    public Tuteur findByNumero(String numero) {
        return tuteurDao.findByNumero(numero);
    }

    List<Tuteur> findByEntrepriseNumero(String numero) {
        return tuteurDao.findByEntrepriseNumero(numero);
    }

    private Tuteur findById(Long id) {
        return tuteurDao.findById(id).orElse(null);
    }

    public List<Tuteur> findAll() {
        return tuteurDao.findAll();
    }

    @Transactional
    public int deleteByNumero(String numero) {
        if (checkDeleteable(numero)) {
            tuteurDao.deleteByNumero(numero);
            return 1;
        }
        return -1;
    }

    @Transactional
    public Tuteur save(Tuteur tuteur) {
        if (findByNumero(tuteur.getNumero()) != null)
            return null;
        checkComponents(tuteur);
        return tuteurDao.save(tuteur);
    }

    @Transactional
    public Tuteur update(Tuteur tuteur) {
        if (!findById(tuteur.getId()).getNumero().endsWith(tuteur.getNumero())
                && findByNumero(tuteur.getNumero()) != null)
            return null;
        checkComponents(tuteur);
        return tuteurDao.save(tuteur);
    }

    private boolean checkDeleteable(String numero) {
        if (stageService.findByTuteurNumero(numero).isEmpty())
            return true;
        return false;
    }

    private void checkComponents(Tuteur tuteur) {
        Entreprise entreprise = entrepriseService.findByNumero(tuteur.getEntreprise().getNumero());
        if (entreprise == null) {
            entreprise = entrepriseService.save(tuteur.getEntreprise());
            tuteur.setEntreprise(entreprise);
        }
    }

}
