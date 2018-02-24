import { HomePage } from './app.po';

describe('a2 App', () => {
  let page: HomePage;

  beforeEach(() => {
    page = new HomePage();
  });

  it('should display message saying ucTalks (alpha)', async () => {
    page.navigateTo();
    const text = await page.getTitleText();
    expect(text).toEqual('ucTalks (alpha)');
  });
});
