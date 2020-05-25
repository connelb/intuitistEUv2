import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TestModalPage } from './test-modal.page';

describe('VideoModalPage', () => {
  let component: TestModalPage;
  let fixture: ComponentFixture<TestModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TestModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
