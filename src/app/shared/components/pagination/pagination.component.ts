import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  pages: number[] = [1];
  showPages: number[] = [0, 1];
  totalPages: number = 1;
  intervel: any;
  @Input() pageSizeOptions: number[] = [5, 10, 25, 50, 75, 100];
  @Input() pageNo = 1;
  @Input() totalRecords = 0;
  @Input() pageSize = 10;
  @Input() isLoading?: boolean;

  @Output() page: EventEmitter<any> = new EventEmitter();
  @Output() pageSizeChange: EventEmitter<number> = new EventEmitter();
  @Output() pageNoChange: EventEmitter<number> = new EventEmitter();

  constructor() {}

  ngOnChanges(change: SimpleChanges) {
    this.setPagesCount();
  }

  ngOnInit() {
    if (!this.pageSize) this.pageSize = 10;
    this.totalPages = parseInt(`${this.totalRecords / this.pageSize}`);
  }

  next() {
    if (this.disable('next')) return;
    this.pageNo++;
    this.setPage();
  }

  nextPages() {
    if (this.disable('nextPages')) return;
    this.showPages[0] = this.showPages[0] + 1;
    this.showPages[1] = this.showPages[1] + 1;
  }

  previous() {
    if (this.disable('previous')) return;
    this.pageNo--;
    this.setPage();
  }

  directPage(p?: any) {
    this.pageNo = p;
    this.setPage();
  }

  previousPages() {
    if (this.disable('previousPages')) return;
    this.showPages[0] = this.showPages[0] - 1;
    this.showPages[1] = this.showPages[1] - 1;
  }

  setPagesCount() {
    this.totalPages = parseInt(`${this.totalRecords / this.pageSize}`);
    if (this.totalPages < this.totalRecords / this.pageSize) {
      this.totalPages++;
    }
    if (this.totalRecords > this.pageSize) {
      this.totalPages = this.totalRecords / this.pageSize;
    }
    if (this.totalPages == 0) {
      this.totalPages = 1;
    }
    this.setViewPages();
  }

  setViewPages() {
    this.totalPages =
      JSON.stringify(this.totalPages).split('.').length >= 2
        ? parseInt(this.totalPages as any) + 1
        : this.totalPages;
    this.pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      this.pages.push(i);
    }
    if (!this.pages.length) this.pages.push(1);
  }

  setPage() {
    this.pageNoChange.emit(this.pageNo);
    this.pageSizeChange.emit(this.pageSize);
    this.page.emit();
  }

  disable(type: any): any {
    switch (type) {
      case 'next':
        return (
          this.isLoading ||
          !this.pages.length ||
          this.pageNo === this.totalPages
        );
      case 'nextPages':
        return (
          this.isLoading ||
          !this.pages.length ||
          this.showPages[1] >= this.totalPages
        );
      case 'previous':
        return this.isLoading || !this.pages.length || this.pageNo == 1;
      case 'previousPages':
        return this.isLoading || !this.pages.length || this.showPages[0] == 0;
    }
  }
}
