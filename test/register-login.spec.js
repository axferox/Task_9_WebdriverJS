const {By, Builder} = require("selenium-webdriver");
const {elementLocated} = require("selenium-webdriver/lib/until");
require("chromedriver");


async function Login() {
    let driver = await new Builder().forBrowser('chrome').build();
    //Setting up the browser window configuration
    driver.manage().window().maximize();

    //Test data block
    let testDataRandomizer = () => {
        return Math.random().toString(36).replace(/[^a-z]/g, '').substr(0, 11);
    };
    let testNumbersRandomizer = () => {
        return Math.floor(Math.random() * (10000 - 1000)) + 1000;
    };


    try {
        await driver.get('https://www.ah.nl');

        //Cookie consent
        await driver.wait(elementLocated(By.id('cookie-popup')));
        await driver.findElement(By.id('accept-cookies')).click();

        //Navigation on login screen
        await driver.findElement(By.xpath('//*[@id="menu_personal"]/li[2]/a/span')).click();

        //Navigation to user sign up page
        await driver.findElement(By.xpath('//*[@id="app"]/div/main/div/div/div/div[2]/div[3]/div/footer/p[1]/a/span')).click();

        //Completing/testing the forms
        await driver.findElement(By.css('#app > div > main > div > div > div > form > div:nth-child(1) > span:nth-child(1) > label')).click();
        await driver.findElement(By.css('#app > div > main > div > div > div > form > div:nth-child(1) > span:nth-child(2) > label')).click();
        await driver.findElement(By.name('firstName')).sendKeys(testDataRandomizer());
        await driver.findElement(By.name('lastName')).sendKeys(testDataRandomizer());
        await driver.findElement(By.name('address.postalCodeNld')).sendKeys(`1421XM`);
        await driver.findElement(By.name('address.houseNumber')).sendKeys(`1`);
        await driver.findElement(By.name('address.houseNumberExtra')).sendKeys(`1`);
        await driver.findElement(By.name('emailAddress')).sendKeys(`${testDataRandomizer()}@mailinator.com`);
        await driver.findElement(By.name('password')).sendKeys(`${testDataRandomizer().toUpperCase()}${testNumbersRandomizer()}`);
        await driver.findElement(By.css('#phoneNumber')).sendKeys(`06402190${testNumbersRandomizer()}`);
        await driver.findElement(By.css('#dateOfBirthWebshop')).sendKeys(`11-11-2000`);
        await driver.findElement(By.xpath('//*[@id="app"]/div/main/div/div/div/form/div[7]/div[1]/div/span[1]/label')).click();
        await driver.findElement(By.xpath('//*[@id="cards.BO"]')).sendKeys(`${testNumbersRandomizer()}`);
        await driver.findElement(By.xpath('//*[@id="app"]/div/main/div/div/div/form/div[7]/div[1]/div/span[2]/label')).click();
        await driver.findElement(By.xpath('//*[@id="app"]/div/main/div/div/div/form/div[7]/div[1]/div/span[3]/label')).click();
        await driver.findElement(By.xpath('//*[@id="app"]/div/main/div/div/div/form/div[8]/div/label')).click();
        await driver.findElement(By.xpath('//*[@id="app"]/div/main/div/div/div/form/div[9]/div/label')).click();
        await driver.findElement(By.xpath('//*[@id="registration-form-submit"]/span')).click();
        //Stuck on a captcha
        await driver.navigate().back();
        await driver.findElement(By.id('username')).sendKeys('ffnApp@gmail.com');
        await driver.findElement(By.id('password')).sendKeys('!1ffnApppp');
        await driver.findElement(By.xpath('//*[@id="app"]/div/main/div/div/div/form/div[3]/button')).click();
        //Stuck on a captcha

    } finally {
        await driver.quit();
    }
};
Login();
