import { Directive, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ImageCropperComponent } from '../../components/image-cropper/image-cropper.component';
import { CropperOption } from '../../file-uploader.constants';

@Directive({
  selector: 'image-cropper,[ImageCropper]',
  exportAs: 'ImageCropper'
})
export class ImageCropperDirective {

  @Output() onCropImage: EventEmitter<File> = new EventEmitter();

  constructor(
    private _matDialog: MatDialog
  ) { }

  cropImage(file: File, options: CropperOption = { ratio: 1 }) {
    return new Promise<File>((res, rej) => {
      this._matDialog.open(ImageCropperComponent, {
        data: { file, ...options },
        minWidth: '576px',
        maxHeight: '800px',
        disableClose: true,
      }).afterClosed().subscribe((file: File) => {
        if (file) {
          res(file);
          this.onCropImage.emit(file);
        } else {
          rej(null);
        };
      })
    })
  }
}
