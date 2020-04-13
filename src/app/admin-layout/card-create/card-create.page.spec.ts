import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CardCreatePage } from './card-create.page';

describe('CardCreatePage', () => {
  let component: CardCreatePage;
  let fixture: ComponentFixture<CardCreatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardCreatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CardCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
