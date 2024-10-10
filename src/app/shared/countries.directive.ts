import { Directive, OnDestroy } from '@angular/core';
import { CountryService } from '../service/country.service';

@Directive({
  selector: '[countryList], countryList',
  exportAs: 'countryList'
})
export class CountriesDirective implements OnDestroy {

  search: string = '';

  constructor(
    private _countryService: CountryService
  ) { }

  get list() {
    return this._countryService.list;
  }

  ngOnDestroy() {
    this.search = '';
    this._countryService.resetList();
  }

}
