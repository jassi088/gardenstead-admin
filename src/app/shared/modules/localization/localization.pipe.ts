import { Pipe, PipeTransform } from '@angular/core';
import { LocalizationService } from '../../../service/localization.service';
@Pipe({
  name: 'localization'
})
export class LocalizationPipe implements PipeTransform {
  data: any
 valueData?: string
  constructor(private localizationService: LocalizationService) {
  this.data = this.localizationService.data
  }

  transform(value: string, args?: any) {
    this.valueData = this.data
   value.split('.').forEach((d:any) => {
        this.valueData = this.valueData![d]
    })
    return this.valueData;
  }


}
