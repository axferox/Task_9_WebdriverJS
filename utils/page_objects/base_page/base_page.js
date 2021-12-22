const { Builder, wait, until, By } = require("selenium-webdriver");
const { driver } = require("../../driver/chrome_driver");
const { Header } = require("./header");

class BasePage {
  constructor() {
    this.baseUrl = `https://www.ah.nl`;
    this.Header = new Header();
  }

  getPageUrl() {
    return `${this.baseUrl}${this.path}`;
  }

  open() {
    return driver.get(`${this.baseUrl}${this.path}`);
  }

  sleep(milliseconds) {
    return driver.sleep(milliseconds);
  }

  getTitle() {
    return driver.getTitle();
  }

  getCurrentUrl() {
    return driver.getCurrentUrl();
  }

  input(element, inputData) {
    return this.getElement(element).sendKeys(inputData);
  }

  selected(element) {
    return this.getElement(element).isSelected();
  }

  waitUntilTitleIsLoaded() {
    return driver.wait(until.titleIs(this.expectedTitle));
  }

  getElementText(element) {
    return this.getElement(element).getText();
  }

  elementClick(element) {
    return this.getElement(element).click();
  }

  elementClickAction(element) {
    return driver.actions().click(this.getElement(element)).perform();
  }

  elementHoverAction(element) {
    return driver
      .actions()
      .move({ duration: 5000, origin: this.getElement(element) })
      .perform();
  }

  elementFindAndClickJavaScript(element) {
    return driver.executeScript(`document.querySelector("${element}").click()`);
  }

  waitUntilElementIsVisible(element, waitMilliseconds = 10000) {
    return driver.wait(until.elementIsVisible(this.getElement(element), waitMilliseconds));
  }

  getElement(element) {
    if (element.locatorType === "xpath") {
      return driver.findElement(By.xpath(element.locatorId));
    } else if (element.locatorType === "id") {
      return driver.findElement(By.id(element.locatorId));
    } else if (element.locatorType === "css") {
      return driver.findElement(By.css(element.locatorId));
    } else if (element.locatorType === "name") {
      return driver.findElement(By.name(element.locatorId));
    } else {
      throw Error(`Element Locator: ${element.locatorType} or Id: ${element.locatorId} is not defined`);
    }
  }
}

module.exports = { BasePage };
