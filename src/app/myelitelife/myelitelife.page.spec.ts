import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyelitelifePage } from './myelitelife.page';

describe('MyelitelifePage', () => {
  let component: MyelitelifePage;
  let fixture: ComponentFixture<MyelitelifePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyelitelifePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyelitelifePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
