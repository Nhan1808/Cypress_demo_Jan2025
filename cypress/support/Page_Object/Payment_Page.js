class PaymentLocators
{
    proceedToCheckout()
    {
        return cy.get('.button-medium > span')
    }

    proceedNext()
    {
        return cy.get('.cart_navigation > .button > span')
    }

    termsChecbox()
    {
        return cy.get('#cgv')
    }

    cart()
    {
        return cy.get('.bankwire')
    }

    confirmOrder()
    {
        return cy.get('#cart_navigation > .button > span')
    }

    addressDropDown()
    {
       return cy.get('#id_address_delivery')
    }

    backToOrders()
    {
        return cy.get('.button-exclusive')
    }
}

export default PaymentLocators