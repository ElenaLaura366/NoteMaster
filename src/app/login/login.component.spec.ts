import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [LoginComponent, ReactiveFormsModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have invalid form when empty', () => {
    expect(component.loginForm.valid).toBeFalse();
  });

  it('should validate form with correct input', () => {
    component.loginForm.setValue({
      email: 'test@student.com',
      password: '123456'
    });

    expect(component.loginForm.valid).toBeTrue();
  });

  it('should call login and redirect on success (student)', () => {
    component.loginForm.setValue({
      email: 'test@student.com',
      password: '123456'
    });

    authServiceSpy.login.and.returnValue(of({ token: 'mockToken' }));

    component.onSubmit();

    expect(authServiceSpy.login).toHaveBeenCalledWith('test@student.com', '123456');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/student-profile']);
  });

  it('should show error if login fails with 401', () => {
    component.loginForm.setValue({
      email: 'test@student.com',
      password: 'wrongpass'
    });

    authServiceSpy.login.and.returnValue(throwError({ status: 401 }));

    component.onSubmit();

    expect(component.passwordError).toBe('Parola introdusă este incorectă.');
    expect(component.nameError).toBeNull();
  });
});
