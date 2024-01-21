import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleNetworkComponent } from './example-network.component';

describe('ExampleNetworkComponent', () => {
  let component: ExampleNetworkComponent;
  let fixture: ComponentFixture<ExampleNetworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExampleNetworkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExampleNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
