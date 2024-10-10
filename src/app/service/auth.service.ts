import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppService } from '@core/services/app.service';
import { IApi } from '../http-handler/common/contracts/api';
import { GenericApi } from '../http-handler/common/generic-api';
import { User } from '@models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  auths: IApi<User>;

  constructor(public http: HttpClient, private appService: AppService) {
    this.auths = new GenericApi<User>('auths', http);
  }
}
