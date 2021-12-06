const PageFactory = require('../utils/page_factory');
const { chromeConfig, sleep, quit } = require('../utils/webdriver/chrome_driver');
const { expect } = require("chai")
const TestData = require('../utils/test_data/test_data');

describe('Test performs the testing of the login and sign up forms', () => {
    
    before(async () => {
        chromeConfig();
    })
    after(async () => {
        sleep();
        quit();
    })

    it('Should test that page is loaded and the title matches the expected', async () => {
        const homePageTitle = await PageFactory.getPage("Home")
        await PageFactory.getPage("Home").open();
        await PageFactory.getPage("Home").waitUntilTitleIsLoaded();
        expect(await PageFactory.getPage("Home").getTitle()).equal(homePageTitle.expectedTitle);
    });

    it('Should test that cookie modal is opened and Accept button contains the text ', async () => {
        const cookiePopup = await PageFactory.getPage("Cookie_Popup");
        await PageFactory.getPage("Cookie_Popup").waitUntilElementIsLoaded(cookiePopup.cookiePopupModal);
        expect(await PageFactory.getPage("Cookie_Popup").getElementText(cookiePopup.acceptButton)).equal(cookiePopup.acceptButton.locatorText);
    });

    it('Should test that modal is closed after submission', async () => {
        const cookiePopup = await PageFactory.getPage("Cookie_Popup");
        await PageFactory.getPage("Cookie_Popup").elementClick(cookiePopup.acceptButton);
        expect(() => PageFactory.getPage("Cookie_Popup").getElement(cookiePopup.cookiePopupModal)()).to.throw();
    });

    it('Should test that menu login button name matches the expected and can be clicked', async () => {
        const HeaderNavigationMenu = await PageFactory.getPage("Home").Header.HeaderNavigation;
        const menuLoginButton = HeaderNavigationMenu.menuLoginButton;
        expect(await PageFactory.getPage("Home").getElementText(menuLoginButton)).equal(menuLoginButton.locatorText);
        await PageFactory.getPage("Home").elementClick(menuLoginButton);
    });

    it('Should test that user is landed on login screen after click', async () => {
        const loginPage = await PageFactory.getPage("Log_in");
        expect(await PageFactory.getPage("Log_in").getCurrentUrl()).equal(await loginPage.getPageUrl());
    });

    it('Should test that page contains user sign up link with text present and user is landed on sing up page after click', async () => {
        const loginPageLink = await PageFactory.getPage("Log_in").signInLink;
        expect(await PageFactory.getPage("Log_in").getElementText(loginPageLink)).equal(loginPageLink.locatorText);

        await PageFactory.getPage("Log_in").elementClick(loginPageLink)
        const signupPage = await PageFactory.getPage("Sign_up");
        expect(await PageFactory.getPage("Sign_up").getCurrentUrl()).equal(await signupPage.getPageUrl());
    });

    it('Should test that user is landed on sing up page after click', async () => {
        const signupPage = await PageFactory.getPage("Sign_up");
        expect(await PageFactory.getPage("Sign_up").getCurrentUrl()).equal(await signupPage.getPageUrl());
    });

    it('Should test that radiobuttons is present and unticket by default', async () => {
        const femaleButton = await PageFactory.getPage("Sign_up").femaleButton;
        const maleButton = await PageFactory.getPage("Sign_up").maleButton;

        expect(await PageFactory.getPage("Sign_up").selected(femaleButton)).equal(false);
        expect(await PageFactory.getPage("Sign_up").selected(maleButton)).equal(false);

        await PageFactory.getPage("Sign_up").elementClick(femaleButton.span);
        expect(await PageFactory.getPage("Sign_up").selected(femaleButton)).equal(true);

        await PageFactory.getPage("Sign_up").elementClick(maleButton.span);
        expect(await PageFactory.getPage("Sign_up").selected(maleButton)).equal(true);

    });


    it('Should complete the fields with the test data', async () => {
        const inputField = await PageFactory.getPage("Sign_up");

        await PageFactory.getPage("Sign_up").input(inputField.firstName, TestData.textGenerator());
        await PageFactory.getPage("Sign_up").input(inputField.lastName, TestData.textGenerator());
        await PageFactory.getPage("Sign_up").input(inputField.postalCodeNld, TestData.postalCodeNld());
        await PageFactory.getPage("Sign_up").input(inputField.houseNumber, TestData.houseNumber());
        await PageFactory.getPage("Sign_up").input(inputField.houseNumberExtra, TestData.houseNumberExtra());
        await PageFactory.getPage("Sign_up").input(inputField.emailAddress, TestData.mailRandomizer());
        await PageFactory.getPage("Sign_up").input(inputField.password, TestData.passwordGenerator());
        await PageFactory.getPage("Sign_up").input(inputField.phoneNumberNl, TestData.phoneNumberNl());
        await PageFactory.getPage("Sign_up").input(inputField.birthDay, TestData.birthDay());

    });

    it('Should test that Bonus card options are unticked by default and can be ticked', async () => {
        const optOut = await PageFactory.getPage("Sign_up").radioOptOut;
        const request = await PageFactory.getPage("Sign_up").radioRequest;
        const input = await PageFactory.getPage("Sign_up").radioInput;

        expect(await PageFactory.getPage("Sign_up").selected(optOut)).equal(false);
        expect(await PageFactory.getPage("Sign_up").selected(request)).equal(false);
        expect(await PageFactory.getPage("Sign_up").selected(input)).equal(false);

        await PageFactory.getPage("Sign_up").elementClick(optOut.span);
        expect(await PageFactory.getPage("Sign_up").selected(optOut)).equal(true);

        await PageFactory.getPage("Sign_up").elementClick(request.span);
        expect(await PageFactory.getPage("Sign_up").selected(request)).equal(true);

        await PageFactory.getPage("Sign_up").elementClick(input.span);
        expect(await PageFactory.getPage("Sign_up").selected(input)).equal(true);

    });


    it('Should test that custom Bonus card field can be completed', async () => {
        const inputField = await PageFactory.getPage("Sign_up").bonusCardNumberField;
        await PageFactory.getPage("Sign_up").input(inputField, TestData.bonusCardNumber());

    });


    it('Should test that subscription checkboxes are unticked by defauilt and can be ticked', async () => {
        const checkboxServiceMail = await PageFactory.getPage("Sign_up").checkboxServiceMail;
        const checkboxMail = await PageFactory.getPage("Sign_up").checkboxMail;

        expect(await PageFactory.getPage("Sign_up").selected(checkboxServiceMail)).equal(false);
        await PageFactory.getPage("Sign_up").elementClick(checkboxServiceMail.span);
        expect(await PageFactory.getPage("Sign_up").selected(checkboxServiceMail)).equal(true);

        expect(await PageFactory.getPage("Sign_up").selected(checkboxMail)).equal(false);
        await PageFactory.getPage("Sign_up").elementClick(checkboxMail.span);
        expect(await PageFactory.getPage("Sign_up").selected(checkboxMail)).equal(true);

    });

    it('Should test that can be submitted', async () => {
        const submitButton = await PageFactory.getPage("Sign_up").registrationSubmitButton;
        await await PageFactory.getPage("Sign_up").elementClick(submitButton);
    });

});