import { A2Page } from './app.po';

describe('a2 App', () => {
  let page: A2Page;

  beforeEach(() => {
    page = new A2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
