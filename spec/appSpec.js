const {Builder, By, until} = require('selenium-webdriver');

/* 
    this depends on node 8+ due to async/await pattern in selenium code, 
    which appeared after selenium deprecated promise manager. refs:
    * https://mykzilla.org/2017/08/30/headless-firefox-in-node-js-with-selenium-webdriver/
    * https://github.com/SeleniumHQ/selenium/issues/2969
    * https://jasmine.github.io/2.9/introduction.html
    * https://github.com/SeleniumHQ/selenium/wiki/WebDriverJs
    * http://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/
*/

describe('basic test', function() {
    let driver;
    const cwd = process.cwd();

    beforeEach(async function() {
        let capabilities = {
            'browserName': 'firefox',
            'unexpectedAlertBehavior': 'accept',
        }
        driver = await new Builder().withCapabilities(capabilities).build();
    });

    afterEach(async function() {
        await driver.quit();
    });

    it('should throw an alert', async function() {
        await driver.get(`file://${cwd}/index.html`).then(async function() {
            let alert = await driver.wait(until.alertIsPresent(), 1000);
            console.log(alert.getText()); 
        });
    });
});