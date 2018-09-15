import { Component } from '@angular/core';

import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private http: Http) { }

  responseStatus;
  responseContent;
  applicationId;
  applicationJson;

  getAll() {
    this.clearOutput();
    this.http.get("http://localhost:8080/application").subscribe(
      (data) => this.processSuccessfulResponse(data),
      (error) => this.processFailedResponse(error)
    );
    this.clearInput();
  }

  getOne() {
    this.clearOutput();
    this.http.get("http://localhost:8080/application/" + this.applicationId).subscribe(
      (data) => this.processSuccessfulResponse(data),
      (error) => this.processFailedResponse(error)
    );
    this.clearInput();
  }

  saveOne() {
    this.clearOutput();
    const headers = new Headers(
      {
          'Content-Type': 'application/json'
      });
    let options = new RequestOptions(); 
    options.headers = headers;
    this.http.post("http://localhost:8080/application", this.applicationJson, options).subscribe(
      (data) => this.processSuccessfulResponse(data),
      (error) => this.processFailedResponse(error)
    );
    this.clearInput();
  }

  processSuccessfulResponse(data) {
    this.responseContent = data.text();
    this.responseStatus = data.status + " " + data.statusText;
  }

  processFailedResponse(error) {
    if (error.status === 0) {
      this.responseContent = "Connection time out";
      this.responseStatus = "408 Request Timeout";
    } else {
      this.responseContent = error.text();
      this.responseStatus = error.status + " " + JSON.parse(error.text()).error;
    }
  }

  clearInput() {
    this.applicationId = "";
    this.applicationJson = "";
  }

  clearOutput() {
    this.responseContent = "";
    this.responseStatus = "";
  }

}
