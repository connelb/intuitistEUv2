import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CountryCodeModalPage } from './country-code-modal.page';

describe('VideoModalPage', () => {
  let component: CountryCodeModalPage;
  let fixture: ComponentFixture<CountryCodeModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountryCodeModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CountryCodeModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
