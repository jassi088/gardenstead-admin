import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'page-container',
  template: ` <ng-content></ng-content> `,
  styles: [
    `
      :host {
        background-color: #f3f3f3;
        padding: 0rem;
        display: flex;
        height: 100vh;
        width: 100%;
        flex-direction: column;
      }
    `,
  ],
})
export class PageContainerComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
