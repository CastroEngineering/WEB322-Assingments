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
app.use(express.static('public')); //assingment 03
const HTTP_PORT = process.env.PORT || 8080; 

projectData.Initialize().then(() => {

app.get("/", (req, res) => {
  res.sendFile(Path2D.join(__dirname, "Views/home.html"));
});

pp.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "Views/about.html"));
});

app.get("/solutions/projects", (req, res) => {
  if (req.query.sector) {
    projectData.getProjectsBySector("ind")
    .then(projects => res.json(projects))
    .catch(err => res.status(404).send(err));
  } else {
    projectData.getAllProjects()
    .then(projects => res.json(projects))
    .catch(err => res.status(404).send(err));
  }
    
});

app.get("/solutions/projects/:id", (req, res) => {
  const id = parseInt(req.params.id);
  projectData.getProjectById(id)
    .then(project => res.json(project))
    .catch(err => res.send(err));
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "Views/404.html"));
});

app.listen(HTTP_PORT, () => console.log(`server listening on: ${HTTP_PORT}`));

});