require('@cypress/xpath')
export const contact_Email = 'div.popover-body > div > owl-children-column > div > div:nth-child(4) > div > owl-child-column > div > div > div.pretty.p-default.p-curve.p-thick > input'
export const contact_FirstName = 'div.popover-body > div > owl-children-column > div > div:nth-child(6) > div > owl-child-column > div > div > div.pretty.p-default.p-curve.p-thick > input'
export const contact_LastName = 'div.popover-body > div > owl-children-column > div > div:nth-child(8) > div > owl-child-column > div > div > div.pretty.p-default.p-curve.p-thick > input'
export const contact_Email_xpath = '//*[@id="ngb-popover-13"]/div[2]/div/owl-children-column/div/div[5]/div/owl-child-column/div/div/div[1]/input'
class Athena_StudentReport_locators
{
    // left panel _ search result locator
    selectFirstStudent(){
        // if (isSearchWidgetClosed()){
        const firstStudentRecord = '.ag-pinned-left-cols-container > div[aria-rowindex = "2"] > div'
            return cy.get(firstStudentRecord).click()
        // }
        
    }
    selectMultipleStudents(numberOfStudents){
        for(let i=2;i<numberOfStudents+2;i++){
            let studentRecord = '.ag-pinned-left-cols-container > div[aria-rowindex = "'+i+'"] > div'
            cy.get(studentRecord).click()
        }
    }

    // Configute Report
    selectFieldsToGenerate_Address(){
        return cy.get('.ng-scroll-viewport-wrapper span').contains("Address").siblings('.btn-primary-action[title="Add"]').click().wait(1000)

    }
    selectFieldsToGenerate_District_Id(){
        return cy.get('.ng-scroll-viewport-wrapper span').contains("District ID").siblings('.btn-primary-action[title="Add"]').click({ timeout: 1000 })

    }
    selectFieldsToGenerate_Email(){
        return cy.get('.ng-scroll-viewport-wrapper span').contains("Email").siblings('.btn-primary-action[title="Add"]').click({ timeout: 1000 })

    }
    selectFieldsToGenerate_DOB(){
        return cy.get('.ng-scroll-viewport-wrapper span').contains("Date Of Birth").siblings('.btn-primary-action[title="Add"]').click({ timeout: 1000 })

    }
    selectFieldsToGenerate_Contacts(){
        return cy.get('.ng-scroll-viewport-wrapper span').contains("Contacts").siblings('.btn-primary-action[title="Add"]').click({ timeout: 1000 })

    }
    // Select contact's fields
    selectFieldsOfContact(listOfFilters){

        for(let i=0; i< listOfFilters.length; i++){
        cy.get('.d-flex').contains('Contacts').get('div > div.ml-auto > button > .fa-lg').click({force:true}).get('.childRecordFieldHeader ')
        .contains(listOfFilters[i]).children('div > div > label').click({force:true})
        }
        cy.get('button[class="btn-secondary-action"]').click()
    }

    selectFieldsOfContact_Email(){
        cy.get('.d-flex').contains('Contacts').get('div > div.ml-auto > button > .fa-lg').click()
        // the list of contact's field are opened
        .get(contact_Email).click()
        // close the contact's field menu
        cy.get('.ml-auto > .btn-primary-action').click()
    }
    selectFieldsOfContact_FirstName(){
        cy.get('.d-flex').contains('Contacts').get('div > div.ml-auto > button > .fa-lg').click()
        // from this step, the list of contact fields are opened.
        .get(contact_FirstName).click()
        // close the contact's field menu
        cy.get('.ml-auto > .btn-primary-action').click()
    }
    selectFieldsOfContact_LastName(){
        cy.get('.d-flex').contains('Contacts').get('div > div.ml-auto > button > .fa-lg').click()
        // from this step, the list of contact fields are opened.
        .get(contact_LastName).click()
        // close the contact's field menu
        cy.get('.ml-auto > .btn-primary-action').click()
    }
    selectReportType_csv(){
        cy.get('owl-report-format > div > button').click().get('.report-dropdown-item').contains('csv').click()
    }
    selectReportType_pdf(){
        cy.get('owl-report-format > div > button').click().get('.report-dropdown-item').contains('pdf').click()
    } 
        
    // Preview
    generateReport_withSelectedData(){
        return cy.get('.btn-primary-action').contains('Generate Report').click().get('.dropdown-item').contains('With Selected Data').click()
    }
    generateReport_withFilterCondition(){
        return cy.get('.btn-primary-action').contains('Generate Report').click().get('.dropdown-item').contains('With Filter(s) Condition').click()
    }
    enterUserDefineFileName(userDefineFileName){
        cy.get('div.element.stretch > input').type(userDefineFileName)
    }

    // Reports Available
    downloadFirstCompletedReport(){
        return cy.get('.ag-row-position-absolute.ag-row-first > div .fa-download').click()
    }
    isCompleteGeneratingReport(){
        cy.wait(15000)
        return cy.get('.ag-row-position-absolute.ag-row-first > div:nth-child(1)').contains('Generating').should('not.be.visible')
    }
    verifyReportFilename(reportName){
        let completedReportFileName
        cy.get('.ag-row-position-absolute.ag-row-first > div:nth-child(1)[col-id = "fileName"]').invoke('text').then((reportFilename => {
            // cy.log(reportFilename)
            expect(reportFilename).to.contain(reportName)

            // return reportFilename
            // return reportFilename
        }))
        // const completedReportFileName = JSON.stringify(cy.get('.ag-row-position-absolute.ag-row-first > div:nth-child(1)[col-id = "fileName"]').invoke('text'))
        // return completedReportFileName
        
    }
    // update from 1.69 on checking processing reports
    isCompleteGeneratingReport_release169(){
        cy.wait(15000)
        return cy.get('.processing-row > div:nth-child(2)').should('not.be.visible')
    }
    downloadFirstCompletedReport_release169(){
        return cy.get('.ag-row-position-absolute.ag-row-first > div .fa-download').click()
    }
    removeFirstCompletedReport(){
        return cy.get('.ag-row-position-absolute.ag-row-first > .ag-column-last > span > i').click()
    }

   
    firstCompletedReportFileName(){
        cy.get('.ag-row-position-absolute.ag-row-first > div:nth-child(1)[col-id = "fileName"]').invoke('text')
    }

}

export default Athena_StudentReport_locators

export function textFunction(){
    
}
