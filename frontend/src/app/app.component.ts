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
  public score = "";
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
    this.score = res.documentSentiment.score
  }


}
