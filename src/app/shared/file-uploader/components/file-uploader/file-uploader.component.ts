import { Component, OnInit, Inject } from '@angular/core';
import { FileUploader, FileItem } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppService } from 'src/app/core/services/app.service';
import { UploaderOption } from '@shared/file-uploader/file-uploader.constants';
import { Upload } from '@models/upload.model';
import { LocalStorageService } from '@core/services/localStorage.service';

@Component({
  selector: 'app-file-uploader',
  template: `
    <div class="after-upload" *ngFor="let item of uploader?.queue">
      <div class="progress-row">
        <div class="file-name text-center">
          {{ item?.file?.name }}
        </div>
        <div class="upload-progress py-1">
          <mat-progress-bar
            mode="determinate"
            [value]="item?.progress"
          ></mat-progress-bar>
        </div>
        <div class="percentage text-center black">{{ item?.progress }}%</div>
      </div>
    </div>
  `,
  styles: [
    `
      :host::ng-deep.mat-progress-bar {
        border-radius: 25px;
        -webkit-border-radius: 25px !important;
        height: 24px !important;
      }
      .progress-row {
        width: 100%;
        -webkit-width: 100%;
      }
      ::ng-deep.file-uploader-dialog.mat-dialog-container {
        padding: 0px !important;
      }
      .after-upload {
        display: flex;
        align-items: center;
        text-align: left;
        padding: 10px;
        font-size: 12px;
        /* border-bottom: 1px solid #e5e3e3; */
        img {
          padding: 0px 10px;
        }
        .progress-row {
          flex: 1;
        }
      }
    `,
  ],
})
export class FileUploaderComponent implements OnInit {
  uploader: FileUploader;
  outputUrls: Upload[] = [];

  files: File[] = [];

  constructor(
    private _dialogRef: MatDialogRef<FileUploaderComponent>,
    @Inject(MAT_DIALOG_DATA)
    private data: {
      files: File[];
      successMessage: string;
      uploaderOption: UploaderOption;
    },
    private _appService: AppService,
    private localStorageService: LocalStorageService
  ) {
    this.files = data.files;

    this.uploader = new FileUploader({
      url: `${environment.apiUrls.api}/api/uploads`,
      removeAfterUpload: false,
      itemAlias: 'media',
      autoUpload: true,
      headers: [
        { name: 'x-access-token', value: this.localStorageService.token },
      ],
      additionalParameter: { fileType: data.uploaderOption.fileType },
    });
    this.uploader.onAfterAddingFile = (item) => {
      item.withCredentials = false;
    };
    this.uploader.onSuccessItem = this.onSuccessItem;
    this.uploader.onErrorItem = this.onErrorItem;
    this.uploader.onCompleteAll = this.onCompleteAll;
    this.uploader.addToQueue(this.files);
  }

  onSuccessItem = (
    item: FileItem,
    responce: string,
    status: number,
    header: any
  ) => {
    const res: Responce = JSON.parse(responce);

    if (res.isSuccess) {
      this.outputUrls.push(res.data!);
      this._appService.toster(
        this.data?.successMessage || 'File uploaded successfully'
      );
    } else {
      this._appService.toster(res.error || res.message || 'File upload failed');
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
      this._appService.toster(res.error || res.message || 'File upload failed');
    } else {
      this._appService.toster('File upload failed');
    }
  };

  onCompleteAll = () => {
    this.uploader.clearQueue();
    this._dialogRef.close(this.outputUrls);
  };

  cancelItem(item: FileItem) {
    if (item.isUploaded) {
      this.outputUrls.splice(item.index, 1);
    }
    item.cancel();
    item.remove();
    if (!this.uploader.queue.length) {
      this._dialogRef.close([]);
    }
  }

  ngOnInit() {}
}

class Responce {
  isSuccess?: boolean;
  data?: Upload;
  error?: string;
  message?: string;
}
