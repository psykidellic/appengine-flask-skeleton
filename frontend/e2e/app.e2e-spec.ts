import { GoogleMlPage } from './app.po';

describe('google-ml App', () => {
  let page: GoogleMlPage;

  beforeEach(() => {
    page = new GoogleMlPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
