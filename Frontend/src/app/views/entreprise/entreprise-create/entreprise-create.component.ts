import { EntrepriseService } from './../../../controllers/entreprise/entreprise.service';
import { Entreprise } from './../../../models/entreprise/entreprise';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';

interface Forme {
  forme: string;
}

@Component({
  selector: 'app-entreprise-create',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    InputGroupModule,
    InputNumberModule,
    DropdownModule,
  ],
  templateUrl: './entreprise-create.component.html',
  styleUrl: './entreprise-create.component.css',
})
export class EntrepriseCreateComponent implements OnInit {
  formes!: Forme[];

  public validateNumero!: boolean;
  public validateFormeJuridique!: boolean;
  public validateRaisonSociale!: boolean;
  public validateAdresse!: boolean;
  public validateCodePostal!: boolean;
  public validateVille!: boolean;
  public validateTelephone!: boolean;
  public validateFax!: boolean;
  public validateContact!: boolean;
  public validateTelContact!: boolean;

  constructor(
    private router: Router,
    private messageService: MessageService,
    private entrepriseService: EntrepriseService
  ) {
    this.formes = [
      { forme: 'SA' },
      { forme: 'SARL' },
      { forme: 'SAS' },
      { forme: 'SCA' },
      { forme: 'SNC' },
    ];
  }

  ngOnInit() {
    this.selectedEntreprise = new Entreprise();

    this.validateNumero = true;
    this.validateFormeJuridique = true;
    this.validateRaisonSociale = true;
    this.validateAdresse = true;
    this.validateCodePostal = true;
    this.validateVille = true;
    this.validateTelephone = true;
    this.validateFax = true;
    this.validateContact = true;
    this.validateTelContact = true;
  }

  save(): void {
    if (this.validateForm()) {
      this.entrepriseService.save().subscribe({
        next: (data) => {
          if (data !== null) {
            this.messageService.add({
              severity: 'success',
              summary: 'Succès',
              detail: 'Entreprise enregistrée',
              life: 3000,
            });
            this.returnToList();
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Échec',
              detail: 'Entreprise existe déjà',
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
    this.selectedEntreprise = new Entreprise();
    this.router.navigate(['entreprise/list']);
  }

  private validateForm(): boolean {
    let counter = 0;
    if (
      this.selectedEntreprise.numero === undefined ||
      this.selectedEntreprise.numero === null ||
      this.selectedEntreprise.numero === ''
    ) {
      this.validateNumero = false;
      counter++;
    } else this.validateNumero = true;
    if (
      this.selectedEntreprise.formeJuridique === undefined ||
      this.selectedEntreprise.formeJuridique === ''
    ) {
      this.validateFormeJuridique = false;
      counter++;
    } else this.validateFormeJuridique = true;
    if (
      this.selectedEntreprise.raisonSociale === undefined ||
      this.selectedEntreprise.raisonSociale === ''
    ) {
      this.validateRaisonSociale = false;
      counter++;
    } else this.validateRaisonSociale = true;
    if (
      this.selectedEntreprise.adresse === undefined ||
      this.selectedEntreprise.adresse === ''
    ) {
      this.validateAdresse = false;
      counter++;
    } else this.validateAdresse = true;
    if (
      this.selectedEntreprise.codePostal === undefined ||
      this.selectedEntreprise.codePostal === null ||
      this.selectedEntreprise.codePostal === ''
    ) {
      this.validateCodePostal = false;
      counter++;
    } else this.validateCodePostal = true;
    if (
      this.selectedEntreprise.ville === undefined ||
      this.selectedEntreprise.ville === ''
    ) {
      this.validateVille = false;
      counter++;
    } else this.validateVille = true;
    if (
      this.selectedEntreprise.telephone === undefined ||
      this.selectedEntreprise.telephone === null ||
      this.selectedEntreprise.telephone === ''
    ) {
      this.validateTelephone = false;
      counter++;
    } else this.validateTelephone = true;
    if (
      this.selectedEntreprise.fax === undefined ||
      this.selectedEntreprise.fax === null ||
      this.selectedEntreprise.fax === ''
    ) {
      this.validateFax = false;
      counter++;
    } else this.validateFax = true;
    if (
      this.selectedEntreprise.contact === undefined ||
      this.selectedEntreprise.contact === ''
    ) {
      this.validateContact = false;
      counter++;
    } else this.validateContact = true;
    if (
      this.selectedEntreprise.telContact === undefined ||
      this.selectedEntreprise.telContact === null ||
      this.selectedEntreprise.telContact === ''
    ) {
      this.validateTelContact = false;
      counter++;
    } else this.validateTelContact = true;
    if (counter === 0) return true;
    else return false;
  }

  public get selectedEntreprise(): Entreprise {
    return this.entrepriseService.selectedEntreprise;
  }
  public set selectedEntreprise(value: Entreprise) {
    this.entrepriseService.selectedEntreprise = value;
  }
}
