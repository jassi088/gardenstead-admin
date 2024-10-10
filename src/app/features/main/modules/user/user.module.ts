import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { UserRoutes } from './user.routing';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserdetailComponent } from './userdetail/userdetail.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { FormFieldModule } from 'src/app/shared/modules/form-field/form-field.module';
import { PageComponentsModule } from '@shared/modules/page-components/page-components.module';
import { MatIconModule } from '@angular/material/icon';
import { AdduserComponent } from './adduser/adduser.component';

@NgModule({
  imports: [
    CommonModule,
    UserRoutes,
    MatSelectModule,
    MatIconModule,
    SharedModule,
    MatMenuModule,
    MatDialogModule,
    FormFieldModule,
    PageComponentsModule,
  ],
  declarations: [UserComponent, AdduserComponent, UserdetailComponent],
})
export class UserModule {}
