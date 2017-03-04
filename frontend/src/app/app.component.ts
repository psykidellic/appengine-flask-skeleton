import { Component } from '@angular/core';
import { LanguageServiceService } from './language-service.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [LanguageServiceService]
})
export class AppComponent {

  public text = "";
  public language = "";
  public magnitude = "";
  public score: number = 0.0;
  public sentiment = "";
  errorMessage: string;
  private analyzeUrl = "/analyze"

  constructor (private languageService: LanguageServiceService) {}

  analyzeText (event) {
    this.languageService.getSentiment(this.text)
        .subscribe(
          res => this.extractData(res),
          error =>  this.errorMessage = <any>error);
  }

  private extractData(res: any) {
    this.language = res.language
    this.magnitude = res.documentSentiment.magnitude
    var score = this.score = res.documentSentiment.score

    if (score < -0.5) {
      this.sentiment = 'Clearly negative'
    } else if (score > -0.5 && score <= 0.1) {
      this.sentiment = 'Neutral'
    } else if (score > 0.1 && score <= 0.3) {
      this.sentiment = 'Mixed'
    } else if (score > 0.3 && score <= 0.8) {
      this.sentiment = 'Positive'
    } else {
      this.sentiment = 'Clearly positive'
    }
  }


}
