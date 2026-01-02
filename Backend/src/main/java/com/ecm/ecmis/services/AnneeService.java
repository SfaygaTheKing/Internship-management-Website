package com.ecm.ecmis.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ecm.ecmis.models.Annee;
import com.ecm.ecmis.repositories.AnneeDao;

@Service
public class AnneeService {
    @Autowired
    private AnneeDao anneeDao;
    @Autowired
    private StageService stageService;
    @Autowired
    private DureeStageService dureeStageService;

    public Annee findByAnnee(String annee) {
        return anneeDao.findByAnnee(annee);
    }

    private Annee findById(Long id) {
        return anneeDao.findById(id).orElse(null);
    }

    public List<Annee> findAll() {
        return anneeDao.findAll();
    }

    @Transactional
    public int deleteByAnnee(String annee) {
        if (checkDeleteable(annee)) {
            anneeDao.deleteByAnnee(annee);
            return 1;
        }
        return -1;
    }

    public Annee save(Annee annee) {
        if (findByAnnee(annee.getAnnee()) != null)
            return null;
        return anneeDao.save(annee);
    }

    Annee saveWith(Annee annee) {
        return anneeDao.save(annee);
    }

    public int update(Annee annee) {
        if (!findById(annee.getId()).getAnnee().equals(annee.getAnnee()) &&
                findByAnnee(annee.getAnnee()) != null)
            return -1;
        anneeDao.save(annee);
        return 1;
    }

    private boolean checkDeleteable(String annee) {
        if (stageService.findByAnneeAnnee(annee).isEmpty() && dureeStageService.findByAnneeAnnee(annee).isEmpty())
            return true;
        return false;
    }
}
