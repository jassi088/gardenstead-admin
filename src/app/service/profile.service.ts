import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppService } from '@core/services/app.service';
import { IApi } from '../http-handler/common/contracts/api';
import { GenericApi } from '../http-handler/common/generic-api';
import { Profile } from '@models/profile.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  profiles: IApi<Profile>;

  constructor(public http: HttpClient, private appService: AppService) {
    this.profiles = new GenericApi<Profile>('profiles', http);
  }
}
