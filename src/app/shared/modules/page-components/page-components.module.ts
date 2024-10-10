import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageContainerComponent } from './components/page-container/page-container.component';
import { PageFooterComponent } from './components/page-footer/page-footer.component';
import { PageContentComponent } from './components/page-content/page-content.component';
import { RouterModule } from '@angular/router';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

const EXPORT_COMPONENTS = [
  PageContainerComponent,
  PageFooterComponent,
  PageHeaderComponent,
  PageContentComponent

]

const EXPORT_MODULES = [

]

const MODULES = [
  CommonModule,
  RouterModule,
  MatIconModule,
  MatMenuModule
]

const COMPONENTS = [
  ...EXPORT_COMPONENTS,
]

@NgModule({
  imports: [
    MODULES
  ],
  declarations: [
    COMPONENTS,
  ],
  exports: [
    EXPORT_COMPONENTS,
    // EXPORT_MODULES
  ]
})
export class PageComponentsModule { }
