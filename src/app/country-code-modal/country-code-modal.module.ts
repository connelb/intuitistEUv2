import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CountryCodeModalPageRoutingModule } from './country-code-modal-routing.module';

import { CountryCodeModalPage } from './country-code-modal.page';
import { FilterPipe} from './filter.pipe'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CountryCodeModalPageRoutingModule
  ],
  declarations: [CountryCodeModalPage,FilterPipe]
})
export class CountryCodeModalPageModule {}
