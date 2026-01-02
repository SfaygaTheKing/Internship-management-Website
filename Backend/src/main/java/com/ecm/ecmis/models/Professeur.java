package com.ecm.ecmis.models;

import java.util.Date;

import com.ecm.ecmis.security.models.User;

import jakarta.persistence.Entity;

@Entity
public class Professeur extends User {

    private String numero;
    private String qualite;
    private String nom;
    private String prenom;
    private String adresse;
    private String codePostale;
    private String ville;
    private String telEcole;
    private String telDomicile;
    private Date dateEmbauche;
    private Date dateDepart;

    public String getNumero() {
        return numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public String getQualite() {
        return qualite;
    }

    public void setQualite(String qualite) {
        this.qualite = qualite;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getAdresse() {
        return adresse;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public String getCodePostale() {
        return codePostale;
    }

    public void setCodePostale(String codePostale) {
        this.codePostale = codePostale;
    }

    public String getVille() {
        return ville;
    }

    public void setVille(String ville) {
        this.ville = ville;
    }

    public String getTelEcole() {
        return telEcole;
    }

    public void setTelEcole(String telEcole) {
        this.telEcole = telEcole;
    }

    public String getTelDomicile() {
        return telDomicile;
    }

    public void setTelDomicile(String telDomicile) {
        this.telDomicile = telDomicile;
    }

    public Date getDateEmbauche() {
        return dateEmbauche;
    }

    public void setDateEmbauche(Date dateEmbauche) {
        this.dateEmbauche = dateEmbauche;
    }

    public Date getDateDepart() {
        return dateDepart;
    }

    public void setDateDepart(Date dateDepart) {
        this.dateDepart = dateDepart;
    }

}
