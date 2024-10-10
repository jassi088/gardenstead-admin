import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';

@Pipe({
  name: 'base64',
})
export class Base64Pipe implements PipeTransform {
  transform(file: any, args?: any): any {
    if (file) {
      if (typeof file === 'string') {
        return this.getImgfromUrl(file);
      } else {
        return this.getImgFromFile(file);
      }
    }
  }

  getImgFromFile(file: File): Observable<string> {
    return Observable.create(
      (observer: {
        next: (arg0: string | ArrayBuffer | null) => void;
        complete: () => void;
      }) => {
        let reader = new FileReader();
        reader.onloadend = (e) => {
          observer.next(reader.result);
          observer.complete();
        };
        reader.readAsDataURL(file);
      }
    );
  }

  getImgfromUrl(url: string) {
    return Observable.create(
      async (observer: { next: (arg0: any) => void; complete: () => void }) => {
        observer.next(await urlToBase64(url));
        observer.complete();
      }
    );
  }
}

declare const urlToBase64: any, toBase64: any;
