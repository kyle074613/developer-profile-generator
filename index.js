const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const htmlToPdf = require("html-pdf");
const axios = require("axios");
const gs = require("github-scraper");

//electron.pdf

const writeFileAsync = util.promisify(fs.writeFile);

function getUserData() {
    return inquirer.prompt([
        {
            type: "input",
            name: "username",
            message: "Enter your Github username."
        },
        {
            type: "list",
            name: "color",
            message: "What is your favorite color?",
            choices: ["Red", "Orange", "Yellow", "Green", "Blue"]
        }
    ])

};

function generateHTML(githubResponse) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.4.1/css/bootstrap.min.css" 
        integrity="sha256-L/W5Wfqfa0sdBNIKN9cG6QA5F2qx4qICmU2VgLruv9Y=" crossorigin="anonymous" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css"
        integrity="sha256-+N4/V/SbAFiW1MPBCXnfnP9QSN3+Keu+NlB+0ev/YKQ=" crossorigin="anonymous" />
        <title>Github Profile Card</title>
    </head>
    <body>
        <div class="jumbotron jumbotron-fluid">
            <div class="container">
                <h1 class="display-4">${image}</h1>
                <p class="lead">My Github username is ${name}!</p>
                <div class="row links justify-content-center">
                    <div class="col-2">
                        <a href="${googleMaplink} target="_blank"><i class="fas fa-location-arrow"></i>${location}</a>
                    </div>
                    <div class="col-2">
                        <a href="${githubLink} target="_blank"><i class="fab fa-github"></i>Github</a>
                    </div>
                    <div class="col-2">
                        <a href="${blogLink} target="_blank"><i class="fas fa-blog"></i>Blog</a>
                    </div>
                </div>
            </div>
        </div>

        <div class="container">
            <div class="row">
                <div class="col">
                    ${bio}
                </div>
            </div>
            <div class="row">
                <div class="col info">Public Repositories\n${repos}</div>
                <div class="col info">Followers\n${followers}</div>
                <div class="w-100"></div>
                <div class="col info">Github Stars\n${stars}</div>
                <div class="col info">Following\n${following}</div>
            </div></div>
    </body>
    </html>`
}

