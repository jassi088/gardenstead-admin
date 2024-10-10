import { Page, IPage } from './page';
import { util, dateUtil } from '../helpers';
import * as _ from 'lodash';
import { Location } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

export class FiltersOptions {
  associatedList?: IPage;
  autoApply?= false;
  location?: Location;
  router?: Router;
  filters: any[] = [];
  asyncWithLocation?: boolean
}

export class Filter {
  field: '';
  value?: any;
  operator = 'eq';
  isSelected = false;
  static = false;
  skipUrl = false;
  constructor(param: any) {
    if (param.field) {
      this.field = param.field;
    } else {
      this.field = param;
    }

    if (param.value) {
      this.value = param.value;
    }

    if (param.operator) {
      this.operator = param.operator;
    }

    if (param.isSelected) {
      this.isSelected = param.isSelected;
    }

    if (param.skipUrl) {
      this.isSelected = param.skipUrl;
    }
  }
}

class FilterModel extends Filter {
  private originalValue: any;
  isEmpty = () => {
    return util(this.value).isEmpty();
  };

  set(value: string): Promise<IPage> {
    this.value = value;
    return this.filters.apply();
  };

  toggle(value: any): Promise<IPage> {
    if (this.value === value) {
      this.value = this.originalValue;
    } else {
      this.value = value;
    }

    return this.filters.apply();
  };
  reset(): Promise<IPage> {
    this.value = this.originalValue;
    return this.filters.apply();
  };

  go(): Promise<IPage> {
    return this.filters.apply();
  };

  constructor(criteria: any, private filters: Filters) {
    super(criteria);
    if (criteria.static) this.static = criteria.static;
    this.originalValue = this.value || '';
  }
}

export class Filters {

  items: FilterModel[] = [];
  properties: any = {};
  autoApply = true;
  // associatedList = options.;
  // autoApply = options.autoApply === false;

  location: Location;

  apply(callback?: (err: any, page?: IPage) => any): Promise<IPage> {
    if (this.autoApply) {
      return this.options.associatedList?.fetch(callback);
    } else {
      return Promise.resolve(this.options.associatedList as any);
    }
  }


  find(field: any): FilterModel {
    return _.find(this.items, (item) => {
      return item.field === field;
    }) as FilterModel;
  }

  reset(): Promise<IPage> {
    _.each(this.items, (item) => {
      item.reset();
    });
    return this.apply();

  }

  set(options: Filter, callback?: (err: any, page?: IPage) => any): Promise<IPage> {
    const item = this.find(options.field);
    item.value = options.value;
    return this.apply(callback);
  }

  mute() {
    this.autoApply = false;
  }

  unmute() {
    this.autoApply = this.options.autoApply as any;
  }


  appendParams(params: any) {
    params = params || {};


    // let httpParams = this.location ? (new HttpParams({ fromString: this.location.path().split('?')[1] })) : new HttpParams();
    let httpParams = new HttpParams();
    let routeParams: any = {};

    let paramsString = '?';

    _.each(this.items, (item) => {
      if (httpParams && !item.skipUrl) {
        const value = _.isDate(item.value) ? dateUtil(item.value).toJSON() : item.value;
        if (util(value).hasValue() && !item.static) {
          paramsString += `${item.field}=${value}&`;
          routeParams[item.field] = value;
        };
        httpParams.set(item.field, util(value).isEmpty() ? null : value);
      }

      if (item.value && item.value !== '' && item.value !== 0) {
        params.query[item.field] = item.value;
      }
    });

    if (this.options.asyncWithLocation) {
      let url = this.location.path().split('?')[0];
      if (this.options.router) {
        this.options.router.navigate([], { queryParams: routeParams });
      } else
        if (this.options.location) {
          this.location.replaceState(url, encodeURIComponent(paramsString));
        }
    }

    return params;
  }

  asyncWithQueryParams() {
    let url = decodeURIComponent(this.location.path().split('?')[1])?.replace('?','');
    if (url) {
      _.each(url.split('&'), (item) => {
        const [field, value] = item.split('=');
        if (_.hasIn(this.properties, field)) {
          this.properties[field].value = value;
        }
      })
    }
  }

  constructor(private options: FiltersOptions) {
    _.each(options.filters, (item) => {
      const model = new FilterModel(item, this);
      this.items.push(model);
      this.properties[model.field] = model;
    });
    this.location = options.location as any;
    this.autoApply = options.autoApply as any;
    if (options.asyncWithLocation && options.location) {
      this.asyncWithQueryParams();
    }
  }

}
