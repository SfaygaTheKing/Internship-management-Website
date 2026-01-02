import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProfesseurService } from '../../../controllers/professeur/professeur.service';
import { Professeur } from '../../../models/professeur/professeur';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-professeur-view',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    InputGroupModule,
  ],
  templateUrl: './professeur-view.component.html',
  styleUrl: './professeur-view.component.css',
})
export class ProfesseurViewComponent {
  constructor(
    private router: Router,
    private professeurService: ProfesseurService
  ) {}

  returnToList(): void {
    this.selectedProfesseur = new Professeur();
    this.router.navigate(['professeur/list']);
  }

  getDate(date: Date) {
    const originalDate = new Date(date);
    const day = originalDate.getDate().toString().padStart(2, '0');
    const month = (originalDate.getMonth() + 1).toString().padStart(2, '0');
    const year = originalDate.getFullYear();

    return `${day}/${month}/${year}`;
  }

  public get selectedProfesseur(): Professeur {
    return this.professeurService.selectedProfesseur;
  }
  public set selectedProfesseur(value: Professeur) {
    this.professeurService.selectedProfesseur = value;
  }
}
