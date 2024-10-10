import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppService } from '@core/services/app.service';
import { IApi } from '../http-handler/common/contracts/api';
import { GenericApi } from '../http-handler/common/generic-api';
import { Role } from '@models/role.mode';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  role: IApi<Role>;

  constructor(public http: HttpClient, private appService: AppService) {
    this.role = new GenericApi<Role>('roles', http);
  }
}
