/// <reference types="cypress" />

import { downloadsFolder, env, e2e } from "../../../../cypress.config"
import * as loginData from "../../../fixtures/loginInformation.json"
// import HomePageLocators from "../../../support/Page_Object/Home_Page"
import signInLocators from "../../../support/Page_Object/SignIn_Page"
import Athena_homepage_locators from '../../../support/Page_Object/AthenaHomePage'
import Athena_routing_reporting_locators from '../../../support/Page_Object/Routing_reporting'
import Athena_SearchWidget_locators from '../../../support/Page_Object/SearchWidget/StudentReport_SearchWidget'
import Athena_StudentReport_locators, { textFunction } from '../../../support/Page_Object/StudentReport'
import ReadFile from "../../../support/DownloadFileUtils/readfile"
import * as studentTestData from '../../../fixtures/student_report.json'
// import Common_Utils from "../../../support/Page_Object/common/commonUtils"
// import fs from 'fs'
// import { readFileSync } from "fs"
import * as Papa from 'papaparse'
// import { readPDF } from '../../../support/pdfUtils/readPDF'
// import { PdfReader } from "pdfreader"
// import * as pdfjs from 'pdfjs-dist'


describe('This is student report test suite', () => {

    const homepage = new Athena_homepage_locators()
    const signIn = new signInLocators()
    const routing_reporting = new Athena_routing_reporting_locators()
    const searchWidget = new Athena_SearchWidget_locators()
    const studentReport = new Athena_StudentReport_locators()
    const csvdata = new ReadFile()
    // const common = new Common_Utils()
    let access_token
    let pdfFile = '../../../../downloads/Automated_student_report_20241120-203649.pdf'
    // const nhan = new csvToJson.csvToJson()
    before(function () {
        // executes prior each test within it block
        cy.log("Before hook")
        cy.request({
            method: 'POST',
            url: e2e.BE_URL + '/api/v1/signin',
            // body: env.loginBody
            body: loginData.loginAthena
        }).then(response => {
            cy.expect(response.status).eq(200);
            // cy.log(response.status)
            access_token = response.body.accessToken;
        })

    })
    beforeEach(function () {
        // executes prior each test within it block
        cy.log("BeforeEach hook")
        cy.visit('/#/app/login', { timeout: 90000 })
        signIn.athena_inputUsername({ timeout: 60000 }).type(env.username)
        signIn.athena_inputPassword({ timeout: 20000 }).type(env.password)
        signIn.athena_LoginButton().click()

    })

    it('Case 3 - User is able to generate student report with selected data - csv report - multiple students - 15 students _ with contact information', () => {
        const testReportFileName_csv = 'Automated_student_report_csv'
        let numberOfStudents = 15
        let listOfEdulogID = []

        let searchBody = studentTestData.SearchForStudent_edulogID
        const listOfFilters = ["Trip Assigned Status", "Transportation Needs"]
        homepage.navigateToRouting({ timeout: 30000 })
        routing_reporting.navigateToStudentReport()

        // Search for students
        searchWidget.selectFilters_list(listOfFilters)
        // searchWidget.inputSearchValueForDistrictID(districtIDs)
        searchWidget.selectValueOfAssignedStatus('Assigned')
        searchWidget.searchWithoutFilters()

        // Select 1st student 
        // studentReport.selectFirstStudent()
        studentReport.selectMultipleStudents(numberOfStudents)
        studentReport.selectReportType_csv()
        cy.wait(2000)

        // Select fields to be exported
        studentReport.selectFieldsToGenerate_Contacts()
        studentReport.selectFieldsToGenerate_DOB()
        studentReport.selectFieldsToGenerate_Address()
        studentReport.selectFieldsToGenerate_District_Id()
        studentReport.selectFieldsToGenerate_Email()
        studentReport.selectFieldsOfContact_Email()
        studentReport.selectFieldsOfContact_FirstName()
        studentReport.selectFieldsOfContact_LastName()
        studentReport.enterUserDefineFileName(testReportFileName_csv)
        studentReport.generateReport_withSelectedData()

        // Download report once the report is generated completely
        if (studentReport.isCompleteGeneratingReport()) {
            studentReport.downloadFirstCompletedReport()
        }
        // download the latest completed csv report and verify data
        const downloadReportSelector = '.ag-row-position-absolute.ag-row-first > div:nth-child(1)[col-id = "fileName"]'
        cy.get(downloadReportSelector).invoke('text').then((reportFilename => {
            cy.log(reportFilename)
            // Get report file name including csv extension
            const reportFilename_full = (s, n) => s.substring(s.length - n);
            let path = downloadsFolder + '/' + reportFilename_full(reportFilename, 48)
            cy.readFile(path).then((csvContent) => {
                // parse csv content to json object
                const result = Papa.parse(csvContent, { header: true, dynamicTyping: true })
                //verify csv data with the expected data from fixture
                console.log('Data array is: '+JSON.stringify(result.data))
                for (let i = 0; i < numberOfStudents; i++) {
                    console.log('value of edulod id: ' + result.data[i]['Student_Edulog ID'])
                    listOfEdulogID.push(result.data[i]['Student_Edulog ID'])
                }
                for (let i = 0; i < listOfEdulogID.length; i++) {
                    let case3_searchBody = {
                        "query": {
                            "join": "OR",
                            "filters": [

                            ]
                        },
                        "page": {
                            "pageNumber": 1,
                            "resultsPerPage": 50
                        },
                        "sort": [{ "fieldName": "edulogId", "direction": "ASCENDING", "order": 0 }],
                        "tenantId": e2e.tenantId
                    }
                    let filters = []
                    let subfilter = {
                        "field": "edulogId",
                        "op": "BEGINS_WITH",
                        "value": "",
                        "not": false,
                        "ignoreCase": true,
                        "values": [

                        ]
                    }
                    subfilter.values[0] = listOfEdulogID[i];
                    console.log(JSON.stringify(subfilter.values))
                    console.log('before: ' + JSON.stringify(subfilter))
                    filters[0] = subfilter
                    case3_searchBody.query.filters = filters
                    console.log('this is the filter : ' + i + 'and the filters: ' + JSON.stringify(filters))
                    console.log('after: ' + JSON.stringify(subfilter))
                    console.log('filters is: ' + JSON.stringify(filters))
                    cy.request({
                        method: 'POST',
                        url: e2e.BE_URL + '/api/v1/search/students/search',
                        headers: {
                            'Authorization': 'Bearer ' + access_token,
                            'da': e2e.da
                        },
                        body: case3_searchBody
                    }).then(response => {
                        cy.expect(response.status).eq(200);
                        console.log(case3_searchBody)
                        let actualData = []
                        actualData = response.body.value.results
                        console.log('this is actual data: ' + JSON.stringify(actualData))
                        // Verify the csv data
                        cy.log('Start verifying csv data')
                        cy.expect(JSON.stringify(result.data[i]['Student_Edulog ID'])).eq(actualData[0].edulogId)
                        cy.expect(JSON.stringify(result.data[i]['Student_District ID'])).eq(actualData[0].districtId)
                        cy.expect(JSON.stringify(result.data[i]['Student_Address'])).eq(JSON.stringify(actualData[0].location.address))
                        if (actualData[0].studentContacts.length > 0) {
                            cy.expect(JSON.stringify(result.data[i]['Contact_#1_First Name'])).eq(JSON.stringify(actualData[0].studentContacts[0].contact.firstName))
                            cy.expect(JSON.stringify(result.data[i]['Contact_#1_Last Name'])).eq(JSON.stringify(actualData[0].studentContacts[0].contact.lastName))
                            if (JSON.stringify(result.data[i]['Contact_#1_Email']) == 'null') {
                                cy.expect(JSON.stringify(actualData[0].studentContacts[0].contact.Email)).eq(undefined)
                            } else {
                                cy.expect(JSON.stringify(result.data[i]['Contact_#1_Email'])).eq(JSON.stringify(actualData[0].studentContacts[0].contact.Email))
                            }

                        }

                    })

                }
            })
            cy.visit('/#/app/athena/reporting/students')

        }))
    })
    it('Case 4 - User is able to generate student report with selected data - csv report - multiple students - 5 students _ With contact Information', () => {
        const testReportFileName_csv = 'Automated_student_report_csv'
        let numberOfStudents = 5
        let listOfEdulogID = []

        let searchBody = studentTestData.SearchForStudent_edulogID
        const listOfFilters = ["Trip Assigned Status", "Transportation Needs"]
        homepage.navigateToRouting({ timeout: 30000 })
        routing_reporting.navigateToStudentReport()

        // Search for students
        searchWidget.selectFilters_list(listOfFilters)
        // searchWidget.inputSearchValueForDistrictID(districtIDs)
        searchWidget.selectValueOfAssignedStatus('Assigned')
        searchWidget.searchWithoutFilters()

        // Select 1st student 
        // studentReport.selectFirstStudent()
        studentReport.selectMultipleStudents(numberOfStudents)
        studentReport.selectReportType_csv()
        cy.wait(2000)

        // Select fields to be exported
        studentReport.selectFieldsToGenerate_Contacts()
        studentReport.selectFieldsToGenerate_DOB()
        studentReport.selectFieldsToGenerate_Address()
        studentReport.selectFieldsToGenerate_District_Id()
        studentReport.selectFieldsToGenerate_Email()
        studentReport.selectFieldsOfContact_Email()
        studentReport.selectFieldsOfContact_FirstName()
        studentReport.selectFieldsOfContact_LastName()
        studentReport.enterUserDefineFileName(testReportFileName_csv)
        studentReport.generateReport_withSelectedData()

        // Download report once the report is generated completely
        if (studentReport.isCompleteGeneratingReport()) {
            studentReport.downloadFirstCompletedReport()
        }
        // download the latest completed csv report and verify data
        const downloadReportSelector = '.ag-row-position-absolute.ag-row-first > div:nth-child(1)[col-id = "fileName"]'
        cy.get(downloadReportSelector).invoke('text').then((reportFilename => {
            cy.log(reportFilename)
            // Get report file name including csv extension
            const reportFilename_full = (s, n) => s.substring(s.length - n);
            let path = downloadsFolder + '/' + reportFilename_full(reportFilename, 48)
            cy.readFile(path).then((csvContent) => {
                // parse csv content to json object
                const result = Papa.parse(csvContent, { header: true, dynamicTyping: true })
                //verify csv data with the expected data from fixture
                console.log(result)
                for (let i = 0; i < numberOfStudents; i++) {
                    console.log('value of edulod id: ' + result.data[i]['Student_Edulog ID'])
                    listOfEdulogID.push(result.data[i]['Student_Edulog ID'])
                }
                for (let i = 0; i < listOfEdulogID.length; i++) {
                    let case3_searchBody = {
                        "query": {
                            "join": "OR",
                            "filters": [

                            ]
                        },
                        "page": {
                            "pageNumber": 1,
                            "resultsPerPage": 50
                        },
                        "sort": [{ "fieldName": "edulogId", "direction": "ASCENDING", "order": 0 }],
                        "tenantId": e2e.tenantId
                    }
                    let filters = []
                    let subfilter = {
                        "field": "edulogId",
                        "op": "BEGINS_WITH",
                        "value": "",
                        "not": false,
                        "ignoreCase": true,
                        "values": [

                        ]
                    }
                    subfilter.values[0] = listOfEdulogID[i];
                    console.log(JSON.stringify(subfilter.values))
                    console.log('before: ' + JSON.stringify(subfilter))
                    filters[0] = subfilter
                    case3_searchBody.query.filters = filters
                    console.log('this is the filter : ' + i + 'and the filters: ' + JSON.stringify(filters))
                    console.log('after: ' + JSON.stringify(subfilter))
                    console.log('filters is: ' + JSON.stringify(filters))
                    cy.request({
                        method: 'POST',
                        url: e2e.BE_URL + '/api/v1/search/students/search',
                        headers: {
                            'Authorization': 'Bearer ' + access_token,
                            'da': e2e.da
                        },
                        body: case3_searchBody
                    }).then(response => {
                        cy.expect(response.status).eq(200);
                        console.log(case3_searchBody)
                        let actualData = []
                        actualData = response.body.value.results
                        console.log('this is actual data: ' + JSON.stringify(actualData))
                        // Verify the csv data
                        cy.log('Start verifying csv data')
                        cy.expect(JSON.stringify(result.data[i]['Student_Edulog ID'])).eq(actualData[0].edulogId)
                        cy.expect(JSON.stringify(result.data[i]['Student_District ID'])).eq(actualData[0].districtId)
                        cy.expect(JSON.stringify(result.data[i]['Student_Address'])).eq(JSON.stringify(actualData[0].location.address))
                        if (actualData[0].studentContacts.length > 0) {
                            cy.expect(JSON.stringify(result.data[i]['Contact_#1_First Name'])).eq(JSON.stringify(actualData[0].studentContacts[0].contact.firstName))
                            cy.expect(JSON.stringify(result.data[i]['Contact_#1_Last Name'])).eq(JSON.stringify(actualData[0].studentContacts[0].contact.lastName))
                            if (JSON.stringify(result.data[i]['Contact_#1_Email']) == 'null') {
                                cy.expect(JSON.stringify(actualData[0].studentContacts[0].contact.Email)).eq(undefined)
                            } else {
                                cy.expect(JSON.stringify(result.data[i]['Contact_#1_Email'])).eq(JSON.stringify(actualData[0].studentContacts[0].contact.Email))
                            }

                        }

                    })

                }
            })
            cy.visit('/#/app/athena/reporting/students')

        }))
    })
    it('Case 5 - User is able to generate student report with filter conditions - csv report _ With contract information', () => {
        const testReportFileName_csv = 'Automated_student_report_csv'
        let listOfEdulogID = []
        const valueOfFirstName = 'AD'

        let searchBody = studentTestData.SearchForStudent_edulogID
        const listOfFilters = ["Trip Assigned Status", "Transportation Needs"]
        homepage.navigateToRouting({ timeout: 30000 })
        routing_reporting.navigateToStudentReport()

        // Search for students
        searchWidget.selectFilters_list(listOfFilters)
        searchWidget.selectFilters_FirstName()
        searchWidget.inputSearchValueForFirstName(valueOfFirstName)
        searchWidget.selectValueOfAssignedStatus('Assigned')
        searchWidget.searchWithoutFilters()

        // Select 1st student 
        // studentReport.selectFirstStudent()
        // studentReport.selectMultipleStudents(numberOfStudents)
        studentReport.selectReportType_csv()
        cy.wait(2000)

        // Select fields to be exported
        studentReport.selectFieldsToGenerate_Contacts()
        studentReport.selectFieldsToGenerate_DOB()
        studentReport.selectFieldsToGenerate_Address()
        studentReport.selectFieldsToGenerate_District_Id()
        studentReport.selectFieldsToGenerate_Email()
        studentReport.selectFieldsOfContact_Email()
        studentReport.selectFieldsOfContact_FirstName()
        studentReport.selectFieldsOfContact_LastName()
        studentReport.enterUserDefineFileName(testReportFileName_csv)
        studentReport.generateReport_withFilterCondition()

        // Download report once the report is generated completely
        if (studentReport.isCompleteGeneratingReport()) {
            // cy.wait(60000)
            studentReport.downloadFirstCompletedReport()
        }
        // download the latest completed csv report and verify data
        const downloadReportSelector = '.ag-row-position-absolute.ag-row-first > div:nth-child(1)[col-id = "fileName"]'
        cy.get(downloadReportSelector).invoke('text').then((reportFilename => {
            cy.log(reportFilename)
            // Get report file name including csv extension
            const reportFilename_full = (s, n) => s.substring(s.length - n);
            let path = downloadsFolder + '/' + reportFilename_full(reportFilename, 48)
            cy.readFile(path).then((csvContent) => {
                // parse csv content to json object
                const result = Papa.parse(csvContent, { header: true, dynamicTyping: true })
                //verify csv data with the expected data from fixture
                console.log('this the result data length: '+result.data.length)
                for (let i = 0; i < result.data.length-1; i++) {
                    console.log('value of edulod id: ' + result.data[i]['Student_Edulog ID'])
                    listOfEdulogID.push(result.data[i]['Student_Edulog ID'])
                }
                for (let i = 0; i < listOfEdulogID.length; i++) {
                    let case3_searchBody = {
                        "query": {
                            "join": "OR",
                            "filters": [

                            ]
                        },
                        "page": {
                            "pageNumber": 1,
                            "resultsPerPage": 50
                        },
                        "sort": [{ "fieldName": "edulogId", "direction": "ASCENDING", "order": 0 }],
                        "tenantId": e2e.tenantId
                    }
                    let filters = []
                    let subfilter = {
                        "field": "edulogId",
                        "op": "BEGINS_WITH",
                        "value": "",
                        "not": false,
                        "ignoreCase": true,
                        "values": [

                        ]
                    }
                    subfilter.values[0] = listOfEdulogID[i];
                    console.log(JSON.stringify(subfilter.values))
                    console.log('before: ' + JSON.stringify(subfilter))
                    filters[0] = subfilter
                    case3_searchBody.query.filters = filters
                    console.log('this is the filter : ' + i + 'and the filters: ' + JSON.stringify(filters))
                    console.log('after: ' + JSON.stringify(subfilter))
                    console.log('filters is: ' + JSON.stringify(filters))
                    cy.request({
                        method: 'POST',
                        url: e2e.BE_URL + '/api/v1/search/students/search',
                        headers: {
                            'Authorization': 'Bearer ' + access_token,
                            'da': e2e.da
                        },
                        body: case3_searchBody
                    }).then(response => {
                        cy.expect(response.status).eq(200);
                        console.log(case3_searchBody)
                        let actualData = []
                        actualData = response.body.value.results
                        console.log('this is actual data: ' + JSON.stringify(actualData))
                        // Verify the csv data
                        cy.log('Start verifying csv data')
                        cy.expect(JSON.stringify(result.data[i]['Student_Edulog ID'])).eq(actualData[0].edulogId)
                        cy.expect(JSON.stringify(result.data[i]['Student_District ID'])).eq(actualData[0].districtId)
                        cy.expect(JSON.stringify(result.data[i]['Student_Address'])).eq(JSON.stringify(actualData[0].location.address))
                        if (actualData[0].studentContacts.length > 0) {
                            cy.expect(JSON.stringify(result.data[i]['Contact_#1_First Name'])).eq(JSON.stringify(actualData[0].studentContacts[0].contact.firstName))
                            cy.expect(JSON.stringify(result.data[i]['Contact_#1_Last Name'])).eq(JSON.stringify(actualData[0].studentContacts[0].contact.lastName))
                            if (JSON.stringify(result.data[i]['Contact_#1_Email']) == 'null') {
                                cy.expect(JSON.stringify(actualData[0].studentContacts[0].contact.Email)).eq(undefined)
                            } else {
                                cy.expect(JSON.stringify(result.data[i]['Contact_#1_Email'])).eq(JSON.stringify(actualData[0].studentContacts[0].contact.Email))
                            }

                        }

                    })

                }
            })
            cy.visit('/#/app/athena/reporting/students')

        }))
    })

    // it('Case 2 - User is able to generate student report with selected data - pdf report - OK', () => {
    //     const testReportFileName_csv = 'Automated_student_report_csv'
    //     let fullReportFileName
    //     const listOfFilters = ["District ID", "Edulog ID","Eligibility","Gender"]
    //     const districtIDs = 'Nhung103'
    //     cy.visit('/#/app/login', { timeout: 30000 })
    //     signIn.athena_inputUsername({ timeout: 20000 }).type(env.username)
    //     signIn.athena_inputPassword({ timeout: 20000 }).type(env.password)
    //     signIn.athena_LoginButton().click()
    //     homepage.navigateToRouting({ timeout: 30000 })
    //     routing_reporting.navigateToStudentReport()
    //     // cy.get('field-selector > div > button').click().get('.filter-menu > button').contains('District ID').click()
    //     // searchWidget.selectFilters_districtID()
    //     // searchWidget.inputSearchValueForDistrictID(districtIDs)
    //     // searchWidget.selectFilters_edulogID()
    //     searchWidget.selectFilters_list(listOfFilters)
    //     searchWidget.inputSearchValueForDistrictID(districtIDs)
    //     searchWidget.searchWithoutFilters()
    //     studentReport.selectFirstStudent()
    //     studentReport.selectReportType_pdf()
    //     studentReport.selectFieldsToGenerate_Address()
    //     studentReport.selectFieldsToGenerate_District_Id()
    //     studentReport.selectFieldsToGenerate_Email()
    //     studentReport.enterUserDefineFileName(testReportFileName_csv)
    //     studentReport.generateReport_withSelectedData()
    //     // Download report once the report is generated completely
    //     if (studentReport.isCompleteGeneratingReport()) {
    //         studentReport.downloadFirstCompletedReport()
    //     }
    //     // download the latest completed csv report and verify data
    //     const downloadReportSelector = '.ag-row-position-absolute.ag-row-first > div:nth-child(1)[col-id = "fileName"]'
    //     cy.get(downloadReportSelector).invoke('text').then((reportFilename => {
    //         cy.log(reportFilename)
    //         // Get report file name including csv extension
    //         const reportFilename_full = (s, n) => s.substring(s.length - n)
    //         let path = downloadsFolder + '/' + reportFilename_full(reportFilename, 48)
    //         // cy.readFile(path).then((pdfContent) => {
    //         //     // parse csv content to json object
    //         //     console.log(pdfContent)
    //         // })


    //     }))
    // })  


    // it('User is able to download report and report contains correct data', () => {
    //     const testReportFileName_csv = 'Automated_student_report_csv'
    //     let fullReportFileName
    //     cy.visit('/#/app/login', { timeout: 20000 })
    //     signIn.athena_inputUsername().type(env.username)
    //     signIn.athena_inputPassword().type(env.password)
    //     signIn.athena_LoginButton().click()
    //     homepage.navigateToRouting({timeout:20000})
    //     routing_reporting.navigateToStudentReport()
    //     // searchWidget.openSearchWidget()
    //     // cy.wait(30000)
    //     if (studentReport.isCompleteGeneratingReport()) {
    //         studentReport.downloadFirstCompletedReport()
    //     }
    //     // download the latest completed csv report and verify data
    //     const latestCompletedReport = '.ag-row-position-absolute.ag-row-first > div:nth-child(1)[col-id = "fileName"]'
    //     cy.get(latestCompletedReport).invoke('text').then((reportFilename => {
    //         cy.log(reportFilename)
    //         const reportFilename_full = (s, n) => s.substring(s.length - n);
    //         let path = downloadsFolder + '/' + reportFilename_full(reportFilename,48)
    //         csvdata.
    //         cy.readFile(path).then(neatCSV).then(validateCsvList)

    //         // const data = csvdata.readCSVfileFromDownloadFolder(path)
    //         // csvdata.studentReport_exportCSVdata(path)
    //         // const output = csvdata.csvToJson(data)
    //     }))
    //     // let testFileName = studentReport.verifyReportFilename(testReportFileName_csv)
    // })    
    // cy.log(studentReport.firstCompletedReportFileName())

    afterEach(function () {
        // executes post each test within it block
        cy.log("AfterEach hook")
        cy.visit('#/app/main')

    })
})