import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { JesiappPage } from 'src/app/shared/JesiappPage';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'jesi-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements JesiappPage {
  public pageTitle = 'Login';

  @ViewChild('login', { static: false }) loginInput: ElementRef;
  public login$!: Observable<string>;

  public constructor(private readonly userService: UserService, private readonly router: Router) {}

  public onSubmit(loginForm: NgForm): void {
    const { login, password } = loginForm.value;
    this.login$ = this.userService.authenticate(login, password).pipe(
      map(() => {
        this.goToHome();
        return null;
      }),
      catchError(() => {
        this.resetForm(loginForm);
        return of('Login failed');
      }),
    );
  }

  public onCancel(): void {
    this.goToHome();
  }

  private goToHome(): void {
    this.router.navigateByUrl('/');
  }

  private resetForm(loginForm: NgForm): void {
    loginForm.reset();
    this.loginInput.nativeElement.focus();
  }
}
