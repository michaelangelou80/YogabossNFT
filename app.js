const express = require("express");
var bodyParser = require('body-parser')
const path = require("path");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.post("/freeGiftForm", async (req, res) => {
    const fullname = req.body.fullname
    const email = req.body.email
    const auth = new google.auth.GoogleAuth({
        keyFile: "keys.json", //the key file
        //url to spreadsheets API
        scopes: "https://www.googleapis.com/auth/spreadsheets", 
    });
    //Auth client Object
    const authClientObject = await auth.getClient();
    //Google sheets instance
    const googleSheetsInstance = google.sheets({ version: "v4", auth: authClientObject });
    // spreadsheet id
    const spreadsheetId = "1yfuA0uGEjgHCUClaymU1zhXIOLFybGskg-YxdH8A-sA";
    //write data into the google sheets
    await googleSheetsInstance.spreadsheets.values.append({
        auth, //auth object
        spreadsheetId, //spreadsheet id
        range: "Sheet1!A:B", //sheet name and range of cells
        valueInputOption: "USER_ENTERED", // The information will be passed according to what the usere passes in as date, number or text
        resource: {
            values: [[ fullname, email ]],
        },
    });
    res.redirect('back')
})

app.get("/minting", function (req, res) {
    res.render("mint")
});

app.get("/", function (req, res) {
    res.render("index")
});

app.use(express.static(path.join(__dirname, "public")));

// live
/*app.listen(8080, function () {
    console.log("Server is running on http://127.0.0.1:8080");
});*/
app.listen(3000, function () {
    console.log("Server is running on http://localhost:3000");
});