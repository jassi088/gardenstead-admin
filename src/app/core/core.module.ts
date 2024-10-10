import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TokenInterceptor } from './interceptor/token.interceptor';
import { MatDialogModule } from '@angular/material/dialog';


const tokenInterceptor = {
  provide: HTTP_INTERCEPTORS,
  useClass: TokenInterceptor,
  multi: true,
};
@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatDialogModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [tokenInterceptor],
  exports: [HttpClientModule, MatSnackBarModule, MatDialogModule],
})
export class CoreModule {}
