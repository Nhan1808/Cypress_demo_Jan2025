class signInLocators
{

    
    athena_inputUsername()
    {
        return cy.get('input[name="username"]')
    }
    athena_inputPassword()
    {
        return cy.get('input[name="password"]')
    }
    athena_LoginButton()
    {
        return cy.get('button[class="btn btn-primary btn-sm fw-thin loginBtn"]')
    }    
    
}

export default signInLocators