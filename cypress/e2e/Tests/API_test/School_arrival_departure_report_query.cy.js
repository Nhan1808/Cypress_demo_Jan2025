import { env, e2e } from "../../../../cypress.config"
import * as loginData from "../../../fixtures/loginInformation.json"
import * as jsonTestData from '../../../fixtures/Report_school_arrival_departure.json'

describe("CA report _ school arrival departure _ api testing", () => {
    let access_token;
    let loginBody = {
        "email": env.ca_userName,
        "password": env.ca_passWord,
        "scope": "Insight"
    }
    before("Login Athena", () => {
        cy.log('Login to athena!!!!!!');
        cy.request({
            method: 'POST',
            url: '/api/v1/signin',
            // body: env.loginBody
            body: loginData.loginAthena
        }).then(response => {
            cy.expect(response.status).eq(200);
            cy.log(response.status)
            access_token = response.body.accessToken;
        })
    })
    after(() => {
        cy.log("complete all test here");
    })
    beforeEach(() => {
        cy.log("start each test here");
    })
    afterEach(() => {
        cy.log("complete each test here");
    })
    // "Test 1 - Make sure the api can be called for specific school and vehicle"
    it("Test report - case 1 - specific bus and school", () => {
        cy.log("start calling api to get data")
        cy.request({
            method: 'POST',
            url: '/api/comparativeanalysis/report/search',
            headers: {
                'Authorization': 'Bearer ' + access_token
            },
            body: jsonTestData.case1
        }).then(response => {
            cy.expect(response.status).eq(200)
            cy.expect(response.body.results[0].direction).eq("From School")
            assert.exists(response.body.results[0].vehicle)
            assert.exists(response.body.results[0].school)
            assert.exists(response.body.results[0].direction)
            cy.expect(response.body.results[0].vehicle.busNumber).eq(jsonTestData.case1.query.filters[4].value)
        })
    });
    // "Test 2 - API can return all schools and vehicles"
    it("Test report - case 2 - all buses and schools", () => {
        cy.log("start calling api to get data")
        cy.request({
            method: 'POST',
            url: '/api/comparativeanalysis/report/search',
            headers: {
                'Authorization': 'Bearer ' + access_token
            },
            body: jsonTestData.case2
        }).then(response => {
            cy.expect(response.status).eq(200);
            assert.isArray(response.body.results, "Report results is an array");
            cy.expect(response.body.results[0].direction).eq("From School");
            cy.log("the direction of 1st item is: " + response.body.results[0].direction);
            cy.log(response.body.results[0].vehicle.id);
            let results = response.body.results;
            let vehicleIds = [];
            for (let i in results) {
                vehicleIds.push(results[i].vehicle.id);
            }
            cy.expect(results.length).eq(vehicleIds.length);
            cy.expect(results[results.length - 1].vehicle.id).eq(vehicleIds[vehicleIds.length - 1])
            cy.log(vehicleIds[19]);
            cy.log(results.length);

        })
    });
});