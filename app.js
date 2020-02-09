const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');
const writeFileAsync = util.promisify(fs.writeFile);

// Constructors
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');

// HTML Generator
const genHTML = require('./Template/generateHTML');

// global variables
let stringHTML = '';
let teamArr = [];

init();

// Main function run on Initialization
async function init() {
    let newPerson = 'Yes';
    do{
        try {
            
            let { name } = await promptName();
            // console.log("Returning: " + name);

            let { id } = await promptId();
            // console.log("Returning: " + id);

            let { email } = await promptEmail();
            // console.log("Returning: " + email);

            let { role } = await promptRole();
            // console.log("Returning: " + role);

            let employeeInfo;

            if (role === 'Intern'){
                employeeInfo = await promptSchool();
                // console.log("Returning: " + employeeInfo.school);
                let intern = new Intern(name, id, email, employeeInfo.school);
                teamArr.push(intern);
            }
            else if (role === 'Engineer'){
                employeeInfo = await promptGithub();
                // console.log("Returning: " + employeeInfo.githubUsername);
                let engineer = new Engineer(name, id, email, employeeInfo.githubUsername);
                teamArr.push(engineer);
            }
            else if (role === 'Manager'){
                employeeInfo = await promptOffice();
                // console.log("Returning: " + employeeInfo.officeNumber);
                let manager = new Manager(name, id, email, employeeInfo.officeNumber);
                teamArr.push(manager);
            }
            newPerson = await promptAddEmployee();
            // console.log("-- This is the response from promptAddEmployee: " + newPerson.runAgain)
        } catch (err){
            // console.log(" ... The catch threw an error ...");
            console.log(err);
        }
        // console.log("-- At end of do while loop: " + newPerson.runAgain);
    } while(newPerson.runAgain === 'Yes');
    // showTeam(teamArr);
    createEachCard(teamArr);
    createHtmlFile(stringHTML);
}

// Prompts
function promptName(){
    const name = inquirer.prompt({
        name: 'name',
        type: 'input',
        message: 'Please enter employee name.'
    });
    return name;
}

function promptId(){
    const id = inquirer.prompt({
        name: 'id',
        type: 'input',
        message: 'Please enter employee id.'
    });
    return id;
}

function promptEmail(){
    const email = inquirer.prompt({
        name: 'email',
        type: 'input',
        message: 'Please enter the employee email.'
    });
    return email;
}

function promptRole(){
    const role = inquirer.prompt({
        name: 'role',
        type: 'list',
        message: 'Please select the employee role',
        choices: ['Intern', 'Engineer', 'Manager']
    });
    return role;
}

// Intern prompt
function promptSchool(){
    const school = inquirer.prompt({
        name: 'school',
        type: 'input',
        message: 'Please enter employee school.'
    });
    return school;
}

// Engineer prompt
function promptGithub(){
    const githubUsername = inquirer.prompt({
        name: 'githubUsername',
        type: 'input',
        message: 'Please enter the employee github Username.'
    });
    return githubUsername;
}

// Manager prompt
function promptOffice(){
    const officeNumber = inquirer.prompt({
        name: 'officeNumber',
        type: 'input',
        message: 'Please enter the employee office number'
    });
    return officeNumber;
}

// Prompt for another employee added
function promptAddEmployee(){
    const runAgain = inquirer.prompt({
        name: "runAgain",
        type: "list",
        message: "Would you like to add another employee?",
        choices: ["Yes", "No"]
    });
    return runAgain
}

// function for Showing what employees are in the array. Injected for testing purposes. 
function showTeam(arr){
    console.log("... Heres your current team ...")
    arr.forEach(function(teammate){
        console.log(teammate.name);
        console.log(teammate.role);
        if(teammate.role === 'Manager'){
            console.log(teammate.officeNumber);
        } else if(teammate.role === 'Intern'){
            console.log(teammate.school);
        } else if(teammate.role === 'Engineer'){
            console.log(teammate.githubUsername);
        }
    })
}

// Loops through the array of employees adding a card for each. 
function createEachCard(arr){
    arr.forEach(function(teammate){
        let personCard = genHTML.employeeCard(teammate);
        stringHTML += personCard;
        // console.log(stringHTML);
    });
    // stringHTML = genHTML.employeeCard(arr[0]);

}

// Generates the beginning of the html file, then adds the cards. 
function createHtmlFile(m){
    let createHTML = genHTML.header(m);
    writeFileAsync('./Output/generatedTeam.html', createHTML);
    console.log("HTML File generated!");
}

