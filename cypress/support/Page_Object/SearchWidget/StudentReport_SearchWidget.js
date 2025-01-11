export const searchButton = 'button.btn.btn-tiny.btn-success.button-adjustment'
export const open_magnifyingGlassIcon = 'div.drawer-pull.open-drawer > button > i'
export const closed_magnifyingGlassIcon = 'div.drawer-pull.closed-drawer > button > i'
export const filtersContainer = 'field-selector > div > button'
export const fisrtName = 'ng-scrollbar > div > div > div > div > div > button:nth-child(30)'
class Athena_SearchWidget_locators {

    selectFilters() {
        return cy.get('').click()
    }
    selectFilters_districtID() {
        return cy.get(filtersContainer).click().get('.filter-menu > button').contains('District ID')
        .click().get(filtersContainer).click()
    }
    selectFilters_edulogID() {
        return cy.get('field-selector > div > button').click().get('.filter-menu > button').contains('Edulog ID').click()
        .get('field-selector > div > button').click()
    }
    selectFilters_list(listOfFilters) {

        for (let i = 0; i < listOfFilters.length; i++) {
            // let exactText = /^listOfFilters[i]$/
            // cy.get('field-selector > div > button', { timeout: 15000 }).click().get('.filter-menu > button').contains(listOfFilters[i])
            cy.get('field-selector > div > button', { timeout: 15000 }).click().get('.filter-menu > button').contains(new RegExp(listOfFilters[i]))
            .click().get('field-selector > div > button').click()
        }
    }
    selectFilters_FirstName() {
            // let exactText = listOfFilters[i]
            // cy.get('field-selector > div > button', { timeout: 15000 }).click().get('.filter-menu > button').contains(listOfFilters[i])
            const FN = 'First Name'
            cy.get('field-selector > div > button', { timeout: 15000 }).click().get(fisrtName)
            .click().get('field-selector > div > button').click()
    }

    searchWithoutFilters() {
        // check if search widget open, click on search button
        return cy.get(open_magnifyingGlassIcon).should('be.visible') ? cy.get(searchButton).click() : cy.get(closed_magnifyingGlassIcon).click().get(searchButton).click({ force: true })
    }
    searchWithFilters() {
        return cy.get(searchButton).click()
    }
    inputSearchValueForDistrictID(districtIDs) {
        cy.get('.col-12 > .field-header > div > label').contains('District ID').parent().parent().siblings().children('.col-9').find('.dropdown > input').type(districtIDs)
    }
    inputSearchValueForFirstName(firstName) {
        cy.get('.col-12 > .field-header > div > label').contains(new RegExp('First Name','g')).parent().parent().siblings().children('.col-9').find('.dropdown > input').type(firstName)
    }
    inputSearchValueForLastName(lastName) {
        cy.get('.col-12 > .field-header > div > label').contains('Last Name').parent().parent().siblings().children('.col-9').find('.dropdown > input').type(lastName)
    }     
    selectValueOfAssignedStatus(status) {
        cy.get('.col-12 > .field-header > div > label').contains('Trip Assigned Status').parent().parent().siblings().children('.col-10').find('.dropdown > input')
            .click().get('div > div.col-9').contains(status).click()
            //click to complete selecting trip assigned status
            .get('div.col-6.pl-1.pr-0').click()
    }


    isSearchWidgetClosed() {
        return cy.get('div.drawer-pull.closed-drawer > button > i ').should('be.visible') ? true : false
    }



}

export default Athena_SearchWidget_locators
