import { ProfesseurService } from './../../../controllers/professeur/professeur.service';
import { PromotionService } from './../../../controllers/promotion/promotion.service';
import { MessageService } from 'primeng/api';
import { EtudiantService } from './../../../controllers/etudiant/etudiant.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { Etudiant } from '../../../models/etudiant/etudiant';
import { InputNumberModule } from 'primeng/inputnumber';
import { Promotion } from '../../../models/promotion/promotion';
import { Professeur } from '../../../models/professeur/professeur';
import { Router } from '@angular/router';

interface Sexe {
  sexe: string;
}

interface Qualite {
  qualite: string;
}

@Component({
  selector: 'app-etudiant-create',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    InputGroupModule,
    InputNumberModule,
    CalendarModule,
    SelectButtonModule,
    DropdownModule,
    DialogModule,
  ],
  templateUrl: './etudiant-create.component.html',
  styleUrl: './etudiant-create.component.css',
})
export class EtudiantCreateComponent implements OnInit {
  sexes!: Sexe[];
  qualites!: Qualite[];

  promotionDialog!: boolean;

  public validateNom!: boolean;
  public validatePrenom!: boolean;
  public validateDateNaissance!: boolean;
  public validateSexe!: boolean;
  public validateQualite!: boolean;
  public validateTelephone!: boolean;
  public validateAdresse!: boolean;
  public validateVille!: boolean;
  public validateCodePostale!: boolean;
  public validatePromotion!: boolean;

  public validatePromotionAnnee!: boolean;
  public validatePromotionNbInscrits!: boolean;
  public validatePromotionNbRecus!: boolean;
  public validatePromotionProfesseur!: boolean;

  constructor(
    private router: Router,
    private messageService: MessageService,
    private etudiantService: EtudiantService,
    private promotionService: PromotionService,
    private professeurService: ProfesseurService
  ) {
    this.sexes = [{ sexe: 'Homme' }, { sexe: 'Femme' }];
    this.qualites = [{ qualite: 'M' }, { qualite: 'Mme' }, { qualite: 'Mlle' }];
  }

  ngOnInit() {
    this.promotionService.findAll().subscribe({
      next: (data) => (this.promotions = data),
      error: (e) => console.error(e),
    });
    this.professeurService.findAll().subscribe({
      next: (data) => (this.professeurs = data),
      error: (e) => console.error(e),
    });
    this.selectedEtudiant = new Etudiant();

    this.promotionDialog = false;

    this.validateNom = true;
    this.validatePrenom = true;
    this.validateDateNaissance = true;
    this.validateSexe = true;
    this.validateQualite = true;
    this.validateTelephone = true;
    this.validateAdresse = true;
    this.validateVille = true;
    this.validateCodePostale = true;
    this.validatePromotion = true;
  }

