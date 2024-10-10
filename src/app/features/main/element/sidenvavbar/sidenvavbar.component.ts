import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sidenvavbar',
  templateUrl: './sidenvavbar.component.html',
  styleUrls: ['./sidenvavbar.component.scss'],
})
export class SidenvavbarComponent implements OnInit {
  isActive?: boolean;

  tabs = [
    {
      navigation: 'user',
      title: 'Users',
      activeImg: 'assets/images/sidenavicons/active/users-active.svg',
      grayImg: 'assets/images/sidenavicons/inactive/users.svg',
    },
  ];

  constructor() {}

  ngOnInit() {}
}
