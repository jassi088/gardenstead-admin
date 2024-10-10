import { Component } from '@angular/core';
import { LocalizationService } from './service/localization.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isLoading: boolean = false;
  constructor(public localizationService: LocalizationService) {
    this.loadStrings();
  }
  async loadStrings() {
    this.isLoading = true;
    await this.localizationService.load();
    this.isLoading = false;
  }
}
