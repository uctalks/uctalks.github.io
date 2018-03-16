import { browser} from 'protractor';
import { AutomationLocator } from '../automation-locators.enum';
import { getElementByAutomationLocator } from './utils';

export class HomePage {
  navigateTo() {
    return browser.get('/');
  }

  getTitleText() {
    return getElementByAutomationLocator(AutomationLocator.HeaderTitle).getText();
  }
}
