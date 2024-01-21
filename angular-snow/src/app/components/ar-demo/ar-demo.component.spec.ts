import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArDemoComponent } from './ar-demo.component';

describe('ArDemoComponent', () => {
  let component: ArDemoComponent;
  let fixture: ComponentFixture<ArDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArDemoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