  save(): void {
    if (this.validateForm()) {
      this.etudiantService.save().subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Succès',
            detail: 'Étudiant enregistrée',
            life: 3000,
          });
          this.returnToList();
        },
        error: (e) => console.error(e),
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Échec',
        detail: 'Veuillez remplir tous les champs obligatoires',
        life: 3000,
      });
    }
  }

  returnToList(): void {
    this.selectedEtudiant = new Etudiant();
    this.router.navigate(['etudiant/list']);
  }

  savePromotion(): void {
    if (this.validatePromotionForm()) {
      this.promotionService
        .findByAnnee(this.selectedPromotion.annee)
        .subscribe({
          next: (data) => {
            if (data === null) {
              this.promotions.push(this.selectedPromotion);
              this.selectedEtudiant.promotion = this.selectedPromotion;
              this.messageService.add({
                severity: 'success',
                summary: 'Succès',
                detail: 'Promotion enregistrée',
                life: 3000,
              });
              this.showPromotionDialog();
            } else {
              this.messageService.add({
                severity: 'error',
                summary: 'Échec',
                detail: 'Promotion existe déjà',
                life: 3000,
              });
            }
          },
          error: (e) => console.error(e),
        });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Échec',
        detail: 'Veuillez remplir tous les champs obligatoires',
        life: 3000,
      });
    }
  }

  showPromotionDialog(): void {
    this.selectedPromotion = new Promotion();
    this.validatePromotionAnnee = true;
    this.validatePromotionNbInscrits = true;
    this.validatePromotionNbRecus = true;
    this.validatePromotionProfesseur = true;
    this.promotionDialog = !this.promotionDialog;
  }

  private validateForm(): boolean {
    let counter = 0;
    if (
      this.selectedEtudiant.nom === undefined ||
      this.selectedEtudiant.nom === ''
    ) {
      this.validateNom = false;
      counter++;
    } else this.validateNom = true;
    if (
      this.selectedEtudiant.prenom === undefined ||
      this.selectedEtudiant.prenom === ''
    ) {
      this.validatePrenom = false;
      counter++;
    } else this.validatePrenom = true;
    if (this.selectedEtudiant.dateNaissance === undefined) {
      this.validateDateNaissance = false;
      counter++;
    } else this.validateDateNaissance = true;
    if (
      this.selectedEtudiant.sexe === undefined ||
      this.selectedEtudiant.sexe === ''
    ) {
      this.validateSexe = false;
      counter++;
    } else this.validateSexe = true;
    if (
      this.selectedEtudiant.qualite === undefined ||
      this.selectedEtudiant.qualite === ''
    ) {
      this.validateQualite = false;
      counter++;
    } else this.validateQualite = true;
    if (
      this.selectedEtudiant.telephone === undefined ||
      this.selectedEtudiant.telephone === null ||
      this.selectedEtudiant.telephone === ''
    ) {
      this.validateTelephone = false;
      counter++;
    } else this.validateTelephone = true;
    if (
      this.selectedEtudiant.adresse === undefined ||
      this.selectedEtudiant.adresse === ''
    ) {
      this.validateAdresse = false;
      counter++;
    } else this.validateAdresse = true;
    if (
      this.selectedEtudiant.ville === undefined ||
      this.selectedEtudiant.ville === ''
    ) {
      this.validateVille = false;
      counter++;
    } else this.validateVille = true;
    if (
      this.selectedEtudiant.codePostale === undefined ||
      this.selectedEtudiant.codePostale === null ||
      this.selectedEtudiant.codePostale === ''
    ) {
      this.validateCodePostale = false;
      counter++;
    } else this.validateCodePostale = true;
    if (this.selectedEtudiant.promotion === undefined) {
      this.validatePromotion = false;
      counter++;
    } else this.validatePromotion = true;
    if (counter === 0) return true;
    else return false;
  }

  private validatePromotionForm(): boolean {
    let counter = 0;
    if (
      this.selectedPromotion.annee === undefined ||
      this.selectedPromotion.annee === null ||
      this.selectedPromotion.annee === ''
    ) {
      this.validatePromotionAnnee = false;
      counter++;
    } else this.validatePromotionAnnee = true;
    if (
      this.selectedPromotion.nbInscrits === undefined ||
      this.selectedPromotion.nbInscrits === null ||
      this.selectedPromotion.nbInscrits.toString() === ''
    ) {
      this.validatePromotionNbInscrits = false;
      counter++;
    } else this.validatePromotionNbInscrits = true;
    if (
      this.selectedPromotion.nbRecus === undefined ||
      this.selectedPromotion.nbRecus === null ||
      this.selectedPromotion.nbRecus.toString() === ''
    ) {
      this.validatePromotionNbRecus = false;
      counter++;
    } else this.validatePromotionNbRecus = true;

    if (this.selectedPromotion.professeur === undefined) {
      this.validatePromotionProfesseur = false;
      counter++;
    } else this.validatePromotionProfesseur = true;
    if (counter === 0) return true;
    else return false;
  }

  public get selectedEtudiant(): Etudiant {
    return this.etudiantService.selectedEtudiant;
  }
  public set selectedEtudiant(value: Etudiant) {
    this.etudiantService.selectedEtudiant = value;
  }

  public get selectedPromotion(): Promotion {
    return this.promotionService.selectedPromotion;
  }
  public set selectedPromotion(value: Promotion) {
    this.promotionService.selectedPromotion = value;
  }
  public get promotions(): Array<Promotion> {
    return this.promotionService.promotions;
  }
  public set promotions(value: Array<Promotion>) {
    this.promotionService.promotions = value;
  }

  public get professeurs(): Array<Professeur> {
    return this.professeurService.professeurs;
  }
  public set professeurs(value: Array<Professeur>) {
    this.professeurService.professeurs = value;
  }
}
