import { Routes } from '@angular/router';
import { LoginComponent } from './views/wide/login/login.component';
import { EtudiantListComponent } from './views/etudiant/etudiant-list/etudiant-list.component';
import { EtudiantCreateComponent } from './views/etudiant/etudiant-create/etudiant-create.component';
import { EtudiantEditComponent } from './views/etudiant/etudiant-edit/etudiant-edit.component';
import { EtudiantViewComponent } from './views/etudiant/etudiant-view/etudiant-view.component';
import { AnneeListComponent } from './views/annee/annee-list/annee-list.component';
import { AnneeCreateComponent } from './views/annee/annee-create/annee-create.component';
import { AnneeEditComponent } from './views/annee/annee-edit/annee-edit.component';
import { AnneeViewComponent } from './views/annee/annee-view/annee-view.component';
import { TypeStageListComponent } from './views/typeStage/type-stage-list/type-stage-list.component';
import { TypeStageCreateComponent } from './views/typeStage/type-stage-create/type-stage-create.component';
import { TypeStageEditComponent } from './views/typeStage/type-stage-edit/type-stage-edit.component';
import { TypeStageViewComponent } from './views/typeStage/type-stage-view/type-stage-view.component';
import { DureeStageListComponent } from './views/dureeStage/duree-stage-list/duree-stage-list.component';
import { DureeStageCreateComponent } from './views/dureeStage/duree-stage-create/duree-stage-create.component';
import { DureeStageEditComponent } from './views/dureeStage/duree-stage-edit/duree-stage-edit.component';
import { DureeStageViewComponent } from './views/dureeStage/duree-stage-view/duree-stage-view.component';
import { CompetenceListComponent } from './views/competence/competence-list/competence-list.component';
import { CompetenceCreateComponent } from './views/competence/competence-create/competence-create.component';
import { CompetenceEditComponent } from './views/competence/competence-edit/competence-edit.component';
import { CompetenceViewComponent } from './views/competence/competence-view/competence-view.component';
import { CompetenceRequiseListComponent } from './views/competenceRequise/competence-requise-list/competence-requise-list.component';
import { CompetenceRequiseCreateComponent } from './views/competenceRequise/competence-requise-create/competence-requise-create.component';
import { CompetenceRequiseEditComponent } from './views/competenceRequise/competence-requise-edit/competence-requise-edit.component';
import { CompetenceRequiseViewComponent } from './views/competenceRequise/competence-requise-view/competence-requise-view.component';
import { PromotionListComponent } from './views/promotion/promotion-list/promotion-list.component';
import { PromotionCreateComponent } from './views/promotion/promotion-create/promotion-create.component';
import { TuteurListComponent } from './views/tuteur/tuteur-list/tuteur-list.component';
import { EntrepriseListComponent } from './views/entreprise/entreprise-list/entreprise-list.component';
import { EntrepriseCreateComponent } from './views/entreprise/entreprise-create/entreprise-create.component';
import { EntrepriseEditComponent } from './views/entreprise/entreprise-edit/entreprise-edit.component';
import { EntrepriseViewComponent } from './views/entreprise/entreprise-view/entreprise-view.component';
import { TuteurCreateComponent } from './views/tuteur/tuteur-create/tuteur-create.component';
import { TuteurEditComponent } from './views/tuteur/tuteur-edit/tuteur-edit.component';
import { TuteurViewComponent } from './views/tuteur/tuteur-view/tuteur-view.component';
import { PromotionEditComponent } from './views/promotion/promotion-edit/promotion-edit.component';
import { PromotionViewComponent } from './views/promotion/promotion-view/promotion-view.component';
import { ProfesseurListComponent } from './views/professeur/professeur-list/professeur-list.component';
import { ProfesseurCreateComponent } from './views/professeur/professeur-create/professeur-create.component';
import { ProfesseurEditComponent } from './views/professeur/professeur-edit/professeur-edit.component';
import { ProfesseurViewComponent } from './views/professeur/professeur-view/professeur-view.component';
import { StageListComponent } from './views/stage/stage-list/stage-list.component';
import { StageCreateComponent } from './views/stage/stage-create/stage-create.component';
import { StageEditComponent } from './views/stage/stage-edit/stage-edit.component';
import { StageViewComponent } from './views/stage/stage-view/stage-view.component';
import { ProfileAdminComponent } from './views/wide/profile/profile-admin/profile-admin.component';
import {
  AuthGuardAdmin,
  AuthGuardAll,
  AuthGuardProfesseur,
} from './controllers/authGuard/auth.guard';
import { ProfileProfesseurComponent } from './views/wide/profile/profile-professeur/profile-professeur.component';
import { UnauthorizedComponent } from './views/wide/unauthorized/unauthorized.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent,
  },
  {
    path: 'profile',
    children: [
      {
        path: 'admin',
        component: ProfileAdminComponent,
        canActivate: [AuthGuardAdmin],
      },
      {
        path: 'professeur',
        component: ProfileProfesseurComponent,
        canActivate: [AuthGuardProfesseur],
      },
    ],
  },
  {
    path: 'stage',
    children: [
      {
        path: 'list',
        component: StageListComponent,
        canActivate: [AuthGuardAll],
      },
      {
        path: 'create',
        component: StageCreateComponent,
        canActivate: [AuthGuardAll],
      },
      {
        path: 'edit',
        component: StageEditComponent,
        canActivate: [AuthGuardAll],
      },
      {
        path: 'view',
        component: StageViewComponent,
        canActivate: [AuthGuardAll],
      },
    ],
  },
  {
    path: 'dureeStage',
    children: [
      {
        path: 'list',
        component: DureeStageListComponent,
        canActivate: [AuthGuardAll],
      },
      {
        path: 'create',
        component: DureeStageCreateComponent,
        canActivate: [AuthGuardAll],
      },
      {
        path: 'edit',
        component: DureeStageEditComponent,
        canActivate: [AuthGuardAll],
      },
      {
        path: 'view',
        component: DureeStageViewComponent,
        canActivate: [AuthGuardAll],
      },
    ],
  },
  {
    path: 'typeStage',
    children: [
      {
        path: 'list',
        component: TypeStageListComponent,
        canActivate: [AuthGuardAll],
      },
      {
        path: 'create',
        component: TypeStageCreateComponent,
        canActivate: [AuthGuardAll],
      },
      {
        path: 'edit',
        component: TypeStageEditComponent,
        canActivate: [AuthGuardAll],
      },
      {
        path: 'view',
        component: TypeStageViewComponent,
        canActivate: [AuthGuardAll],
      },
    ],
  },
  {
    path: 'annee',
    children: [
      {
        path: 'list',
        component: AnneeListComponent,
        canActivate: [AuthGuardAll],
      },
      {
        path: 'create',
        component: AnneeCreateComponent,
        canActivate: [AuthGuardAll],
      },
      {
        path: 'edit',
        component: AnneeEditComponent,
        canActivate: [AuthGuardAll],
      },
      {
        path: 'view',
        component: AnneeViewComponent,
        canActivate: [AuthGuardAll],
      },
    ],
  },
  {
    path: 'competence',
    children: [
      {
        path: 'list',
        component: CompetenceListComponent,
        canActivate: [AuthGuardAll],
      },
      {
        path: 'create',
        component: CompetenceCreateComponent,
        canActivate: [AuthGuardAdmin],
      },
      {
        path: 'edit',
        component: CompetenceEditComponent,
        canActivate: [AuthGuardAdmin],
      },
      {
        path: 'view',
        component: CompetenceViewComponent,
        canActivate: [AuthGuardAll],
      },
    ],
  },
  {
    path: 'competenceRequise',
    children: [
      {
        path: 'list',
        component: CompetenceRequiseListComponent,
        canActivate: [AuthGuardAll],
      },
      {
        path: 'create',
        component: CompetenceRequiseCreateComponent,
        canActivate: [AuthGuardAdmin],
      },
      {
        path: 'edit',
        component: CompetenceRequiseEditComponent,
        canActivate: [AuthGuardAdmin],
      },
      {
        path: 'view',
        component: CompetenceRequiseViewComponent,
        canActivate: [AuthGuardAll],
      },
    ],
  },
  {
    path: 'etudiant',
    children: [
      {
        path: 'list',
        component: EtudiantListComponent,
        canActivate: [AuthGuardAll],
      },
      {
        path: 'create',
        component: EtudiantCreateComponent,
        canActivate: [AuthGuardAdmin],
      },
      {
        path: 'edit',
        component: EtudiantEditComponent,
        canActivate: [AuthGuardAll],
      },
      {
        path: 'view',
        component: EtudiantViewComponent,
        canActivate: [AuthGuardAll],
      },
    ],
  },
  {
    path: 'professeur',
    children: [
      {
        path: 'list',
        component: ProfesseurListComponent,
        canActivate: [AuthGuardAdmin],
      },
      {
        path: 'create',
        component: ProfesseurCreateComponent,
        canActivate: [AuthGuardAdmin],
      },
      {
        path: 'edit',
        component: ProfesseurEditComponent,
        canActivate: [AuthGuardAdmin],
      },
      {
        path: 'view',
        component: ProfesseurViewComponent,
        canActivate: [AuthGuardAdmin],
      },
    ],
  },
  {
    path: 'entreprise',
    children: [
      {
        path: 'list',
        component: EntrepriseListComponent,
        canActivate: [AuthGuardAll],
      },
      {
        path: 'create',
        component: EntrepriseCreateComponent,
        canActivate: [AuthGuardAll],
      },
      {
        path: 'edit',
        component: EntrepriseEditComponent,
        canActivate: [AuthGuardAll],
      },
      {
        path: 'view',
        component: EntrepriseViewComponent,
        canActivate: [AuthGuardAll],
      },
    ],
  },
  {
    path: 'tuteur',
    children: [
      {
        path: 'list',
        component: TuteurListComponent,
        canActivate: [AuthGuardAll],
      },
      {
        path: 'create',
        component: TuteurCreateComponent,
        canActivate: [AuthGuardAll],
      },
      {
        path: 'edit',
        component: TuteurEditComponent,
        canActivate: [AuthGuardAll],
      },
      {
        path: 'view',
        component: TuteurViewComponent,
        canActivate: [AuthGuardAll],
      },
    ],
  },
  {
    path: 'promotion',
    children: [
      {
        path: 'list',
        component: PromotionListComponent,
        canActivate: [AuthGuardAll],
      },
      {
        path: 'create',
        component: PromotionCreateComponent,
        canActivate: [AuthGuardAdmin],
      },
      {
        path: 'edit',
        component: PromotionEditComponent,
        canActivate: [AuthGuardAdmin],
      },
      {
        path: 'view',
        component: PromotionViewComponent,
        canActivate: [AuthGuardAll],
      },
    ],
  },
];
