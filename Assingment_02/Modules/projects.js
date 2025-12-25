const projectData = require("../Data/projectData");
const sectorData = require("../Data/sectorData");

let projects = [];


function Initialize () {
return new Promise((resolve, reject) => {
    try {
        projects = [];
        projectData.forEach(fillProjects => {
    
        let sectorName = sectorData.find(sector => sector.id === fillProjects.sector_id);
        projects.push({ fillProjects, sectorName: sectorName.sector_name });

    });

resolve();

} catch (err) {
    reject("Initialize function failled");
}

});
}

function getAllProjects() {
    return new Promise ((resolve, reject) => {
        if (projects) {
            resolve(projects);
        } else {
            reject("No projects were created");
        }
    });
}

function getProjectById(projectID) {
    return new Promise((resolve, reject) => {
        let targetID = projects.find(target => target.fillProjects.id === projectID);
    if (targetID) {
        resolve(targetID);
    } else {
        reject("Matching project not found");
    }
    });
};

function getProjectsBySector(sector) {
    return new Promise((resolve, reject) => {
    let lowerSector = sector.toLowerCase();
    let targetSector = projects.filter(target => target.sectorName === sector );
        if (targetSector) {
            resolve(targetSector);
        } else {
            reject("Matching project not found")
        }
    });
    
}

module.exports = {
    projects,
    Initialize,
    getAllProjects,
    getProjectById,
    getProjectsBySector
};
