import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { TeacherProfileComponent } from './teacher-profile/teacher-profile.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, 
  { path: 'home', component: HomePageComponent, pathMatch: 'full' }, 
  { path: 'login', component: LoginComponent },
  { path: 'catalogue', component: CatalogueComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'student-profile', component: StudentProfileComponent },
  { path: 'teacher-profile', component: TeacherProfileComponent }
];

export const RoutingModule = RouterModule.forRoot(appRoutes);
