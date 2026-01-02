package com.ecm.ecmis.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ecm.ecmis.models.Competence;
import com.ecm.ecmis.repositories.CompetenceDao;

@Service
public class CompetenceService {
    @Autowired
    private CompetenceDao competenceDao;
    @Autowired
    private CompetenceRequiseService competenceRequiseService;

    public Competence findByCode(String code) {
        return competenceDao.findByCode(code);
    }

    public Competence findByLibelle(String libelle) {
        return competenceDao.findByLibelle(libelle);
    }

    private Competence findById(Long id) {
        return competenceDao.findById(id).orElse(null);
    }

    public List<Competence> findAll() {
        return competenceDao.findAll();
    }

    @Transactional
    public int deleteByCode(String code) {
        if (checkDeleteable(code)) {
            competenceDao.deleteByCode(code);
            return 1;
        }
        return -1;
    }

    public Competence save(Competence competence) {
        if (findByCode(competence.getCode()) != null || findByLibelle(competence.getLibelle()) != null)
            return null;
        return competenceDao.save(competence);
    }

    Competence saveWith(Competence competence) {
        return competenceDao.save(competence);
    }

    public int update(Competence competence) {
        Competence found = findById(competence.getId());
        boolean a = !found.getCode().equals(competence.getCode()) && findByCode(competence.getCode()) != null;
        boolean b = !found.getLibelle().equals(competence.getLibelle())
                && findByLibelle(competence.getLibelle()) != null;
        if ((a && b) || a || b)
            return -1;
        competenceDao.save(competence);
        return 1;
    }

    private boolean checkDeleteable(String code) {
        if (competenceRequiseService.findByCompetenceCode(code).isEmpty())
            return true;
        return false;
    }
}
