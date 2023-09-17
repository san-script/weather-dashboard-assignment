import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { AlertDirective } from './alert.directive';
import { AlertService } from './_service/alert.service';

@Component({
  template: `
    <div [appAlert]="type">Test Alert</div>
  `,
})
class TestComponent {
  type: 'success' | 'error' = 'success';
}

describe('AlertDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let debugElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, AlertDirective],
      providers: [AlertService],
    });
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });

  
});


