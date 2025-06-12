/********************************************************************************
* WEB322 – Assignment 02
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
* Name: Joao Marcos Freire de Castro Student ID: 173962234 Date: 30/05/2025
*
********************************************************************************/

const projectData = require("./Modules/projects");

const express = require('express'); 
const app = express();
const HTTP_PORT = process.env.PORT || 8080; 

projectData.Initialize().then(() => {

app.get("/", (req, res) => {
  res.send("Assignment 2: Joao Marcos - 173962234");
});

app.get("/solutions/projects", (req, res) => {
  projectData.getAllProjects()
    .then(projects => res.json(projects))
    .catch(err => res.send(err));
});

app.get("/solutions/projects/id-demo", (req, res) => {
  projectData.getProjectById(1)
    .then(project => res.json(project))
    .catch(err => res.send(err));
});

app.get("/solutions/projects/sector-demo", (req, res) => {
  projectData.getProjectsBySector("ind")
    .then(projects => res.json(projects))
    .catch(err => res.send(err));
})
app.listen(HTTP_PORT, () => console.log(`server listening on: ${HTTP_PORT}`));

});