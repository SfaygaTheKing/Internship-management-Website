package com.ecm.ecmis.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "typesStage")
public class TypeStage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String type;
    private int nbSemaines;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String numero) {
        this.type = numero;
    }

    public int getNbSemaines() {
        return nbSemaines;
    }

    public void setNbSemaines(int nbSemaines) {
        this.nbSemaines = nbSemaines;
    }

}
