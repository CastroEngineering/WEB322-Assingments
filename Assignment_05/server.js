/********************************************************************************
* WEB322 – Assignment 05
*
* I declare that this assignment is my own work and completed based on my
* current understanding of the course concepts.
*
* The assignment was completed in accordance with:
* a. The Seneca's Academic Integrity Policy
* https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
*
* b. The academic integrity policies noted in the assessment description
*
* I did NOT use generative AI tools (ChatGPT, Copilot, etc) to produce the code
* for this assessment.
*
* Name: Joao Marcos Freire de Castro Student ID: 173962234
*
********************************************************************************/



const HTTP_PORT = process.env.PORT || 8080;

const express = require("express");
const app = express();
app.use(express.static("public"));  
app.set("view engine", "ejs");      //ejs
app.use(express.urlencoded({ extended: true })); //forms
require("dotenv").config()

//vercel stuff
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
require('pg'); // explicitly require the "pg" module


// +++ Database connection code
// +++ TODO: Remember to add your Neon.tech connection variables to the .env file!!
const { Sequelize } = require("sequelize")
const sequelize = new Sequelize(process.env.PGDATABASE, process.env.PGUSER, process.env.PGPASSWORD, {
  host: process.env.PGHOST,
  dialect: "postgres",
  port: 5432,
  dialectOptions: {
    ssl: { rejectUnauthorized: false },
  },
});

// +++  4. TODO: Define your database table


const Location = sequelize.define("Location", {
  name: { type: Sequelize.TEXT },
  address: { type: Sequelize.TEXT },
  category: { type: Sequelize.TEXT },
  comments: { type: Sequelize.TEXT },
  image: { type: Sequelize.TEXT }
}, {
  timestamps: false 
});


// +++ 5. TODO: Define your server routes
app.get("/", async (req, res) => {    
    try {
        const locations = await Location.findAll();
        res.render("home.ejs", { locations });
    } catch (err) {
        res.status(400).send("No information");
    }
})

app.get("/memories/add", async (req, res) => {
    try {
        const locations = await Location.findAll();
        res.render("add.ejs");
    } catch (err) {
        console.error(err);
        res.status(400).send("No information");
    }    
})

app.post("/memories/add", async (req, res) => {
    try {
        await Location.create({ 
            name: req.body.name,
            address: req.body.address,
            category: req.body.category,
            comments: req.body.comments,
            image: req.body.image });
            res.redirect("/");
    } catch (err) {
        res.status(400).send("No addition of location");
    }    
})

app.get("/memories/add/:id", async (req, res) => {
    try {
        await Location.destroy({ where: { id: req.params.id } });
        res.redirect("/");
    } catch (err) {
        res.status(400).send("No deletion of location");
    }    
})

// +++  Function to start serer
async function startServer() {
    
    try {            
        await sequelize.authenticate();        
        await sequelize.sync()

        console.log("SUCCESS connecting to database")
        console.log("STARTING Express web server")        
        
        app.listen(HTTP_PORT, () => {     
            console.log(`server listening on: http://localhost:${HTTP_PORT}`) 
        })    
    }    
    catch (err) {        
        console.log("ERROR: connecting to database")        
        console.log(err)
        console.log("Please resolve these errors and try again.")
    }
}

startServer()



