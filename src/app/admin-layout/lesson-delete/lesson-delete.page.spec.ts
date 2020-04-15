import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LessonDeletePage } from './lesson-delete.page';

describe('LessonDeletePage', () => {
  let component: LessonDeletePage;
  let fixture: ComponentFixture<LessonDeletePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessonDeletePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LessonDeletePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
