import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-query-input',
  templateUrl: './query-input.component.html',
  styleUrls: ['./query-input.component.css']
})
export class QueryInputComponent {
  userQuery = '';

  @Output() querySubmitted = new EventEmitter<string>();

  submitQuery() {
    console.log("working", this.userQuery);
    if (!this.userQuery.trim()) return;
    this.querySubmitted.emit(this.userQuery);
    this.userQuery = '';
  }
}
