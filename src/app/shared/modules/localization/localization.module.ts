import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalizationPipe } from './localization.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LocalizationPipe
  ],
  exports: [
    LocalizationPipe
  ]
})
export class LocalizationModule { }
