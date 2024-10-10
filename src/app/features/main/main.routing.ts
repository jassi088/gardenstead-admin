import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';

const children: Routes = [
  { path: '', pathMatch: '', redirectTo: 'user' },
  {
    path: 'user',
    loadChildren: () =>
      import('./modules/user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./modules/profile/profile.module').then((m) => m.ProfileModule),
  },
];

const routes: Routes = [
  { path: '', component: MainComponent, children: children },
];

export const MainRoutes = RouterModule.forChild(routes);
