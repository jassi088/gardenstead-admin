import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppService } from '@core/services/app.service';
import { Page } from '@http-handler/common/contracts/page';
import { Upload } from '@models/upload.model';
import { UploadService } from 'src/app/service/upload.service';

@Component({
  selector: 'app-select-img',
  templateUrl: './select-img.component.html',
  styleUrls: ['./select-img.component.scss'],
})
export class SelectImgComponent implements OnInit {
  selectItem!: any;
  upload: Page<Upload> = new Page({
    api: this.uploadService.upload,
    properties: new Upload(),
    filters: [
      {
        field: 'fileType',
        value: 'image',
      },
    ],
    serverPaging: false,
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private uploadService: UploadService,
    private appService: AppService,
    public dialogRef: MatDialogRef<SelectImgComponent>
  ) {
    console.log(data);
    this.fetch();
  }

  ngOnInit(): void {}

  async fetch() {
    try {
      await this.upload.fetch();
    } catch (err) {
      this.appService.toster(err);
    }
  }

  selectedImg(i: any) {
    this.selectItem = i;
  }

  add_Img(e: any) {
    console.log(e[0]);
    this.dialogRef.close(e[0]);
  }

  next() {
    console.log(this.selectItem);
    if (!this.selectItem) {
      this.appService.toster('Please select image');
    } else {
      this.dialogRef.close(this.selectItem);
    }
  }
}
