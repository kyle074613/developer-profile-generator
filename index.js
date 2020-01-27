const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const htmlToPdf = require("html-pdf");
const axios = require("axios");

//electron.pdf

const writeFileAsync = util.promisify(fs.writeFile);

var userColor;
var userStars;

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
            choices: ["Red", "Orange", "Yellow", "Green"]
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
        <link href="https://fonts.googleapis.com/css?family=Josefin+Sans&display=swap" rel="stylesheet">
        <style>
            *{
                font-family: 'Josefin Sans', sans-serif;
            }
            img{
                height: 250px;
                width: 250px;
                border-radius: 10px;
            }
            p{
                font-size: 20px;
            }
            .jumbotron{
                background-color: ${userColor};
            }
            .lead{
                font-size: 2.25rem;
            }
            .bio{
                font-size: 30px;
            }
            .info{
                font-size: 20px;
                background-color : ${userColor};
                border-radius: 10px;
            }

        </style>
    </head>
    <body>
        <div class="jumbotron jumbotron-fluid">
            <div class="container">
                <h3 class="display-4 text-center"><img src="${githubResponse.data.avatar_url}"></h3>
                <p class="lead text-center">My Github username is ${githubResponse.data.login}!</p>
                <div class="row links justify-content-center">
                    <div class="col-2">
                        <a href="https://www.google.com/maps/place/${githubResponse.data.location}" target="_blank"><i class="fas fa-location-arrow"></i> ${githubResponse.data.location}</a>
                    </div>
                    <div class="col-2">
                        <a href="${githubResponse.data.html_url}" target="_blank"><i class="fab fa-github"></i> Github</a>
                    </div>
                    <div class="col-2">
                        <a href="${githubResponse.data.blog}" target="_blank"><i class="fas fa-blog"></i> Blog</a>
                    </div>
                </div>
            </div>
        </div>

        <div class="container">
            <div class="row bio">
                <div class="col text-center mb-3">
                    ${githubResponse.data.bio}
                </div>
            </div>
            <div class="row">
                <div class="col info text-center mb-3 mx-1 p-1">Public Repositories<br>${githubResponse.data.public_repos}</div>
                <div class="col info text-center mb-3 mx-1 p-1">Followers<br>${githubResponse.data.followers}</div>
                <div class="w-100"></div>
                <div class="col info text-center mx-1 p-1">Github Stars<br>${userStars}</div>
                <div class="col info text-center mx-1 p-1">Following<br>${githubResponse.data.following}</div>
            </div>
        </div>
    </body>
    </html>`
}

async function init() {
    try {
        const userInput = await getUserData();
        userColor = userInput.color;

        const username = userInput.username;

        await axios
            .get(`https://api.github.com/users/${username}/repos`)
            .then(reposResponse => {
                userStars = 0;
                reposResponse.data.forEach(element => {
                    userStars += element.stargazers_count;
                });
            })
            .catch(err => {
                throw err;
            });

        axios
            .get(`https://api.github.com/users/${username}`)
            .then(githubResponse => {

                writeFileAsync("index.html", generateHTML(githubResponse)).then(() => {
                    const html = fs.readFileSync("index.html", "utf8");
                    const options = { "height": "11in", "width": "8.5in", "format": "Letter" }
                    htmlToPdf.create(html, options).toFile("index.pdf", function (err, res) {
                        if (err) throw err;
                    });
                });

            })
            .catch(err => {
                throw err;
            });


    }
    catch (err) {
        console.log(err);
    }
}

init();

