import { Component } from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public text = ""
  public language = ""
  public magnitude = ""
  public score = ""
  private analyzeUrl = "/analyze"

  constructor (private http: Http) {}

  analyzeText (event) {
    this.http.post(this.analyzeUrl, {'text': this.text})
        .toPromise()
        .then(res => res.json())
        .catch(this.handleError)
        .then(res => this.extractData(res),
          err => console.log(err)
        )
  }

  private extractData(res: any) {
    this.language = res.language
    this.magnitude = res.documentSentiment.magnitude
    this.score = res.documentSentiment.score
  }

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastkructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Promise.reject(errMsg);
  }
}
