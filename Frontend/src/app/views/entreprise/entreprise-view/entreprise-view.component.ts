import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { Entreprise } from '../../../models/entreprise/entreprise';
import { Router } from '@angular/router';
import { EntrepriseService } from '../../../controllers/entreprise/entreprise.service';

@Component({
  selector: 'app-entreprise-view',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    InputGroupModule,
    InputNumberModule,
  ],
  templateUrl: './entreprise-view.component.html',
  styleUrl: './entreprise-view.component.css',
})
export class EntrepriseViewComponent {
  constructor(
    private router: Router,
    private entrepriseService: EntrepriseService
  ) {}

  returnToList(): void {
    this.selectedEntreprise = new Entreprise();
    this.router.navigate(['entreprise/list']);
  }

  public get selectedEntreprise(): Entreprise {
    return this.entrepriseService.selectedEntreprise;
  }
  public set selectedEntreprise(value: Entreprise) {
    this.entrepriseService.selectedEntreprise = value;
  }
}
