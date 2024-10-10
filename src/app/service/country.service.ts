import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from 'src/app/models/country.model';
import { AppService } from '@core/services/app.service';
const url = '/assets/json/countries.json';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private _countries: Country[] = [];
  private _filteredCountries: Country[] = [];

  constructor(private _http: HttpClient, public appService: AppService) {
    this.fetch();
  }

  fetch() {
    this._http.get<{ items: Country[] }>(url).subscribe((d) => {
      this._countries = [...d.items];
      this._filteredCountries = [...d.items];
    });
  }

  fetchFlags() {}

  get CountiresflagList() {
    return this._countries;
  }

  get allCounties() {
    return this._countries;
  }

  get list() {
    return this._filteredCountries;
  }

  search(input: string) {
    const value = input.toLowerCase();
    this._filteredCountries = this._countries.filter((i) =>
      i.name?.toLowerCase()?.includes(value)
    );
  }

  resetList() {
    this._filteredCountries = [...this._countries];
  }
}
