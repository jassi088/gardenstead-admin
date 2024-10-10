import { IApi, ServerPageInput } from './api';
import { Filters } from './filters';
import * as _ from 'lodash';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

export class PageOptions<TModel> {
  api: IApi<TModel> = null as any;
  properties?: TModel;
  fields?: any = {
    id: 'id',
    timeStamp: 'timeStamp',
  };
  formatter?: (model: TModel) => TModel;
  pageSize? = 10;
  serverPaging? = true;
  currentPage? = 1;
  total? = 0;
  totalPage? = 0;
  items?: TModel[];
  filters?: any[];
  location?: Location;
  router?: Router;
  asyncWithLocation?: boolean;
}

export class PageModel<TModel> {
  pageNo = 1;
  pageSize: number = 10;
  total = 0;
  totalPage = 0;
  offset = 0;
  totalRecords = 0;
  items: Array<TModel> = [];
  stats: any;
}
export interface IPage {
  fetch(callback?: (err: any, page?: IPage) => any): any;
  loadNextItems(callback?: (err: any, page?: IPage) => any): any;
}

export class Page<TModel> extends PageModel<TModel> implements IPage {
  errors: string[] = [];
  filters: Filters;
  isLoading = false;
  isGettingNextItems = false;
  isGettingStats = false;
  lastpageNo = 0;

  private _subscription?: Subscription;

  private handleError(err: any, callback?: (err: any) => any): Promise<void> {
    this.errors.push(err);
    if (callback) {
      return callback(err);
    } else {
      return Promise.reject(err);
    }
  }

  constructor(private options: PageOptions<TModel>) {
    super();
    if (options.items) {
      this.items = options.items;
    }
    if (this.options.pageSize) {
      this.pageSize = options.pageSize!;
    }
    options.serverPaging =
      options.serverPaging != undefined ? options.serverPaging : true;
    this.items = [];
    this.filters = new Filters({
      associatedList: this,
      filters: options.filters as any,
      location: options.location,
      router: options.router,
      asyncWithLocation: options.asyncWithLocation,
    });
  }

  loadNextItems(
    e: any = undefined,
    callback?: (err: any, page?: Page<TModel>) => any
  ) {
    this.isLoading = true;
    let pos = 0,
      max = 0;
    if (e) {
      pos = Math.round(e.target.scrollTop) + e.target.offsetHeight;
      max = e.target.scrollHeight;
      this.isLoading = false;
    }
    if (
      this.totalRecords <= this.offset ||
      this.isGettingNextItems ||
      pos < max
    )
      return;
    this.isLoading = false;
    this.isGettingNextItems = true;
    return this.fetch(callback, this.isGettingNextItems);
  }

  async fetch(
    callback?: (err: any, page?: Page<TModel>) => any,
    isGettingNextItems = false
  ): Promise<Page<TModel>> {
    this.isLoading = !isGettingNextItems;
    this.offset = this.isLoading ? 0 : this.offset;
    const params = new ServerPageInput();

    if (!this.options.serverPaging) {
      params.serverPaging = false;
    } else {
      params.pageSize = this.pageSize || 10;
      params.pageNo = this.pageNo;
    }

    this.filters.appendParams(params);
    this._subscription?.unsubscribe();
    return this.options.api
      .search(params, (s: Subscription) => {
        this._subscription = s;
      })
      .then((page) => {
        this.isLoading = false;
        this.isGettingNextItems = false;
        const items: TModel[] = [];
        page.data = page.data ? page.data : page.items;

        _(page.data).each((item) => {
          if (this.options.formatter) {
            item = this.options.formatter(item);
          }
          items.push(item);
        });

        this.total = this.items.length; // page.total || this.stats.total || this.items.length;
        this.pageNo = page.pageNo;
        this.totalRecords = page.total;
        this.pageSize = page.pageSize;
        this.offset += page.pageSize;
        this.lastpageNo = 1; // Math.ceil(this.total / (page.pageSize|| this.items.length));
        if (isGettingNextItems) {
          this.items = [...this.items, ...items];
        } else {
          this.items = items;
        }

        if (callback) {
          return callback(null, this);
        } else {
          return Promise.resolve(this);
        }
      })
      .catch((err) => {
        this.isLoading = false;
        this.isGettingNextItems = false;
        return this.handleError(err, callback);
      });
  }

  add(param: TModel): Page<TModel> {
    this.items.push(param);
    return this;
  }

  remove(item: TModel): void {
    let data: any = item;
    let idField: any = this.options?.fields?.id;
    let id = data[idField];
    let found = false;
    if (this.items && this.items.length) {
      let i: any = this.items.length;
      let items: any = this.items;
      while (i--) {
        if (items[i] && items[i][idField] === id) {
          this.items.splice(i, 1);
          found = true;
          break;
        }
      }
    }

    if (found) {
      this.total = this.total - 1;
    }
  }
  refresh(callback?: (err: any, page?: Page<TModel>) => any) {
    this.fetch(callback);
    return this;
  }

  clear() {
    this.total = 0;
    this.items = [];
  }

  pages(): number[] {
    const maxPages = this.pageNo;
    let index: number;

    const pageNos: number[] = [];
    if (this.lastpageNo < maxPages) {
      // total number of pages is less then 10
      for (index = 1; index <= this.lastpageNo; index++) {
        pageNos.push(index);
      }
      if (pageNos.length === 0) {
        pageNos.push(1);
      }
      return pageNos;
    }

    //  current page is less than max pages//
    if (this.pageNo < maxPages / 2) {
      for (index = 1; index <= maxPages; index++) {
        pageNos.push(index);
      }

      pageNos.push(-1);
      return pageNos;
    }

    // if current page is greater than 10//
    if (this.pageNo + maxPages / 2 >= this.lastpageNo) {
      pageNos.push(-2);

      for (
        index = this.lastpageNo - maxPages;
        index <= this.lastpageNo;
        index++
      ) {
        pageNos.push(index);
      }

      return pageNos;
    }

    pageNos.push(-2);
    for (
      index = Math.ceil(this.pageNo - maxPages / 2);
      index <= Math.ceil(this.pageNo + maxPages / 2);
      index++
    ) {
      pageNos.push(index);
    }
    pageNos.push(-1);
    return pageNos;
  }

  showPage(pageNo: number): Promise<Page<TModel>> {
    if (this.isLoading) {
      return Promise.reject();
    }
    if (pageNo === -2) {
      pageNo = 1;
      return Promise.reject();
    }

    if (pageNo === -1) {
      pageNo = this.lastpageNo;
      return Promise.reject();
    }
    this.pageNo = pageNo;
    return this.fetch();
  }

  showPrevious() {
    if (this.isLoading || this.pageNo <= 1) {
      return;
    }
    this.showPage(this.pageNo - 1);
  }
  showNext() {
    if (this.isLoading || this.lastpageNo <= this.pageNo) {
      return;
    }
    this.showPage(this.pageNo + 1);
  }
}
