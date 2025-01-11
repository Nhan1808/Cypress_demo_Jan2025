class Athena_homepage_locators
{
    navigateToRouting()
    {
        return cy.get('.moduleIcon > div > img[title="Routing Management"]',{timeout:20000}).click()
        // // return cy.get('.searchform input[type="text"]')
        // return cy.findByRole("textbox",{"name":"Search"})
    }
    navigateToTelematics()
    {
        return cy.get('.wd-header-search-form .searchsubmit')
    }
    navigateToHomePage()
    {
        return cy.get('a[href="#/app/main"]').click()
    }
    

    // prototype_rackets()
    // {
    //     return cy.get('#menu-item-11160 > .woodmart-nav-link')
    // }
    // mizuno()
    // {
    //     return cy.get('#menu-item-11148 > a > span')
    // }
    // navigateToMizunoCategory()
    // {
    //     return cy.get('#menu-item-11148 > a > span').click()
    // }
    // yonex()
    // {
    //     return cy.get('#menu-item-11150 > a > span')
    // }
    // victor()
    // {
    //     return cy.get('#menu-item-11149 > a > span')
    // }


    // signIn()
    // {
    //     return cy.get('.login')
    // }

    // shoppingCart()
    // {
    //     return cy.get('[title="View my shopping cart"]')
    // }

    // womenCategory()
    // {
    //     return cy.get(".sf-with-ul[title='Women']")
    // }

    // dressesCategory()
    // {
    //     return cy.get(".sf-menu > li > [title='Dresses']")
    // }

    // tshirtsCategory()
    // {
    //     return cy.get(".sf-menu > li > [title='T-shirts']")
    // }

    // addProduct()
    // {
    //     return cy.contains("Add to cart").first()
    // }

    // account()
    // {
    //     return cy.get('.account')
    // }

    // emptyCard()
    // {
    //     return cy.get('.ajax_cart_no_product')
    // }

    // moreButton()
    // {
    //     return cy.contains('More').first()
    // }

    // fancyBoxError()
    // {
    //     return cy.get('.fancybox-error')
    // }
}

export default Athena_homepage_locators
