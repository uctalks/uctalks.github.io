import { element, by, ElementFinder } from 'protractor';
import { AutomationLocator } from '../automation-locators.enum';

export function getElementByAutomationLocator(locator: AutomationLocator): ElementFinder {
  return element(by.css(`[data-automation-locator="${locator}"]`));
}
