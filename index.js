const GoogleSpreadsheet = require('google-spreadsheet');
const {promisify} = require('util');

//const creds = require('./client_secret');
const creds = {
    "type": "service_account",
    "project_id": "quickstart-1558935644263",
    "private_key_id": "23e440e8f3b5cef84e7847992ee0890e45af898e",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCyEILnnp+1HzBv\nseBHM4iSVMUSj47t11BbVHLR7KnGv5BCiRCeYahfq+mZZcuBh3n3xgAP6oElNeID\nmWdzE/RwNkbkaluV/PqlxME+fhhrurnxkB3nkQJ2yq5242yXu3O/gomBBsaP5B7s\nOfdLkYcdWMx1AUSQh+7l1qSi+ymjTBOvwHb+M3xEzgDlrwRYnYmGGWC5Z90ZQfvL\nQ6WNrq9qrALJ5zXZwdZT3kGyu94n9966NZvQaVNVefBzyM305R/mVP04bAU7WpSu\n6jwJWMUkdfWj5wdAvDzApqVZ2EIbuiCdHFVrrSZ70k1bK0e00CAkczVpspW5L1dC\nCg3aqw2/AgMBAAECggEAAzR7p5idfIQnCFAV7Pd+Nt1kTD7Wseyv0ms8NSwYD1J3\nQ4puz/oZBAWaSvSY0r2HWVCiGOAhaNdwnA5O+YnmIfAJDS50O6vyTBzDOlhXBIVi\nRqPBfEMmiEJJjp6Yw0hlv1eJNbq24XQJo4+i3wfy0VzMFjNHB9MrbLFN9ookOeLq\nep94FDomcLnpsGtbiSmKmAPxn6k7ORhDuhSuOphxxkciGhz8mwplji2k4BN9Y0w3\nHs1/IFEZgeG+FjKNU1qcfWjn6LK68WJE+LmO2jeO0B1uZLlE9951VHAD1fi2j/aY\niGO9ugEa+ZSiK0NNswul3GsS3TaFXEXgEpPgE5N4tQKBgQDWVzwAZtIU6qLgY3iE\nseNn1S1zQS20ga62TH9DA4kecdUZhmgxapiIYR8dqm5G4j+3S8uRcjuSp/DawDDe\n6SlblDfpSJeNrnO0W49PAT1I4WW/aGBXV62zWYZ7cZ9pn7irEgnWrAbDDSADC3oO\nMwpvWkMlBgIEIUkZHupyyxo9AwKBgQDUrE+M/5Kw/DfjqKChqLAIZVeNPxX0DPAc\nUaWb+me/6KSsQGDaKFDONxz0UxJmegwTDTMjO68G0NTeNJs1S+m2c3Lpp88ku3R3\nJOgFU5b5yHEfLsJHJ+Nd44AHCsQUxyIDW3w7NshVIQQESMotmoJyT0WSerTxAbGs\nP8483DrZlQKBgQClQ1+lI6JJtFxfTPLoxUwEjC7eFdxKuE7ginz5S6mWysg3RRXj\nPEBdrxzRv84FY38jMhLEk2JxgoHH+LX1uatEzDSL74fDG0ZlQs9taBQ7tGbCPZVC\n4vywM4/ocEQsqZU2edMSLVONYvpSvq+ecSZTkzIAQvCdBJkbAGZemlEhxwKBgQCV\nYzBB96g///r2RJYI2ChGzYDxa5XtJ0Vmbweoh/1mtXEuuc4Oj/Eq2VXSXaP4LdTb\ncRMxtZPdcsWEDGnVxyw1B+V5MXH0+GP36Qm97BiJ/n1PjRXUy7UPV2WwDKTtf29p\n8lJSecnA2n8qz0KNRBJLX1mcaes9u5XlS7B/2abQ/QKBgDHH9KcYqtOaXD+9Ql2R\nMMFojMHmN2PMdxwjuwGUaqbUK17q22eASVF6OZfveqUF1v7iI7YTtPplsGuOzDU4\nUM822zZkEceH64oPrgmwoZRcXhiMUigG18Tq/vX98aEI19ZHaZfVYj5jTiMT54x1\nOwPsF1DeMYVGJKNnqzc2tCSj\n-----END PRIVATE KEY-----\n",
    "client_email": "sheets@quickstart-1558935644263.iam.gserviceaccount.com",
    "client_id": "117988679466287983242",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/sheets%40quickstart-1558935644263.iam.gserviceaccount.com"
  }
  

function printEmployee(employee){
    console.log(`Name: ${employee.name}`);
    console.log(`Designation: ${employee.designation}`);
    console.log(`Department: ${employee.department}`);
    console.log('-----------------------')
}

async function accessSpreadsheet(){
    console.log(creds);
    const doc = new GoogleSpreadsheet('1YGyS1W8fQumpUInv8bDvXdQUszPMRcvNNbwV6dqg790');
    await promisify(doc.useServiceAccountAuth)(creds);
    const info = await promisify(doc.getInfo)();
    const sheet = info.worksheets[0];
    const rows = await promisify(sheet.getRows)({
        offset:1
    });
    //console.log(rows)
    const newEmployee ={
        name: 'Md Musfiqul Islam',
        designation: "SW",
        department: "EVL"
    };

    await promisify(sheet.addRow)(newEmployee);

    rows.forEach(row => {
        printEmployee(row);
    });
} 



accessSpreadsheet();