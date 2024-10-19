import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebexComponentComponent } from './webex-component.component';

describe('WebexComponentComponent', () => {
  let component: WebexComponentComponent;
  let fixture: ComponentFixture<WebexComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebexComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WebexComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
