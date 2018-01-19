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

    beforeEach(async function() {
        driver = await new Builder().forBrowser('firefox').build();
    });

    afterEach(async function() {
        await driver.quit();
    });

    it('should be on correct page', async function() {
        var match = 'webdriver - Google Search';

        await driver.get("http://www.google.com/ncr");
        await driver.findElement(By.name('q')).sendKeys('webdriver'); 
        await driver.findElement(By.name('btnK')).click();
        let title = await driver.wait(function() {
            return driver.getTitle()
        }, 1000);

        expect(title).toEqual(match);
    });
});