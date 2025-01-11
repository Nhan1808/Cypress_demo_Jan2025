class RegisterLocators
{
    titleMr()
    {
        return cy.get("[value='1'][name='id_gender']")
    }

    titleMrs()
    {
        return cy.get("[value='2'][name='id_gender']")
    }

    FirstName()
    {
        return cy.get('#customer_firstname')
    }

    LastName()
    {
        return cy.get('#customer_lastname')
    }

    email()
    {
        return cy.get('#email')
    }

    password()
    {
        return cy.get('#passwd')
    }

    addressFirstName()
    {
        return cy.get('#firstname')
    }

    addressLastName()
    {
        return cy.get('#lastname')
    }
    
    company()
    {
        return cy.get('#company')
    }

    addressStreet()
    {
        return cy.get('#address1')
    }

    addressLineTwo()
    {
        return cy.get('#address2')
    }

    city()
    {
        return cy.get('#city')
    }

    stateDropDown()
    {
        return cy.get('#id_state')
    }

    postcode()
    {
        return cy.get('#postcode')
    }

    countryDropDown()
    {
        return cy.get('#id_country')
    }

    addInfo()
    {
        return cy.get('#other')
    }

    homePhone()
    {
        return cy.get('#phone')
    }

    mobilePhone()
    {
        return cy.get('#phone_mobile')
    }

    addressAlias()
    {
        return cy.get('#alias')
    }

    submitRegister()
    {
        return cy.get('#submitAccount > span')
    }

    Alert()
    {
        return cy.get('.alert')
    }

    subbmitAddress()
    {
        return cy.get('#submitAddress > span')
    }

}

export default RegisterLocators