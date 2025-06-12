/********************************************************************************
* WEB322 – Assignment 1
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
* Name: Joao Marcos Freire de Castro Student ID: 173962234 Date: 20/05/2025
*
********************************************************************************/


const { stdout } = require('process');
const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface(process.stdin, process.stdout);

rl.question('Do you wish to process a File (f) or Directory (d): ', function (process) {
    if (process === 'f') {
        rl.question('File name: ', function (fileName) {
            fs.readFile(fileName, function (err, fileData) {
                if (err) {
                    console.log(err.message);
                } else {
                    const Characters = fileData.toString().replace(/\s+/g, ' ');
                    const words = Characters.replace(/[^\w\s\']/g, "").split(' ');

                    const numCharacters = Characters.length;
                    const numWords = words.length;
                    const longestWord = words.reduce((a, b) => b.length > a.length ? b : a, "");

                    console.log(`Number of Characters (including spaces): ${numCharacters}`);
                    console.log(`Number of Words: ${numWords}`);
                }
                rl.close();
            });
        });
    } else if (process === 'd') {
        rl.question('Directory name: ', function (dirName) {
            fs.readdir(dirName, function (err, dirData) {
                if (err) {
                    console.log(err.message);
                } else {
                    const sortedFiles = dirData.sort((a, b) => b.localeCompare(a));
                    console.log(`Files (reverse alphabetical order): ${sortedFiles.join(', ')}`);
                }
                rl.close();
            });
        });
    } else {
        console.log('Invalid input');
        rl.close();
    }
});