import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child',
 // standalone: true,
  //imports: [],
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css'],
})
export class ChildComponent {

  @Input() parentMessage: string = '';
  @Output() childEvent = new EventEmitter<string>();

  sendMessage() {
    this.childEvent.emit("Hello Child!");
  }
}
