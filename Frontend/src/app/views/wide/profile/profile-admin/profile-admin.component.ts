import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../../../../controllers/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../../../models/user/user';

@Component({
  selector: 'app-profile-admin',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    InputGroupModule,
  ],
  templateUrl: './profile-admin.component.html',
  styleUrl: './profile-admin.component.css',
})
export class ProfileAdminComponent implements OnInit {
  public password!: string;
  public displayedPassword!: string;
  public passwordChanged!: boolean;

  public validateEmail!: boolean;

  public user!: User;

  constructor(
    private router: Router,
    private messageService: MessageService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.user = this.getUser();
    this.password = this.user.password;
    this.displayedPassword = '';
    this.validateEmail = true;
  }

  update(): void {
    if (this.validateForm()) {
      if (this.displayedPassword !== '')
        this.user.password = this.displayedPassword;
      else this.user.password = this.password;
      if (this.password !== this.user.password) this.passwordChanged = true;
      else this.passwordChanged = false;
      this.authService.updatePassword(this.user.password);
      this.authService.update(this.passwordChanged).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Succès',
            detail: 'Administrateur mis à jour',
            life: 3000,
          });
          this.returnToList();
        },
        error: (e) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Succès',
            detail: 'Administrateur mis à jour',
            life: 3000,
          });
          this.returnToList();
        },
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

  private validateForm(): boolean {
    let user = this.getUser();
    if (user.email === undefined || user.email === '') {
      this.validateEmail = false;
      return false;
    } else this.validateEmail = true;
    return true;
  }

  returnToList(): void {
    this.router.navigate(['stage/list']);
  }

  getUser() {
    return this.authService.retrieveUser().user;
  }
}
