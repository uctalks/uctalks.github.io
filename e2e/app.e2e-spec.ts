import { HomePage } from './app.po';

describe('a2 App', () => {
  let page: HomePage;

  beforeEach(() => {
    page = new HomePage();
  });

  it('should display message saying ucTalks (beta)', async () => {
    page.navigateTo();
    const text = await page.getTitleText();
    expect(text).toEqual('ucTalks (beta)');
  });
});
