import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '@core/services/app.service';
import { Page } from '@http-handler/common/contracts/page';
import { Profile } from '@models/profile.model';
import { ConfirmationComponent } from '@shared/components/confirmation/confirmation.component';
import { ProfileService } from 'src/app/service/profile.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  profileId: string | undefined;

  status = [
    {
      value: 'active',
      label: 'Active',
    },
    {
      value: 'inactive',
      label: 'Inactive',
    },
    {
      value: 'blocked',
      label: 'Blocked',
    },
    {
      value: 'deleted',
      label: 'Deleted',
    },
  ];

  profiles: Page<Profile> = new Page({
    api: this.profileService.profiles,
    properties: new Profile(),
    filters: [
      { field: 'search', value: '' },
      { field: 'status', value: '' },
    ],
    pageSize: 10,
  });

  constructor(
    public dialog: MatDialog,
    private profileService: ProfileService,
    private appService: AppService,
    private activatedRoute: ActivatedRoute
  ) {
    this.fetch();
  }

  async fetch() {
    try {
      await this.profiles.fetch();
    } catch (error) {
      this.appService.toster(error);
    }
  }

  ngOnInit() {}

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
          // this.profileService.profiles
          //   .remove(id)
          //   .then(() => {
          //     this.appService.toster('User deleted successfully.');
          //     this.fetch();
          //   })
          //   .catch((error) => {
          //     this.appService.toster(error);
          //   });
        }
      });
  }

  confirmationStatus(id: any, status: any) {
    this.dialog
      .open(ConfirmationComponent, {
        autoFocus: false,
        panelClass: 'prf-modal',
        width: '340px',
        height: '244px',
        data: {
          title: `${status == 'active' ? 'Active' : 'Inactive'} User`,
          description: `Are you sure you want to ${
            status == 'active' ? 'active' : 'inactive'
          } this user?`,
        },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          // let body: any = {};
          // body.status = status;
          // this.profileService.profiles
          //   .update(id, body)
          //   .then(() => {
          //     this.appService.toster(
          //       `User ${
          //         status == 'active' ? 'active' : 'inactive'
          //       } successfully`
          //     );
          //     this.fetch();
          //   })
          //   .catch((error) => {
          //     this.appService.toster(error);
          //   });
        }
      });
  }
}
