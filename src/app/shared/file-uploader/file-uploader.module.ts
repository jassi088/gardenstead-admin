import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FileUploadModule } from "ng2-file-upload";
import { ImageCropperModule } from "ngx-image-cropper";
import { ImageCropperDirective } from "./directives/image-cropper/image-cropper.directive";
import { FileUploaderDirective } from "./directives/file-uploader/file-uploader.directive";
import { MatDialogModule } from "@angular/material/dialog";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { ImageCropperComponent } from "./components/image-cropper/image-cropper.component";
import { FileUploaderComponent } from "./components/file-uploader/file-uploader.component";
import { SelectFileBtnComponent } from "./components/select-file-btn/select-file-btn.component";
import { SelectImgComponent } from './components/select-img/select-img.component';

const components = [
  ImageCropperComponent,
  FileUploaderComponent,
  SelectFileBtnComponent,
];

const directives = [ImageCropperDirective, FileUploaderDirective];

@NgModule({
  imports: [
    CommonModule,
    ImageCropperModule,
    FileUploadModule,
    MatDialogModule,
    MatProgressBarModule,
  ],

  declarations: [components, directives, SelectImgComponent],
  exports: [components, directives],
  entryComponents: [components],
})
export class FileUploaderModule {}
