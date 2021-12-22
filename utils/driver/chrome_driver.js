const { Builder } = require("selenium-webdriver");

const driver = new Builder().forBrowser("chrome").usingServer("http://localhost:4444/").build();

async function browserConfig() {
  await driver.manage().window().maximize();
}

async function quit() {
    return await driver.quit();
}

async function sleep() {
    return await driver.sleep(10000);
}

module.exports = { driver, browserConfig, quit, sleep };