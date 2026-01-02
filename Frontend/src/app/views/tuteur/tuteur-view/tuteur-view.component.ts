import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TuteurService } from '../../../controllers/tuteur/tuteur.service';
import { Tuteur } from '../../../models/tuteur/tuteur';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-tuteur-view',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    InputGroupModule,
  ],
  templateUrl: './tuteur-view.component.html',
  styleUrl: './tuteur-view.component.css',
})
export class TuteurViewComponent {
  constructor(private router: Router, private tuteurService: TuteurService) {}

  returnToList(): void {
    this.selectedTuteur = new Tuteur();
    this.router.navigate(['tuteur/list']);
  }

  public get selectedTuteur(): Tuteur {
    return this.tuteurService.selectedTuteur;
  }
  public set selectedTuteur(value: Tuteur) {
    this.tuteurService.selectedTuteur = value;
  }
}
