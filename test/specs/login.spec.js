describe('UI Testing kasirAja', () => {
    before(async () => {
        // Navigate to the login page
        await browser.url('https://kasirdemo.belajarqa.com')
        await browser.pause(3000);
    })
    

    beforeEach(async () => {
        // Clear cookies and sessions before each test
        await browser.deleteCookies()
    });

    it('1. Verify the landing page contains "hai, kasirAja"', async () => {
        const contentTitle = await $('.chakra-heading')
        await expect(contentTitle).toHaveText("hai, kasirAja")
    })

    it('2. Verify the short description of page contains "kasirAja sebuah sistem POS simple, mudah, cepat, dan modern."', async () => {
        const contentDesc = await $('p.chakra-text:nth-child(2)')
        await expect(contentDesc).toHaveText("kasirAja sebuah sistem POS simple, mudah, cepat, dan modern")
    })

    it('3. Verify the Login form contains email, password, and login button', async () => {
        const emailInput = await $('#email')
        await expect(emailInput).toBeExisting()
        const passwordInput = await $('#password')
        await expect(passwordInput).toBeExisting()
        const loginButton = await $('/html/body/div/div/div/div/div[2]/div/button')
        await expect(loginButton).toBeExisting()
        
        
    })

    it('4. Verify the Login form contains button "ingin mencoba, daftar ?"', async () => {
        const registrationButton = await browser.$('.css-4rvv7a > a:nth-child(1)')
        await expect(registrationButton).toHaveText("ingin mencoba, daftar ?")
    })

    it('5. Verify when user login using invalid credential', async () => {
        const emailInput = await $('#email')
        await emailInput.setValue('tokosbgn@mail.com')

        const passwordInput = await $('#password')
        await passwordInput.setValue('xxxxxx')

        const loginButton = await $('/html/body/div/div/div/div/div[2]/div/button')
        await loginButton.click()
        await browser.pause(3000);

        const errorMessage = await $('.chakra-alert')
        await expect(errorMessage).toHaveText("Kredensial yang Anda berikan salah")
        
    
    })

    it('6. Verify when user login without input email', async () => {
        
        await browser.url('https://kasirdemo.belajarqa.com')
        
        const emailInput = await $('#email')
        await emailInput.setValue('   ')

        const passwordInput = await $('#password')
        await passwordInput.setValue('xxxxxx')

        const loginButton = await $('/html/body/div/div/div/div/div[2]/div/button')
        await loginButton.click()
        await browser.pause(3000);

        const errorMessage = await $('.chakra-alert')
        await expect(errorMessage).toHaveText("\"email\" is not allowed to be empty")


    })

    it('7. Verify when user login using valid credential', async () => {
        await browser.url('https://kasirdemo.belajarqa.com')
        
        const emailInput = await $('#email')
        await emailInput.setValue('tokosbgn@mail.com')

        const passwordInput = await $('#password')
        await passwordInput.setValue('123456')

        const loginButton = await $('/html/body/div/div/div/div/div[2]/div/button')
        await loginButton.click()
        await browser.pause(3000);

        const dashboardUser = await $('div.css-13pc7q0:nth-child(1) > div:nth-child(1) > dl:nth-child(1) > dt:nth-child(1)')
        await expect(dashboardUser).toHaveText("TOKO SERBAGUNA")

    })

    after(async () => {
        await browser.closeWindow()
    })
})
