import { Routes, RouterModule } from '@angular/router';
import { AdduserComponent } from './adduser/adduser.component';
import { UserComponent } from './user.component';
import { UserdetailComponent } from './userdetail/userdetail.component';

const routes: Routes = [
  { path: '', component: UserComponent },
  { path: 'user-detail/:id', component: UserdetailComponent },
  { path: 'add-user', component: AdduserComponent },
  { path: 'edit-user/:id', component: AdduserComponent },
];

export const UserRoutes = RouterModule.forChild(routes);
