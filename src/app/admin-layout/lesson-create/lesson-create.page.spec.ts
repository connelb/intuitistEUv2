import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LessonCreatePage } from './lesson-create.page';

describe('LessonCreatePage', () => {
  let component: LessonCreatePage;
  let fixture: ComponentFixture<LessonCreatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessonCreatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LessonCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
