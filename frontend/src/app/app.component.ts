import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoading = false;
  response = '';

  setLoading(val: boolean) {
    this.isLoading = val;
  }

  setResponse(data: string) {
    this.response = data;
  }
  
}