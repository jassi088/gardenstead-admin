import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { HeaderComponent } from './element/header/header.component';
import { SidenvavbarComponent } from './element/sidenvavbar/sidenvavbar.component';
import { MainRoutes } from './main.routing';
import { UserModule } from './modules/user/user.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FooterComponent } from './element/footer/footer.component';
import { PageComponentsModule } from 'src/app/shared/modules/page-components/page-components.module';

@NgModule({
  imports: [
    CommonModule,
    MainRoutes,
    MatSidenavModule,
    UserModule,
    PageComponentsModule,
  ],
  exports: [HeaderComponent],

  declarations: [
    MainComponent,
    HeaderComponent,
    SidenvavbarComponent,
    FooterComponent,
  ],
})
export class MainModule {}
