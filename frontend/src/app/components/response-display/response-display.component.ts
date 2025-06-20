import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-response-display',
  templateUrl: './response-display.component.html',
  styleUrls: ['./response-display.component.css']
})
export class ResponseDisplayComponent {
  @Input() responseText: string = '';
  // responseText = 'Response from GenAI will appear here.';
}
