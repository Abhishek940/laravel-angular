import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebexCallbackComponentComponent } from './webex-callback-component.component';

describe('WebexCallbackComponentComponent', () => {
  let component: WebexCallbackComponentComponent;
  let fixture: ComponentFixture<WebexCallbackComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebexCallbackComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WebexCallbackComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
