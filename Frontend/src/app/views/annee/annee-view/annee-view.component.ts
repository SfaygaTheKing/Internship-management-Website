import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputNumberModule } from 'primeng/inputnumber';
import { AnneeService } from '../../../controllers/annee/annee.service';
import { Annee } from '../../../models/annee/annee';

@Component({
  selector: 'app-annee-view',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    ButtonModule,
    InputGroupModule,
    InputNumberModule,
  ],
  templateUrl: './annee-view.component.html',
  styleUrl: './annee-view.component.css',
})
export class AnneeViewComponent {
  constructor(private router: Router, private anneeService: AnneeService) {}

  returnToList(): void {
    this.selectedAnnee = new Annee();
    this.router.navigate(['annee/list']);
  }

  public get selectedAnnee(): Annee {
    return this.anneeService.selectedAnnee;
  }
  public set selectedAnnee(value: Annee) {
    this.anneeService.selectedAnnee = value;
  }
}
