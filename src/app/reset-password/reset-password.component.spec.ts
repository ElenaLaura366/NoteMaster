import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ResetPasswordComponent } from './reset-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';


describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ResetPasswordComponent,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should show mismatch error when passwords do not match', () => {
    component.resetForm.setValue({
      email: 'test@example.com',
      newPassword: '123456',
      confirmPassword: 'different'
    });

    expect(component.resetForm.errors?.['mismatch']).toBeTrue();
  });

  it('should make a POST request on valid form submit', fakeAsync(() => {
    component.resetForm.setValue({
      email: 'test@example.com',
      newPassword: '123456',
      confirmPassword: '123456'
    });

    component.onSubmit();

    const req = httpMock.expectOne('http://localhost:5000/api/auth/reset-password');
    expect(req.request.method).toBe('POST');
    req.flush({ message: 'Parola a fost resetată cu succes.' });

    tick();
    expect(component.successMessage).toBe('Parola a fost resetată cu succes.');
    expect(component.errorMessage).toBeNull();
  }));

  it('should set errorMessage if user not found (404)', fakeAsync(() => {
    component.resetForm.setValue({
      email: 'nouser@example.com',
      newPassword: '123456',
      confirmPassword: '123456'
    });

    component.onSubmit();

    const req = httpMock.expectOne('http://localhost:5000/api/auth/reset-password');
    req.flush({}, { status: 404, statusText: 'Not Found' });

    tick();
    expect(component.errorMessage).toBe('Utilizatorul nu a fost găsit.');
  }));

  afterEach(() => {
    httpMock.verify();
  });
});
