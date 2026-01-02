import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EtudiantService } from '../../../controllers/etudiant/etudiant.service';
import { Etudiant } from '../../../models/etudiant/etudiant';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';

interface Sexe {
  sexe: string;
}

@Component({
  selector: 'app-etudiant-view',
  standalone: true,
  imports: [
    FormsModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    InputGroupModule,
    SelectButtonModule,
  ],
  templateUrl: './etudiant-view.component.html',
  styleUrl: './etudiant-view.component.css',
})
export class EtudiantViewComponent {
  sexes!: Sexe[];

  constructor(
    private router: Router,
    private etudiantService: EtudiantService
  ) {
    this.sexes = [{ sexe: 'Homme' }, { sexe: 'Femme' }];
  }

  getDate(date: Date) {
    const originalDate = new Date(date);
    const day = originalDate.getDate().toString().padStart(2, '0');
    const month = (originalDate.getMonth() + 1).toString().padStart(2, '0');
    const year = originalDate.getFullYear();

    return `${day}/${month}/${year}`;
  }

  returnToList(): void {
    this.selectedEtudiant = new Etudiant();
    this.router.navigate(['etudiant/list']);
  }

  public get selectedEtudiant(): Etudiant {
    return this.etudiantService.selectedEtudiant;
  }
  public set selectedEtudiant(value: Etudiant) {
    this.etudiantService.selectedEtudiant = value;
  }
}
