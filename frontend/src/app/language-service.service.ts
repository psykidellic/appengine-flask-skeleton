import { Injectable } from '@angular/core';
import {Http, Headers, Response} from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class LanguageServiceService {

  private analyzeUrl = "/analyze"

  constructor(private http: Http) { }

  getSentiment (text: string): Observable<any> {
    return this.http.post(this.analyzeUrl, {'text': text})
               .map(this.extractData)
               .catch(this.handleError)
  }

  private extractData(res: any) {
    return res.json() || { };
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
