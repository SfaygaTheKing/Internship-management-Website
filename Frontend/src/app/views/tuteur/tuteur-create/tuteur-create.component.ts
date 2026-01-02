import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { TuteurService } from '../../../controllers/tuteur/tuteur.service';
import { EntrepriseService } from '../../../controllers/entreprise/entreprise.service';
import { Tuteur } from '../../../models/tuteur/tuteur';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Entreprise } from '../../../models/entreprise/entreprise';

interface Qualite {
  qualite: string;
}

@Component({
  selector: 'app-tuteur-create',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    InputGroupModule,
    DropdownModule,
  ],
  templateUrl: './tuteur-create.component.html',
  styleUrl: './tuteur-create.component.css',
})
export class TuteurCreateComponent implements OnInit {
  qualites!: Qualite[];

  validateNumero!: boolean;
  validateQualite!: boolean;
  validateNom!: boolean;
  validatePrenom!: boolean;
  validateTelephone!: boolean;
  validateEntreprise!: boolean;

  constructor(
    private router: Router,
    private messageService: MessageService,
    private tuteurService: TuteurService,
    private entrepriseService: EntrepriseService
  ) {
    this.qualites = [{ qualite: 'M' }, { qualite: 'Mme' }, { qualite: 'Mlle' }];
  }

  ngOnInit() {
    this.entrepriseService.findAll().subscribe({
      next: (data) => (this.entreprises = data),
      error: (e) => console.error(e),
    });
    this.selectedTuteur = new Tuteur();

    this.validateNumero = true;
    this.validateQualite = true;
    this.validateNom = true;
    this.validatePrenom = true;
    this.validateTelephone = true;
    this.validateEntreprise = true;
  }

  save(): void {
    if (this.validateForm()) {
      this.tuteurService.save().subscribe({
        next: (data) => {
          if (data !== null) {
            this.messageService.add({
              severity: 'success',
              summary: 'Succès',
              detail: 'Tuteur enregistrée',
              life: 3000,
            });
            this.returnToList();
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Échec',
              detail: 'Tuteur existe déjà',
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

  returnToList(): void {
    this.selectedTuteur = new Tuteur();
    this.router.navigate(['tuteur/list']);
  }

  private validateForm(): boolean {
    let counter = 0;
    if (
      this.selectedTuteur.numero === undefined ||
      this.selectedTuteur.numero === ''
    ) {
      this.validateNumero = false;
      counter++;
    } else this.validateNumero = true;
    if (
      this.selectedTuteur.qualite === undefined ||
      this.selectedTuteur.qualite === ''
    ) {
      this.validateQualite = false;
      counter++;
    } else this.validateQualite = true;
    if (
      this.selectedTuteur.nom === undefined ||
      this.selectedTuteur.nom === ''
    ) {
      this.validateNom = false;
      counter++;
    } else this.validateNom = true;
    if (
      this.selectedTuteur.prenom === undefined ||
      this.selectedTuteur.prenom === ''
    ) {
      this.validatePrenom = false;
      counter++;
    } else this.validatePrenom = true;
    if (
      this.selectedTuteur.telephone === undefined ||
      this.selectedTuteur.telephone === null ||
      this.selectedTuteur.telephone === ''
    ) {
      this.validateTelephone = false;
      counter++;
    } else this.validateTelephone = true;
    if (this.selectedTuteur.entreprise === undefined) {
      this.validateEntreprise = false;
      counter++;
    } else this.validateEntreprise = true;
    if (counter === 0) return true;
    else return false;
  }

  public get selectedTuteur(): Tuteur {
    return this.tuteurService.selectedTuteur;
  }
  public set selectedTuteur(value: Tuteur) {
    this.tuteurService.selectedTuteur = value;
  }

  public get entreprises(): Array<Entreprise> {
    return this.entrepriseService.entreprises;
  }
  public set entreprises(value: Array<Entreprise>) {
    this.entrepriseService.entreprises = value;
  }
}
