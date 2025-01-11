import HomePageLocators from '../support/Page_Object/Home_Page'
import signInLocators from '../support/Page_Object/SignIn_Page'
import PaymentLocators from '../support/Page_Object/Payment_Page'

Cypress.Commands.add("search", data => {

    const homePage = new HomePageLocators()
    homePage.searchbox().type(data)
    homePage.confirmSearch().click()
})

Cypress.Commands.add("register", user => {

    const homePage = new HomePageLocators()
    const signin = new signInLocators()

    homePage.signIn().click()
    signin.createAccountEmail().type(user.email)
    signin.submitCreate().click()
})

Cypress.Commands.add("createEmailRegister", () => {

    const signIn = new signInLocators()

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    let email = "user+test" + getRandomInt(1, 100) + getRandomInt(1, 100) + getRandomInt(1, 100) + "@example.com"
    signIn.createAccountEmail().type(email)
})

Cypress.Commands.add("login", () => {

    const homePage = new HomePageLocators()
    const signin = new signInLocators()

    let user_email = Cypress.env('username')
    let password = Cypress.env('password')

    homePage.signIn().click()
    signin.emailAlreadyRegister().type(user_email, {log:false})
    signin.passwordAlreadyRegister().type(password, {log: false})
    signin.submitLogin().click()
})

Cypress.Commands.add("placeOrder", () => {

    const payment = new PaymentLocators()
    
    cy.contains('Add to cart').first().click()
    payment.proceedToCheckout().click()
    payment.proceedNext().click()
    payment.proceedNext().click()
    payment.termsChecbox().check()
    payment.proceedNext().click()
    payment.cart().click()
    payment.confirmOrder().click()
})