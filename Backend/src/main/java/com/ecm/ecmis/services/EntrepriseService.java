package com.ecm.ecmis.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ecm.ecmis.models.Entreprise;
import com.ecm.ecmis.repositories.EntrepriseDao;

@Service
public class EntrepriseService {
    @Autowired
    private EntrepriseDao entrepriseDao;
    @Autowired
    private StageService stageService;
    @Autowired
    private TuteurService tuteurService;

    public Entreprise findByNumero(String numero) {
        return entrepriseDao.findByNumero(numero);
    }

    private Entreprise findById(Long id) {
        return entrepriseDao.findById(id).orElse(null);
    }

    public List<Entreprise> findAll() {
        return entrepriseDao.findAll();
    }

    @Transactional
    public int deleteByNumero(String numero) {
        if (checkDeleteable(numero)) {
            entrepriseDao.deleteByNumero(numero);
            return 1;
        }
        return -1;
    }

    public Entreprise save(Entreprise entreprise) {
        if (findByNumero(entreprise.getNumero()) != null)
            return null;
        return entrepriseDao.save(entreprise);
    }

    public int update(Entreprise entreprise) {
        if (!findById(entreprise.getId()).getNumero().equals(entreprise.getNumero())
                && findByNumero(entreprise.getNumero()) != null)
            return -1;
        entrepriseDao.save(entreprise);
        return 1;
    }

    private boolean checkDeleteable(String numero) {
        if (stageService.findByEntrepriseNumero(numero).isEmpty()
                && tuteurService.findByEntrepriseNumero(numero).isEmpty())
            return true;
        return false;
    }
}
