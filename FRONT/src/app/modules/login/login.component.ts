import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertMsg } from '../../shared/models/messages.enum';
import { AuthService } from '../../shared/services/auth.service';
import { LoginService } from '../../shared/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public form!: FormGroup;
  private subscriptions = new Subscription();

  constructor(
    private loginService: LoginService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthService
  ) { }

  public ngOnInit(): void {
    this.buildForm();
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public login(): void {
    if (this.form.valid) {
      this.subscriptions.add(
        this.loginService.login(this.form.value).subscribe({
          next: (data) => {
            if (!data) {
              this.handleToast(AlertMsg.INVALID_USER);
            } else {
              this.authService.authToken = data;
              this.router.navigateByUrl('/');
            }
          },
          error: () => {
            this.handleToast(AlertMsg.INVALID_USER);
          }
        })
      );
    } else {
      this.handleToast(AlertMsg.FILL_REQUIRED_FIELDS);
    }
  }

  private buildForm(): void {
    this.form = new FormGroup({
      login: new FormControl('', [Validators.required]),
      senha: new FormControl('', [Validators.required])
    });
  }

  private handleToast(msg: string): void {
    this._snackBar.open(msg, '', {
      duration: 5000
    });
  }
}
