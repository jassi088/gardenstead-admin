import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Upload } from '@models/upload.model';
import { UploaderOption } from '@shared/file-uploader/file-uploader.constants';
import { FileUploaderComponent } from '../../components/file-uploader/file-uploader.component';

@Directive({
  selector: 'file-uploader,[FileUploader]',
  exportAs: 'FileUploader',
})
export class FileUploaderDirective {
  @Output() onUploadFile: EventEmitter<Upload[]> = new EventEmitter();
  @Input() successMessage: string = '';
  @Input() uploaderOption?: UploaderOption;

  constructor(private _matDialog: MatDialog) {}

  uploadFile(files: File[] = [], uploaderOption = this.uploaderOption) {
    return new Promise<Upload[]>((res, rej) => {
      this._matDialog
        .open(FileUploaderComponent, {
          data: { files, successMessage: this.successMessage, uploaderOption },
          disableClose: true,
          panelClass: 'file-uploader-dialog',
          minWidth: '400px',
          maxWidth: '100%',
          maxHeight: '100%',
        })
        .afterClosed()
        .subscribe((urls: Upload[]) => {
          if (urls?.length) {
            res(urls);
            this.onUploadFile.emit(urls);
          } else {
            rej(null);
          }
        });
    });
  }
}
