/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
// const { defineConfig } = require ('cypress')
// const fs = require('fs');
// const pdf = require('pdf-parse')
// const path = require('path')

module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  // on('task',{
  //   report_readPDFfile(pdfFilePath){
  //     return new Promise((resolve)=>{
  //       const filePath = path.resolve(pdfFilePath)
  //       const dataBuffer = fs.readFileSync(filePath)
  //       pdf(dataBuffer).then(function(data){
  //         resolve(data)
  //       })
  //     })
  //   }
  // })
}

module.exports = (on, config) => {
  on('before:browser:launch', (browser = {}, launchOptions) => {
    // `args` is an array of all the arguments that will
    // be passed to browsers when it launches
    console.log(launchOptions.args) // print all current args
  
    if (browser.family === 'chromium' && browser.name !== 'electron') {
      // auto open devtools
      launchOptions.args.push('--disable-site-isolation-trials')
  
      // whatever you return here becomes the launchOptions
      return launchOptions
    }
  
  })
 }
 
