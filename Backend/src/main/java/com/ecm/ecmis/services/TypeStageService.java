package com.ecm.ecmis.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ecm.ecmis.models.TypeStage;
import com.ecm.ecmis.repositories.TypeStageDao;

@Service
public class TypeStageService {
    @Autowired
    private TypeStageDao typeStageDao;
    @Autowired
    private StageService stageService;
    @Autowired
    private CompetenceRequiseService competenceRequiseService;
    @Autowired
    private DureeStageService dureeStageService;

    public TypeStage findByType(String type) {
        return typeStageDao.findByType(type);
    }

    private TypeStage findById(Long id) {
        return typeStageDao.findById(id).orElse(null);
    }

    public List<TypeStage> findAll() {
        return typeStageDao.findAll();
    }

    @Transactional
    public int deleteByType(String type) {
        if (checkDeleteable(type)) {
            typeStageDao.deleteByType(type);
            return 1;
        }
        return -1;
    }

    public TypeStage save(TypeStage typeStage) {
        if (findByType(typeStage.getType()) != null)
            return null;
        return typeStageDao.save(typeStage);
    }

    TypeStage saveWith(TypeStage typeStage) {
        return typeStageDao.save(typeStage);
    }

    public int update(TypeStage typeStage) {
        if (!findById(typeStage.getId()).getType().equals(typeStage.getType())
                && findByType(typeStage.getType()) != null)
            return -1;
        typeStageDao.save(typeStage);
        return 1;
    }

    private boolean checkDeleteable(String type) {
        if (stageService.findByTypeStageType(type).isEmpty()
                && competenceRequiseService.findByTypeStageType(type).isEmpty()
                && dureeStageService.findByTypeStageType(type).isEmpty())
            return true;
        return false;
    }
}
