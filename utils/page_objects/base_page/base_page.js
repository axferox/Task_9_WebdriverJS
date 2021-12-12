const { Builder, wait, until, By } = require("selenium-webdriver");
const { driver } = require("../../webdriver/chrome_driver");
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

    waitUntilElementIsLoaded(element, waitMilliseconds = 10000) {
        if (element.locatorType === "xpath") {
            return driver.wait(until.elementLocated(By.xpath(element.locatorId), waitMilliseconds));
        } else if (element.locatorType === "id") {
            return driver.wait(until.elementLocated(By.id(element.locatorId)), waitMilliseconds);
        } else if (element.locatorType === "css") {
            return driver.wait(until.elementLocated(By.css(element.locatorId)), waitMilliseconds);
        } else {
            throw Error(`Element Locator: ${element.locatorType} or Id: ${element.locatorId} is not defined`);
        }
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