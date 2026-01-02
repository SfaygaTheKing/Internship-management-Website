package com.ecm.ecmis.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ecm.ecmis.models.Professeur;
import com.ecm.ecmis.repositories.ProfesseurDao;

@Service
public class ProfesseurService {
    @Autowired
    private ProfesseurDao professeurDao;
    @Autowired
    private StageService stageService;
    @Autowired
    private PromotionService promotionService;

    public Professeur findByNumero(String numero) {
        return professeurDao.findByNumero(numero);
    }

    private Professeur findById(Long id) {
        return professeurDao.findById(id).orElse(null);
    }

    public List<Professeur> findAll() {
        return professeurDao.findAll();
    }

    @Transactional
    public int deleteByNumero(String numero) {
        if (checkDeleteable(numero)) {
            professeurDao.deleteByNumero(numero);
            return 1;
        }
        return -1;
    }

    public Professeur save(Professeur professeur) {
        professeur.setNumero("P" + professeur.getNumero());
        if (findByNumero(professeur.getNumero()) != null)
            return null;
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        professeur.setPassword(bCryptPasswordEncoder.encode(professeur.getPassword()));
        professeur.setRole("PROFESSEUR");
        return professeurDao.save(professeur);
    }

    Professeur saveWith(Professeur professeur) {
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        professeur.setPassword(bCryptPasswordEncoder.encode(professeur.getPassword()));
        professeur.setRole("PROFESSEUR");
        return professeurDao.save(professeur);
    }

    public int update(Professeur professeur, boolean passwordChanged) {
        if (!findById(professeur.getId()).getNumero().equals(professeur.getNumero())
                && findByNumero(professeur.getNumero()) != null)
            return -1;
        if (passwordChanged) {
            BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
            professeur.setPassword(bCryptPasswordEncoder.encode(professeur.getPassword()));
        }
        professeurDao.save(professeur);
        return 1;
    }

    private boolean checkDeleteable(String numero) {
        if (stageService.findByProfesseurNumero(numero).isEmpty()
                && promotionService.findByProfesseurNumero(numero).isEmpty())
            return true;
        return false;
    }

}
