// const path = require('path')
// const neatCSV = require('neat-csv')
// export const validateCsv = (csv) => {
//     cy.wrap(csv)
//     .then(neatCSV)
//     .then(validateCsvList)
//   }
const expectedTestdata = {
    'Student_Edulog ID': '54361',
    'Student_Address': '7960 Merchants WAY, 32222',
    'Student_District ID': '20244951',
    'Student_Email': ''
}
export const validateCsvList = (list) => {
    expect(list, 'number of records').to.have.length(1)
    expect(list[0], 'first record').to.deep.equal({
        'Student_Edulog ID': '54361',
        'Student_Address': '7960 Merchants WAY, 32222',
        'Student_District ID': '20244951',
        'Student_Email': ''
    })
}
export const validateCsvFile = (name) => {
    const downloadsFolder = Cypress.config('downloadsFolder')
    const filename = path.join(downloadsFolder, name)

    cy.readFile(filename, 'utf8').then(validateCsv)
}
class ReadFile {
    readCSVfileFromDownloadFolder(path) {
        cy.readFile(path).then((content) => {
            const lines = content.split('\n');
            const headers = lines[0].split(',');
            const csvData = lines.slice(1).map(line => {
                const values = line.split(',');
                return headers.reduce((obj, header, index) => {
                    obj[header] = values[index];
                    return obj;
                }, {});
            });
            // let firstLine = JSON.stringify(csvData[0].Student_Address).replace('"','')
            // console.log(Object.values(csvData))
            // const edulogID = JSON.stringify(csvData[0].Student_Address)
            // const text = JSON.stringify(csvData)
            // console.log('this is the data: ' + text)
            // return text
            expect(csvData[0], 'first record').to.deep.equal({
                'Student_Edulog ID': '54361',
                'Student_Address': '7960 Merchants WAY , 32222',
                'Student_District ID': '20244951',
                'Student_Email': ''
            })
        })
    }
    studentReport_readCSVfile_incluceCommas(path){
        cy.readFile(path).then((csvContent) => {
            const lines = csvContent.split('\n');
            const headers = lines[0].split(',');
          
            const data = lines.slice(1).map(line => {
              const values = line.split(',');
              const obj = {};
          
              // Handle commas within values by considering quoted fields
              headers.forEach((header, index) => {
                let value = JSON.stringify(values[index]);
                if (value.substring(0,1)==='"' && value.substring(value.length - 1)=== '"') {
                  value = value.slice(1, -1); // Remove quotes
                }
                obj[header] = value;
              });
          
              return obj;
            });
          
            // Now, data is an array of objects with correct values
            cy.log(JSON.stringify(data));
          
            // Use the parsed data in your tests
            data.forEach(row => {
              // ... your test logic here
              expect(csvData[0], 'first record').to.deep.equal({
                'Student_Edulog ID': '54361',
                'Student_Address': '7960 Merchants WAY , 32222',
                'Student_District ID': '20244951',
                'Student_Email': ''
            })              
            });
          });
    }

    readCSV(filePath) {
        const reader = new FileReader();

        reader.onload = function (event) {
            const csvData = event.target.result;
            const lines = csvData.split('\n');

            const headers = lines[0].split(',');
            const data = [];

            for (let i = 1; i < lines.length; i++) {
                const row = lines[i].split(',');
                const
                    obj = {};
                headers.forEach((header, index) => {
                    obj[header] = row[index];
                });
                data.push(obj);
            }
            //   return data
            cy.log(data); // Array of JSON objects
        };
        // reader.readAsText(filePath)
    }

    csvToJson(text, quoteChar = '"', delimiter = ",") {
        text = text.trim()
        let rows = text.split("\n")
        let headers = rows[0].split(",")

        const regex = new RegExp(`\\s*(${quoteChar})?(.*?)\\1\\s*(?:${delimiter}|$)`, "gs")

        const match = (line) => {
            const matches = [...line.matchAll(regex)].map((m) => m[2])
            // Ensure matches length matches headers length by padding with null values
            const paddedMatches = Array.from({ length: headers.length }, (_, i) => matches[i] ?? null)
            return paddedMatches
        }

        let lines = text.split("\n")
        const heads = headers ?? match(lines.shift())
        lines = lines.slice(1)

        return lines.map((line) => {
            return match(line).reduce((acc, cur, i) => {
                // replace blank matches with `null`
                const val = cur === null || cur.length <= 0 ? null : Number(cur) || cur
                const key = heads[i] ?? `{i}`
                return { ...acc, [key]: val }
            }, {})
        })
    }
    studentReport_readCSV(path) {
        cy.readFile(path)
            .then(txt => txt.split('\n').map(row => row.trim()))  // string to array of rows
            .then(rows => {
                const data = rows.slice(1)                         // remove headers
                    .map(row => row.split('|')                       // split each row
                        .filter(Boolean)                               // ignore start and end "|"
                        .map(col => col.trim())                        // remove whitespace
                    )
                    .filter(row => row.length)                       // remove empty rows
                return data
            })
            .should('deep.eq', expectedTestdata)
            .each(row => {
                console.log(row)
            })
    }

    // const csvString = `
    // aa,bb,cc
    // 11,22,33
    // 44,
    // 77,,99
    // `

    // const jsonData = csvToJson(csvString)
    // console.log(jsonData)
}



export default ReadFile