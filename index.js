const GoogleSpreadsheet = require('google-spreadsheet');
const {promisify} = require('util');

//const creds = require('./client_secret');
const creds = {
   
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
