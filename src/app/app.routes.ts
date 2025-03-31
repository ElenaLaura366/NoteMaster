import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, 
  { path: 'home', component: HomePageComponent, pathMatch: 'full' }, 
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'catalogue', component: CatalogueComponent },
  { path: 'reset-password', component: ResetPasswordComponent }

];

export const RoutingModule = RouterModule.forRoot(appRoutes);
