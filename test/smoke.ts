
describe('Smoke test', () => {
    it('ducks should be alive', () => {
        browser.url('/')
        expect(browser).toHaveTitle('Dyetetica Store | Online Store');
    })

    // it('ducks should be dead @SMOKE', () => {
    //     browser.url('/')
    //     expect(browser).toHaveTitle('Dyetetica Store | Online Store');
    // })
})