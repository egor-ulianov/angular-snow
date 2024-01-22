import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstagramNetworkComponent } from './instagram-network.component';

describe('InstagramNetworkComponent', () => {
  let component: InstagramNetworkComponent;
  let fixture: ComponentFixture<InstagramNetworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstagramNetworkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstagramNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
