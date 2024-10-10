import { Component, OnInit, Inject } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CropperFileOption } from '../../file-uploader.constants';
import { AppService } from 'src/app/core/services/app.service';

@Component({
  selector: 'app-image-cropper',
  template: `
    <div class="outerCrop">
      <header>
        <div class="font-20 grey fw-5 text-center">
          {{ !data?.notCrop ? 'Crop Image' : 'View Image' }}
        </div>
      </header>

      <div class="mt-4">
        <image-cropper
          *ngIf="!data?.notCrop"
          [roundCropper]="data?.roundCropper || false"
          [imageFile]="data.file"
          [maintainAspectRatio]="true"
          [aspectRatio]="data.ratio || 3 / 2"
          format="png"
          (imageCropped)="imageCropped($event)"
          (imageLoaded)="imageLoaded()"
          (cropperReady)="cropperReady()"
          (loadImageFailed)="loadImageFailed()"
        >
        </image-cropper>
      </div>
      <footer class="text-center mt-4">
        <button class="mr-3 theme-btn border" (click)="dialogRef.close()">
          Cancel
        </button>
        <button
          class="theme-btn red"
          (click)="!data?.notCrop ? done() : select()"
        >
          Done
        </button>
      </footer>
    </div>
  `,
  styles: [
    `
      h3 {
        font-size: 16px;
      }
      image-cropper {
        max-height: 70vh;
        max-width: 100vh;
      }
    `,
  ],
})
export class ImageCropperComponent implements OnInit {
  private _croppedFile?: ImageCroppedEvent;
  _file: File;
  selectedFile?: File;
  isloading: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<ImageCropperComponent>,
    private _appService: AppService,
    @Inject(MAT_DIALOG_DATA) public data: CropperFileOption
  ) {
    let file = data.file;
    this._file = data.file;

    if (file && !file.type.includes('image')) {
      this._appService.toster(
        'Only Image file supported. Please select only image.'
      );
      dialogRef.close();
      return;
    }
    this.selectedFile = data.file;
  }

  ngOnInit() {}

  imageCropped(event: ImageCroppedEvent) {
    this._croppedFile = event;
  }

  imageLoaded() {
    this.isloading = false;
  }

  cropperReady() {
    // cropper ready
  }

  loadImageFailed() {
    this._appService.toster(
      'Something wrong with this image. please try again'
    );
  }

  done() {
    if (this._croppedFile?.base64) {
      var bolbBin = atob(this._croppedFile.base64.split(',')[1]);
      var ary = [];
      for (let i = 0; i < bolbBin.length; i++) {
        ary.push(bolbBin.charCodeAt(i));
      }
      let bb = new Blob([new Uint8Array(ary)], { type: 'image/png' });
      let file = new File([bb], this._file.name || 'Select Image', {
        type: 'image/png',
      });
      this.dialogRef.close(file);
    }
  }

  select() {
    this.dialogRef.close(this._file);
  }
}
