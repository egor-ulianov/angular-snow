import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkScienceComponent } from './network-science.component';

describe('NetworkScienceComponent', () => {
  let component: NetworkScienceComponent;
  let fixture: ComponentFixture<NetworkScienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NetworkScienceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NetworkScienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
