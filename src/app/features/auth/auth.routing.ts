import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { ForgetComponent } from './component/forget/forget.component';
import { LogInComponent } from './component/log-in/log-in.component';
import { VerificationComponent } from './component/verification/verification.component';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';
const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: '', redirectTo: 'log-in', pathMatch: 'full' },
      { path: 'log-in', component: LogInComponent },
      { path: 'forget-password', component: ForgetComponent },
      {path: 'verify', component: VerificationComponent},
      {path:'reset-password', component: ResetPasswordComponent }
    ],
  },
];

export const AuthRoutes = RouterModule.forChild(routes);
