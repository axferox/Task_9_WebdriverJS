class HeaderNavigationMenu {
    constructor() {

        this.menuLoginButton = {
            locatorType: 'xpath',
            locatorId: '//*[@id="menu_personal"]/li[2]/a/span',
            locatorText: 'Inloggen'
        };

    };
};

module.exports = HeaderNavigationMenu;