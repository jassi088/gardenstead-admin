import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppService } from '@core/services/app.service';
import { LocalStorageService } from 'src/app/core/services/localStorage.service';

@Component({
  selector: 'page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
})
export class PageHeaderComponent implements OnInit {
  admin: string | undefined;
  constructor(
    public localStorageService: LocalStorageService,
    public dialog: MatDialog,
    private appService: AppService
  ) {}

  ngOnInit() {
    this.admin = this.appService.user.fullName;
  }
}
