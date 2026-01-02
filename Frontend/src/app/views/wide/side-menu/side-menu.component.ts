import { AuthService } from './../../../controllers/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { PanelMenuModule } from 'primeng/panelmenu';
import { Professeur } from '../../../models/professeur/professeur';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [PanelMenuModule],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css',
})
export class SideMenuComponent implements OnInit {
  items: MenuItem[] | undefined;
  items2: MenuItem[] | undefined;
  items3: MenuItem[] | undefined;
  items4: MenuItem[] | undefined;

  constructor(private router: Router, private authService: AuthService) {}
  ngOnInit() {
    this.items = [
      {
        label: 'Détails stage',
        icon: 'pi pi-fw pi-file',
        items: [
          {
            label: 'Stages',
            command: () => this.router.navigate(['stage/list']),
          },
          {
            label: 'Durées de stage',
            command: () => this.router.navigate(['dureeStage/list']),
          },
          {
            label: 'Types de stage',
            command: () => this.router.navigate(['typeStage/list']),
          },
          {
            label: 'Années de stage',
            command: () => this.router.navigate(['annee/list']),
          },
        ],
      },
      {
        label: 'Compétences',
        icon: 'pi pi-fw pi-wrench',
        items: [
          {
            label: 'Compétences enseignées',
            command: () => this.router.navigate(['competence/list']),
          },
          {
            label: 'Compétences à acquérir',
            command: () => this.router.navigate(['competenceRequise/list']),
          },
        ],
      },
      {
        label: 'Acteurs',
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: 'Étudiants',
            command: () => this.router.navigate(['etudiant/list']),
          },
          {
            label: 'Professeurs',
            command: () => this.router.navigate(['professeur/list']),
            visible: this.isAdmin(),
          },
          {
            label: 'Entreprises',
            command: () => this.router.navigate(['entreprise/list']),
          },
          {
            label: 'Tuteurs',
            command: () => this.router.navigate(['tuteur/list']),
          },
        ],
      },
      {
        label: 'Promotions',
        icon: 'pi pi-fw pi-calendar',
        command: () => this.router.navigate(['promotion/list']),
      },
    ];
  }

  isAdmin(): boolean {
    let user = this.authService.retrieveUser().user;
    if (user !== undefined && user.role === 'ADMIN') return true;
    return false;
  }

  name() {
    let user = this.authService.retrieveUser().user;
    if (user !== undefined && user.role === 'ADMIN') return 'ADMINISTRATEUR';
    else {
      let professeur = user as Professeur;
      return (
        professeur.nom.toUpperCase() + ' ' + professeur.prenom.toUpperCase()
      );
    }
  }
}
