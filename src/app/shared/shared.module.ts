import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationComponent } from './components/pagination/pagination.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FileUploaderModule } from './file-uploader/file-uploader.module';
import { Base64Pipe } from './pipes/base64.pipe';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { CountriesDirective } from './countries.directive';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    FileUploaderModule,
    MatMenuModule,
    MatListModule,
    MatSelectModule,
  ],
  declarations: [PaginationComponent, Base64Pipe, CountriesDirective],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    PaginationComponent,
    MatProgressSpinnerModule,
    FileUploaderModule,
    CountriesDirective,
  ],
})
export class SharedModule {}
