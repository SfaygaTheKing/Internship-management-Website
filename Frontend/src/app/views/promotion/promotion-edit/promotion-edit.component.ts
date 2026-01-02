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
import { ProfesseurService } from '../../../controllers/professeur/professeur.service';
import { PromotionService } from '../../../controllers/promotion/promotion.service';
import { Professeur } from '../../../models/professeur/professeur';
import { Promotion } from '../../../models/promotion/promotion';

@Component({
  selector: 'app-promotion-edit',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    ButtonModule,
    InputGroupModule,
    InputNumberModule,
    DropdownModule,
  ],
  templateUrl: './promotion-edit.component.html',
  styleUrl: './promotion-edit.component.css',
})
export class PromotionEditComponent implements OnInit {
  validateAnnee!: boolean;
  validateNbInscrits!: boolean;
  validateNbRecus!: boolean;
  validateProfesseur!: boolean;

  constructor(
    private router: Router,
    private messageService: MessageService,
    private promotionService: PromotionService,
    private professeurService: ProfesseurService
  ) {}

  ngOnInit() {
    this.professeurService.findAll().subscribe({
      next: (data) => (this.professeurs = data),
      error: (e) => console.error(e),
    });

    this.validateAnnee = true;
    this.validateNbInscrits = true;
    this.validateNbRecus = true;
    this.validateProfesseur = true;
  }

  update(): void {
    if (this.validateForm()) {
      this.promotionService.update().subscribe({
        next: (data) => {
          if (data !== null) {
            this.messageService.add({
              severity: 'success',
              summary: 'Succès',
              detail: 'Promotion mis à jour',
              life: 3000,
            });
            this.returnToList();
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

  returnToList(): void {
    this.selectedPromotion = new Promotion();
    this.router.navigate(['promotion/list']);
  }

  private validateForm(): boolean {
    let counter = 0;
    if (
      this.selectedPromotion.annee === undefined ||
      this.selectedPromotion.annee === null ||
      this.selectedPromotion.annee === ''
    ) {
      this.validateAnnee = false;
      counter++;
    } else this.validateAnnee = true;
    if (
      this.selectedPromotion.nbInscrits === undefined ||
      this.selectedPromotion.nbInscrits === null ||
      this.selectedPromotion.nbInscrits.toString() === ''
    ) {
      this.validateNbInscrits = false;
      counter++;
    } else this.validateNbInscrits = true;
    if (
      this.selectedPromotion.nbRecus === undefined ||
      this.selectedPromotion.nbRecus === null ||
      this.selectedPromotion.nbRecus.toString() === ''
    ) {
      this.validateNbRecus = false;
      counter++;
    } else this.validateNbRecus = true;
    if (this.selectedPromotion.professeur === undefined) {
      this.validateProfesseur = false;
      counter++;
    } else this.validateProfesseur = true;
    if (counter === 0) return true;
    else return false;
  }

  public get selectedPromotion(): Promotion {
    return this.promotionService.selectedPromotion;
  }
  public set selectedPromotion(value: Promotion) {
    this.promotionService.selectedPromotion = value;
  }

  public get professeurs(): Array<Professeur> {
    return this.professeurService.professeurs;
  }
  public set professeurs(value: Array<Professeur>) {
    this.professeurService.professeurs = value;
  }
}
