import { APP } from "../page/application"
import { createNewUserAndLogin } from "../utils/createUser";

describe('User', function () {
    it('can register', function () {
        console.time('Test "can register" took')

        APP.CreateAccount.open();
        const email = `test${new Date().getTime() / 1000}@test.com`
        APP.CreateAccount.fillWith({
            firstname: 'Test',
            lastname: 'Test',
            countryName: 'Ukraine',
            email: email,
            phone: '+380441111111',
            password: email,
            confirmPassword: email
        })
        // ON THIS STEP USER HAVE TO FILL CAPTCHA MANUALY
        //APP.CreateAccount.confirmRegistration()
        
        // browser.pause(5000)
        // browser.waitUntil(() => {
        //     return alert.isDisplayed() && alert.getText().includes(expectedText)
        // }, { timeoutMsg: 'Expected success alert to be visible and have correct text' })
        expect(APP.Home.successAlert).toBeDisplayed()
        expect(APP.Home.successAlert).toHaveTextContaining('Your customer account has been created.')
        console.timeEnd('Test "can register" took')

        // Test "can register" took: 7603.411ms
        // Test "can register" took: 2514.112ms
        // Test "can register" took: 2814.565ms
    })
    it('register user thru HTTP', function () {
        const user = createNewUserAndLogin()

        browser.pause(30000)
    })
    it('fill registration form', function () {
        browser.url('/create_account')
        browser.pause(15000)
        console.time('JS registration')
        browser.execute(function () {
            document.querySelector('input[name="firstname"]')['value'] = "TestFirstName";
            document.querySelector('input[name="lastname"]')['value'] = "TestLastName";
            document.querySelector('select[name="country_code"]')['value'] = "UA";
            document.querySelector('[name="customer_form"] input[name="email"]')['click']();
            const email = `test${new Date().getTime() / 1000}@test.com`
            document.querySelector('[name="customer_form"] input[name="email"]')['value'] = email;
            document.querySelector('input[name="phone"]')['value'] = "+380441112233";
            document.querySelector('[name="customer_form"] input[name="password"]')['value'] = "123456";
            document.querySelector('input[name="confirmed_password"]')['value'] = "123456";
            document.querySelector('button[name="create_account"]')['click']();
        })
        console.timeEnd('JS registration')
        browser.pause(15000)
        // 1 passing (17.6s) 2.6 s without sleep
    })

    it.only('custom commands', function () {
        browser.addCommand("waitAndClick", function () {
            // `this` is return value of $(selector)
            this.waitForDisplayed()
            this.click()
        }, true)

        // $('div').waitAndClick()

        browser.overwriteCommand('click', function (clickOrig) {
            browser.pause(50)
            console.log(`### doing click`)
            clickOrig()
        }, true)

        APP.CreateAccount.open();
        const email = `test${new Date().getTime() / 1000}@test.com`
        APP.CreateAccount.fillWith({
            firstname: 'Test',
            lastname: 'Test',
            countryName: 'Ukraine',
            email: email,
            phone: '+380441111111',
            password: email,
            confirmPassword: email
        })
        APP.CreateAccount.confirmRegistration()
    })
})