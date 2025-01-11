class HomePageLocators
{
    searchbox()
    {
        return cy.get('#search_query_top')
    }
    confirmSearch()
    {
        return cy.get('#searchbox > .btn')
    }

    logo()
    {
        return cy.get("[alt='My Store']")
    }

    signIn()
    {
        return cy.get('.login')
    }

    shoppingCart()
    {
        return cy.get('[title="View my shopping cart"]')
    }

    womenCategory()
    {
        return cy.get(".sf-with-ul[title='Women']")
    }

    dressesCategory()
    {
        return cy.get(".sf-menu > li > [title='Dresses']")
    }

    tshirtsCategory()
    {
        return cy.get(".sf-menu > li > [title='T-shirts']")
    }

    addProduct()
    {
        return cy.contains("Add to cart").first()
    }

    account()
    {
        return cy.get('.account')
    }

    emptyCard()
    {
        return cy.get('.ajax_cart_no_product')
    }

    moreButton()
    {
        return cy.contains('More').first()
    }

    fancyBoxError()
    {
        return cy.get('.fancybox-error')
    }
}

export default HomePageLocators
