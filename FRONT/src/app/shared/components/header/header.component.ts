import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(
    private loginService: LoginService
  ) { }

  public logout(): void {
    this.loginService.logout();
  }
}
