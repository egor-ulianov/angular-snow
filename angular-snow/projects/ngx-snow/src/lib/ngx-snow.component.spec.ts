import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxSnowComponent } from './ngx-snow.component';

describe('NgxSnowComponent', () => {
  let component: NgxSnowComponent;
  let fixture: ComponentFixture<NgxSnowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxSnowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxSnowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
