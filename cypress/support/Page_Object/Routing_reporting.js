class Athena_routing_reporting_locators {
    navigateToStudentReport() {
        return cy.get('li:nth-child(3) li:nth-child(1) > a').click();
        // // return cy.get('.searchform input[type="text"]')
        // return cy.findByRole("textbox",{"name":"Search"})
    }
    navigateToRouteReport() {
        return cy.get(' ul > li:nth-child(3) > ul > li:nth-child(4)').click({ force: true });
    }

    openLeftMenuPanel() {
        // return cy.get('body > app-root > layout > div > div > nav > div > table > tr > td.hamburger > button').click()
        return cy.get('.btn-sm > .fa-solid').click();
    }

    navigateToPortsMouthReports() {
        // return cy.get('.sidebar-submenu > li > a > i').contains('  Portsmouth Reports').click()
        return cy.contains('Portsmouth').click({ force: true })
    }
    selectManualGenerateRun() {
        return cy.get(' app-schedule-manual-run > i').click()
    }
    downloadPortsmouthReport() {
        return cy.get('.ag-row-first > .ag-cell-normal-height > span > .fa-download').click()
    }
    getFileNameOfFirstCompletedReport(String) {
        cy.get('.ag-row-first > div:nth-child(1) > span').invoke('text').then((reportFileName) => {
            // expect(reportFileName).to.eq(portsmouthReportFileName)
            return reportFileName
            // cy.log(reportFileName.toString())
        })
    }

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


export default Athena_routing_reporting_locators
