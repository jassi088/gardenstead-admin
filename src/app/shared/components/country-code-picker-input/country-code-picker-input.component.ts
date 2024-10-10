
// import { HttpClient } from '@angular/common/http';
// import { Component, OnInit, forwardRef, Injector, AfterViewInit, Input, HostBinding, ElementRef } from '@angular/core';
// import { ControlValueAccessor, FormControl, NgControl, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
// const URL = "https://restcountries.eu/rest/v2/all";

// @Component({
//   selector: 'country-code-picker-input',
//   templateUrl: './country-code-picker-input.component.html',
//   styleUrls: ['./country-code-picker-input.component.scss'],
//   providers: [
//     {
//       provide: NG_VALUE_ACCESSOR,
//       multi: true,
//       useExisting: forwardRef(() => CountryCodePickerInputComponent)
//     }
//   ],
//   host: {
//     '(blur)': 'onTouch()'
//   }
// })
// export class CountryCodePickerInputComponent implements OnInit, ControlValueAccessor, AfterViewInit {


//   @Input('isWhite')isWhite?:boolean;
//   @Input('isBlack')isBlack?:boolean;
//   @Input('isprofile')isprofile?:boolean;
//   onChange: any = () => { }
//   onTouch: any = () => { };
//   isDisable: boolean = false;
//   control: FormControl = new FormControl('', [Validators.required]);
//   selected?:Country;
//   private _val = "";
//   set value(val) {
//     this._val = val
//     this.onChange(val)
//     this.onTouch(val)
//   }
//   private _countries: Array<Country> = [];
//   filterCountries: Array<Country> = [];
//   constructor(
//     private _injector: Injector,
//     private _httpClient: HttpClient,
//     private _el: ElementRef<HTMLElement>
//   ) {
//     this.fetch();
//   }

//   ngOnInit() {
//   }

//   stopPropigation(e: Event) {
//     e.preventDefault();
//     e.stopPropagation();
//   }

//   async fetch() {
//     await this._httpClient.get(URL).subscribe((d: Array<Country>) => {
//       this._countries = d;
//       this.filterCountries = [...this._countries];
//       if(this.value){
//         const country = d.find(i => i.callingCodes.includes(this.value || ''));
//         if(country) this.selected = country;
//       }
//     });
//   }

//   search(v: string) {
//     if (v) v = v.toLowerCase();
//     this.filterCountries = this._countries.filter((i) => {
//       return (i.name.toLowerCase().includes(v) || i.callingCodes.includes(v));
//     });
//   }

//   onSelect(item?: Country) {
//     if (!item) item = {};
//     this.value = (item.callingCodes && item.callingCodes.length) ? item.callingCodes[0] : "";
//     this.selected = {...item};
//     this.search('');
//   }

//   ngAfterViewInit() {
//     const ngControl: NgControl = this._injector.get(NgControl);
//     if (ngControl) {
//       setTimeout(() => {
//         this.control = ngControl.control as FormControl;
//       })
//     }
//   }

//   get value() {
//     return this._val || '';
//   }

//   writeValue(value: any) {
//     this.value = value;
//   }
//   registerOnChange(fn: any) {
//     this.onChange = fn;
//   }
//   registerOnTouched(fn: any) {
//     this.onTouch = fn;
//   }

//   setDisabledState(isDisable: boolean) {
//     this.isDisable = isDisable;
//   }


//   @HostBinding('class.country-code-picker') get class() { return true };

// }

// class Country {
//   name?: string;
//   topLevelDomain?: string[];
//   alpha2Code?: string;
//   alpha3Code?: string;
//   callingCodes?: string[];
//   capital?: string;
//   altSpellings?: string[];
//   region?: string;
//   subregion?: string;
//   population?: number;
//   latlng?: number[];
//   demonym?: string;
//   area?: number;
//   gini?: number;
//   timezones?: string[];
//   borders?: string[];
//   nativeName?: string;
//   numericCode?: string;
//   currencies?: {
//     code?: string;
//     name?: string;
//     symbol?: string;
//   }[];
//   languages?: {
//     iso639_1?: string;
//     iso639_2?: string;
//     name?: string;
//     nativeName?: string;
//   }[];
//   translations?: Object;
//   flag?: string;
//   regionalBlocs?: {
//     acronym?: string,
//     name?: string,
//     otherAcronyms?: [],
//     otherNames?: []
//   }[];
//   cioc?: string;
// }
