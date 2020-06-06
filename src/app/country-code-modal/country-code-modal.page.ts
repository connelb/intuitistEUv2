import { Component, OnInit, ElementRef, ViewChild, Input, ChangeDetectionStrategy } from '@angular/core';
import { ModalController, Platform, IonSlides } from '@ionic/angular';
import { CardPage } from '../card/card.page';
import { BehaviorSubject } from 'rxjs';
import gql from 'graphql-tag';
import { AppsyncService } from '../providers/appsync.service';
import { Auth } from 'aws-amplify';
import { CountryCode, CountryCodes } from "./country-codes";
import { FilterPipe } from '../country-code-modal/filter.pipe'


@Component({
  selector: 'app-country-code-modal',
  templateUrl: './country-code-modal.page.html',
  styleUrls: ['./country-code-modal.page.scss'],
})
export class CountryCodeModalPage implements OnInit {
  width: any;
  height: number;
  countryCodes: Array<CountryCode> = CountryCodes;
  searchText: string;

  constructor(public modalController: ModalController, private platform: Platform, private appsync: AppsyncService) { }

  async ngOnInit() { }

  ngAfterViewInit() {
    this.platform.ready().then(() => {
      this.width = this.platform.width();
      this.height = this.platform.height();
    });
  }

  selectCountry(code: CountryCode) {
    this.modalController.dismiss(code);
  }

}

