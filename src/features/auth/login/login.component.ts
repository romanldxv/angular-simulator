import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../auth.service';
import { catchError, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from '../../../app/services/toast.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, ButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {

  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);
  private toastService: ToastService = inject(ToastService);
  private fb: FormBuilder = inject(FormBuilder);

  authForm: FormGroup = this.fb.group({
    login: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]]
  })

  onSubmit(): void {
    if (this.authForm.invalid) {
      return;
    }

    this.authService.loginUser(this.authForm.value.login, this.authForm.value.password)
      .pipe(
        tap(() => this.router.navigate([''])),
        catchError((error: HttpErrorResponse) => {
          if (error.status === 400) {
            this.toastService.showError('Неверный логин или пароль');
          } else {
            this.toastService.showError('Неудалось войти');
          }
          return of();
        })
      ).subscribe();
  }

}
