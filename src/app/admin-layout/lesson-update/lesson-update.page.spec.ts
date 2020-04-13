import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LessonUpdatePage } from './lesson-update.page';

describe('LessonUpdatePage', () => {
  let component: LessonUpdatePage;
  let fixture: ComponentFixture<LessonUpdatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessonUpdatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LessonUpdatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
