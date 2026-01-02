import { AuthService } from './../../../controllers/auth/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { RippleModule } from 'primeng/ripple';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MenuModule, ButtonModule, RippleModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  items: MenuItem[] | undefined;
  constructor(private router: Router, private authService: AuthService) {
    this.items = [
      {
        label: 'Profil',
        command: () => {
          if (this.isAdmin()) {
            this.router.navigate(['profile/admin']);
          } else {
            this.router.navigate(['profile/professeur']);
          }
        },
      },
      {
        label: 'Se déconnecter',
        command: () => {
          this.authService.deleteUser();
          this.router.navigate(['login']);
        },
      },
    ];
  }

  isAdmin(): boolean {
    let user = this.authService.retrieveUser().user;
    if (user.role === 'ADMIN') return true;
    return false;
  }
}
