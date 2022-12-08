import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CardInsidePage } from './card-inside.page';

describe('CardInsidePage', () => {
  let component: CardInsidePage;
  let fixture: ComponentFixture<CardInsidePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardInsidePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CardInsidePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
