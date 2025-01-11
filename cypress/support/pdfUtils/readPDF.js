const fs = require("fs")
const path = require('path')
const pdf = require('pdf-parse')

export const readPdf = (pathToPdf) => {

  const resolvedPath = path.resolve(pathToPdf)
  let dataBuffer = fs.readFileSync(resolvedPath)
  pdf(dataBuffer).then(function ({ text }) {

    return text

  })

}
