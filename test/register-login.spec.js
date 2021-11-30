const {
    expect
} = require("chai")
const {
    By,
    Builder,
    until,
    elementLocated,
    error
} = require("selenium-webdriver");

describe('Test performs the testing of the login and sign up forms', () => {
    let driver;
    let testDataRandomizer = () => {
        return Math.random().toString(36).replace(/[^a-z]/g, '').substr(0, 11);
    };
    let testNumbersRandomizer = () => {
        return (Math.floor(Math.random() * (98765432120 - 100)) + 10000);
    };

    before(() => {
        driver = new Builder().forBrowser('chrome').build();
        driver.manage().window().maximize();

    })
    after(async () => {
        await driver.sleep(9000);
        await driver.quit();
        driver = null;
    })
    it('Should test that page is loaded and the title matches the expected', async () => {
        await driver.get('https://www.ah.nl');
        expect(await driver.getTitle()).to.equal('Albert Heijn: boodschappen doen bij de grootste supermarkt');
    });

    it('Should test that modal is opened and buttom contains the text ', async () => {
        await driver.wait(until.elementLocated(By.id('cookie-popup'), 10000));
        expect(await driver.findElement(By.id('accept-cookies')).getText()).to.equal('Accepteer')
    });

    it('Should test that modal is closed after submission', async () => {
        await driver.findElement(By.id('accept-cookies')).click();
        expect(() => driver.findElement(By.id('cookie-popup'))()).to.throw();
    });

    it('Should test menu button name and user is landed on login screen after click', async () => {
        expect(await driver.findElement(By.xpath('//*[@id="menu_personal"]/li[2]/a/span')).getText()).to.equal('Inloggen');
        await driver.findElement(By.xpath('//*[@id="menu_personal"]/li[2]/a/span')).click();
        expect(await driver.getCurrentUrl()).to.equal('https://www.ah.nl/mijn/inloggen?ref=%2F');
    });

    it('Should test that page contains user sugn up link with text and  ', async () => {
        expect(await driver.findElement(By.xpath('//*[@id="app"]/div/main/div/div/div/div[2]/div[3]/div/footer/p[1]/a/span')).getText()).to.equal('Maak nu een profiel aan');
        await driver.findElement(By.xpath('//*[@id="app"]/div/main/div/div/div/div[2]/div[3]/div/footer/p[1]/a/span')).click();
    });


    it('Should test that radiobuttons is present and unticket by default', async () => {
        expect(await driver.findElement(By.id('f-radio-button-gender-female')).isSelected()).equal(false);
        expect(await driver.findElement(By.id('f-radio-button-gender-male')).isSelected()).equal(false);

        await driver.findElement(By.xpath('//*[@id="app"]/div/main/div/div/div/form/div[1]/span[1]/label')).click();
        expect(await driver.findElement(By.id('f-radio-button-gender-female')).isSelected()).equal(true);

        await driver.findElement(By.xpath('//*[@id="app"]/div/main/div/div/div/form/div[1]/span[2]/label')).click();
        expect(await driver.findElement(By.id('f-radio-button-gender-male')).isSelected()).equal(true);
    });


    it('Should complete the fields with the test data', async () => {

        await driver.findElement(By.name('firstName')).sendKeys(testDataRandomizer());
        await driver.findElement(By.name('lastName')).sendKeys(testDataRandomizer());
        await driver.findElement(By.name('address.postalCodeNld')).sendKeys(`1421XM`);
        await driver.findElement(By.name('address.houseNumber')).sendKeys(`1`);
        await driver.findElement(By.name('address.houseNumberExtra')).sendKeys(`1`);
        await driver.findElement(By.name('emailAddress')).sendKeys(`${testDataRandomizer()}@mailinator.com`);
        await driver.findElement(By.name('password')).sendKeys(`${testDataRandomizer().toUpperCase()}${testNumbersRandomizer()}`);
        await driver.findElement(By.css('#phoneNumber')).sendKeys(`06402190${testNumbersRandomizer()}`);
        await driver.findElement(By.css('#dateOfBirthWebshop')).sendKeys(`11-11-2000`);


    });

    it('Should test that Bonus card options are unticked by default and can be ticked', async () => {

        expect(await driver.findElement(By.id('f-radio-button-bonusCardChoice-optOut')).isSelected()).equal(false);
        expect(await driver.findElement(By.id('f-radio-button-bonusCardChoice-request')).isSelected()).equal(false);
        expect(await driver.findElement(By.id('f-radio-button-bonusCardChoice-input')).isSelected()).equal(false);


        await driver.findElement(By.xpath('//*[@id="app"]/div/main/div/div/div/form/div[7]/div[1]/div/span[3]/label')).click();
        expect(await driver.findElement(By.id('f-radio-button-bonusCardChoice-optOut')).isSelected()).equal(true);

        await driver.findElement(By.xpath('//*[@id="app"]/div/main/div/div/div/form/div[7]/div[1]/div/span[2]/label')).click();
        expect(await driver.findElement(By.id('f-radio-button-bonusCardChoice-request')).isSelected()).equal(true);


        await driver.findElement(By.xpath('//*[@id="app"]/div/main/div/div/div/form/div[7]/div[1]/div/span[1]/label')).click();
        expect(await driver.findElement(By.id('f-radio-button-bonusCardChoice-input')).isSelected()).equal(true);

    });


    it('Should test that custom Bonus card field can be completed', async () => {
        await driver.findElement(By.xpath('//*[@id="cards.BO"]')).sendKeys(`2620698240281`);
    });


    it('Should test that subscription checkboxes are unticked by defauilt and can be ticked', async () => {

        expect(await driver.findElement(By.id('f-checkbox-serviceMail')).isSelected()).equal(false);
        await driver.findElement(By.xpath('//*[@id="app"]/div/main/div/div/div/form/div[8]/div/label')).click();
        expect(await driver.findElement(By.id('f-checkbox-serviceMail')).isSelected()).equal(true);

        expect(await driver.findElement(By.id('f-checkbox-newsLetter')).isSelected()).equal(false)
        await driver.findElement(By.xpath('//*[@id="app"]/div/main/div/div/div/form/div[9]/div/label')).click();
        expect(await driver.findElement(By.id('f-checkbox-newsLetter')).isSelected()).equal(true)

    });

    it('Should test that can be submitted', async () => {
        await driver.findElement(By.id('registration-form-submit')).click();
    });

});