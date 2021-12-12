const { Builder } = require("selenium-webdriver");

const driver = new Builder().forBrowser("chrome").build();

async function chromeConfig() {
    await driver.manage().window().maximize();
}

async function quit() {
    return await driver.quit();
}

async function sleep() {
    return await driver.sleep(10000);
}

module.exports = { driver, chromeConfig, quit, sleep };