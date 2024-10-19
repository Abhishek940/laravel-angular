import { Component } from '@angular/core';

@Component({
  selector: 'app-parent',
  //standalone: true,
  //imports: [],
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css'],
})
export class ParentComponent {

  parentMessage = "Hello from Parent!";
  messageFromChild: string = '';

  receiveMessage(message: string) {
    this.messageFromChild = message;
  }

}
