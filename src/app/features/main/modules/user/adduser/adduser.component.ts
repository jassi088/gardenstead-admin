import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '@core/services/app.service';
import { Model } from '@http-handler/common/contracts/model';
import { Page } from '@http-handler/common/contracts/page';
import { Role } from '@models/role.mode';
import { User } from '@models/user.model';
import { ValidatorsService } from 'src/app/core/services/validation.service';
import { RoleService } from 'src/app/service/role.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss'],
})
export class AdduserComponent implements OnInit {
  data: any;
  id: any;
  isLoading?: boolean;

  form: FormGroup = new FormGroup({
    name: new FormControl('', [
      ValidatorsService.required,
      ValidatorsService.spaceValidator,
    ]),
    lastName: new FormControl('', []),
    email: new FormControl('', [
      ValidatorsService.emailValidator,
      ValidatorsService.required,
    ]),
    phone: new FormControl('', [
      ValidatorsService.phoneMinLength,
      ValidatorsService.required,
    ]),
    countryCode: new FormControl(),
    roleId: new FormControl('', [ValidatorsService.selectRequired]),
    uploadId: new FormControl(),
    upload: new FormControl({}),
  });

  get formValue(): User {
    return this.form.value;
  }

  getById: Model<User> = new Model({
    api: this.userService.users,
    properties: new User(),
  });

  list: Page<Role> = new Page({
    api: this.roleService.role,
    properties: new Role(),
    filters: [],
  });

  constructor(
    private appService: AppService,
    private userService: UserService,
    private roleService: RoleService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.id = this.activeRoute.snapshot.params['id'];
    this.form.get('countryCode')?.setValue('1');
    this.fetch();
    if (this.id) {
      this.fetchById();
    }
  }

  fillForm(data: any) {
    if (data.role.id) this.form.get('roleId')?.setValue(data.role.id);
    ValidatorsService.updateForm(this.form, data);
    console.log(data);
  }

  ngOnInit(): void {}

  async fetch() {
    try {
      this.list.fetch();
    } catch (err) {
      this.appService.toster(err);
    }
  }

  async fetchById() {
    try {
      let d = await this.getById.fetch(this.id);
      this.fillForm(d);
    } catch (err) {
      this.appService.toster(err);
    }
  }

  async createUser() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (!this.form.get('roleId')?.value) {
      this.appService.toster('Please select role');
      return;
    }

    if (!this.form.get('countryCode')?.value) {
      this.appService.toster('Please select country code');
      return;
    }
    try {
      this.isLoading = true;
      let res = await this.userService.users.create(
        this.form.value,
        'signup/from/admin'
      );
      if (res) {
        this.appService.toster('User added successfully');
        this.router.navigate(['/admin/user']);
      }
    } catch (err: any) {
      this.isLoading = false;
      this.appService.toster(err);
    }
  }

  async updateUser() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    if (!this.form.get('roleId')?.value) {
      this.appService.toster('Please select role');
      return;
    }
    try {
      this.isLoading = true;
      let res = await this.userService.users.update(
        this.id,
        this.form.value,
        undefined,
        ''
      );
      if (res) {
        this.appService.toster('User details updated successfully');
        this.router.navigate(['/admin/user']);
      }
    } catch (err: any) {
      this.isLoading = false;
      this.appService.toster(err);
    }
  }
}
