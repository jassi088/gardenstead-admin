import { Component, OnInit, Inject } from '@angular/core';
import { FileUploader, FileItem } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppService } from 'src/app/core/services/app.service';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss'],
})
export class FileUploaderComponent implements OnInit {
  uploader: FileUploader;
  outputUrls: string[] = [];

  constructor(
    private _dialogRef: MatDialogRef<FileUploaderComponent>,
    @Inject(MAT_DIALOG_DATA) private files: File[],
    private _appService: AppService
  ) {
    this.uploader = new FileUploader({
      url: `${environment.apiUrls.api}/api/images/upload`,
      removeAfterUpload: false,
      itemAlias: 'media',
      autoUpload: true,
    });

    this.uploader.onAfterAddingFile = (item: any) => {
      item.withCredentials = false;
    };

    this.uploader.onSuccessItem = this.onSuccessItem;
    this.uploader.onErrorItem = this.onErrorItem;
    this.uploader.onCompleteAll = this.onCompleteAll;

    this.uploader.addToQueue(files);
  }

  onSuccessItem = (
    item: FileItem,
    responce: string,
    status: number,
    header: any
  ) => {
    const res: any = JSON.parse(responce);
    if (res.isSuccess) {
      this.outputUrls.push(res.data.url);
      this._appService.toster('File uploaded successfully');
    } else {
      this._appService.toster(
        res.error || res.message || 'File upload failed.'
      );
      this.outputUrls.push('');
    }
  };

  onErrorItem = (
    item: FileItem,
    responce: string,
    status: number,
    header: any
  ) => {
    const res: Responce = JSON.parse(responce);
    if (!res.isSuccess) {
      this._appService.toster(
        res.error || res.message || 'File upload failed.'
      );
    } else {
      this._appService.toster('Image upload Failed');
    }
    this.outputUrls.push('');
  };

  onCompleteAll = () => {
    this.uploader.clearQueue();
    this._dialogRef.close(this.outputUrls);
  };

  ngOnInit() {}
}

class Responce {
  isSuccess?: boolean;
  data?: { url?: string };
  error?: string;
  message?: string;
}
