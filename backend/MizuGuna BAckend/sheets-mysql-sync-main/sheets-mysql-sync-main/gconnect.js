const { google } = require("googleapis");
require('dotenv').config()

const readSpreedsheet = async function () {
    try {
        const spreadsheetId = process.env.SPREAD_SHEET_ID
        const auth = new google.auth.GoogleAuth({
            keyFile: process.env.AUTH_FILE,
            scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
        })

        const sheets = google.sheets({ version: 'v4', auth });
        // const res = await sheets.spreadsheets.get({ spreadsheetId });
        // console.log(res.data.sheets.map(s => s.properties.title));

        const range = "Sheet1!A2:F"

        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range,
        });

        const rows = response.data.values;
        // console.log(`VALUES:${rows}`)
        return rows;
    } catch (err) {
        console.error('Error reading spreadsheet:', err);
    }
}


module.exports = { readSpreedsheet };
