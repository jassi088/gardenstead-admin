import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppService } from '@core/services/app.service';
import { IApi } from '../http-handler/common/contracts/api';
import { GenericApi } from '../http-handler/common/generic-api';
import { Upload } from '@models/upload.model';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  upload: IApi<Upload>;
  constructor(public http: HttpClient, private appService: AppService) {
    this.upload = new GenericApi<Upload>('uploads', http);
  }
}
