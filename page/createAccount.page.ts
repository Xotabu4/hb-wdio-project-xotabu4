
export class CreateAccountPO {
    public get registrationForm () { 
        return $('#box-create-account')
    }
    confirmRegistration() {
        this.registrationForm.$('button[name="create_account"]').click()
    }
    fillWith(options: { firstname: string; lastname: string; countryName: string; email: string; phone: string; password: string; confirmPassword: string; }) {
        this.registrationForm.$('input[name="firstname"]').setValue(options.firstname)
        this.registrationForm.$('input[name="lastname"]').setValue(options.lastname)
        const countrySelect = this.registrationForm.$('select[name="country_code"]')
        countrySelect.selectByVisibleText(options.countryName)
        this.registrationForm.$('input[name="email"]').click()
        browser.pause(50)
        this.registrationForm.$('input[name="email"]').setValue(options.email)
        this.registrationForm.$('input[name="phone"]').setValue(options.phone)

        this.registrationForm.$('input[name="password"]').setValue(options.password)
        this.registrationForm.$('input[name="confirmed_password"]').setValue(options.confirmPassword)

        this.registrationForm.$('input[name="terms_agreed"]').click();
    }
    open() {
        browser.url('/create_account')
    }

}

export const CreateAccount = new CreateAccountPO()