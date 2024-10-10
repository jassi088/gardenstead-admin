import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'page-content',
  template: ` <ng-content></ng-content> `,
  styles: [
    `
      :host {
        position: relative;
        flex: 1;
        overflow-y: scroll;
        padding: 0.5rem 1.5rem;
        /* padding:.5rem 0; */
        padding-bottom: 60px;
        &.disableScroll {
          overflow: hidden;
        }
      }
    `,
  ],
})
export class PageContentComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  @HostBinding('class.disableScroll')
  @Input()
  disableScroll: boolean = false;
}
