import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '@core/services/app.service';
import { Model } from '@http-handler/common/contracts/model';
import { User } from '@models/user.model';
import { ConfirmationComponent } from '@shared/components/confirmation/confirmation.component';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.component.html',
  styleUrls: ['./userdetail.component.scss'],
})
export class UserdetailComponent implements OnInit {
  id: any;
  getById: Model<User> = new Model({
    api: this.userService.users,
    properties: new User(),
  });

  constructor(
    private userService: UserService,
    private appService: AppService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private dialog: MatDialog
  ) {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.fetch();
  }

  ngOnInit(): void {}

  async fetch() {
    try {
      let d = await this.getById.fetch(this.id);
      console.log(d);
    } catch (err) {
      this.appService.toster(err);
    }
  }

  confirmation(id: any) {
    this.dialog
      .open(ConfirmationComponent, {
        autoFocus: false,
        panelClass: 'prf-modal',
        width: '340px',
        height: '244px',
        data: {
          title: 'Delete User',
          description: 'Are you sure you want to delete this user?',
        },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          console;
          this.userService.users
            .remove(id)
            .then(() => {
              this.appService.toster('User deleted successfully.');
              this.fetch();
            })
            .catch((error) => {
              this.appService.toster(error);
            });
        }
      });
  }

  goBack(): void {
    this.location.back();
  }
}
