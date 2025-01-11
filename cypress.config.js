// const { defineConfig } = require ('cypress')
// const fs = require('fs');
// const pdf = require('pdf-parse')
// const path = require('path')

module.exports = {
  viewportWidth: 1920,
  viewportHeight: 1080,
  downloadsFolder:'cypress/downloads',
  chromeWebSecurity: false,
  watchForFileChangs: false,
  reporter: 'mochawesome',
  reporterOptions: {
    overwrite: false,
    html: false,
    json: true,
  },
  env: {
    username: 'vbadmin@karrostech.com',
    password: 'W8whf2RXJNxEahj',
    userForgotPass: 'forgotpass@fo.com',
    ca_userName:'nhan.huynh@karrostech.com',
    ca_passWord:'0987654321x@XX',
    loginBody:
    {                
      "email" : "vbadmin@karrostech.com",
      "password" : "W8whf2RXJNxEahj",
      "scope" : "Insight"
    },
  getSchoolArrivalBody:
  {
    "email" : "nhan.huynh@karrostech.com",
      "password" : "0987654321x@XX",
      "scope" : "Insight"
  }
  },
  defaultCommandTimeout: 10000,
  video: false,
  experimentalSourceRewriting: true,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
      // add task to read pdf file from this line
    },
    baseUrl: 'https://release.athena-nonprod.com/',
    BE_URL:'https://ath-be-release.athena-nonprod.com',
    tenantId:'e90923cf-b601-4092-a9bc-bd8e9043af1b',
    da:'ad0a53fd-9e77-48f9-ab8e-d06a41c5035f'
    // experimentalStudio: true
  }
}

