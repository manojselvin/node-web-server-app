const express = require('express');
const fs = require('fs');
const hbs = require('hbs');

let app = express();

const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');

app.use((req, res, next) => {
    let now = new Date().toString();
    let logData =  `${now}: ${req.method} - ${req.url}`;
    console.log(logData);
    fs.appendFile('server.log', logData + '\n', (err) => {
        if(err) {
            console.log(`Unable to write to file. Error - ${err}`);
        }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('site_maintenance');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});


app.get('/', (req, res) => {
    res.render('home', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome!, Manoj Selvin'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        pageTitle: 'About Page'
    });
}); 

app.get('/projects', (req, res) => {
    res.render('projects', {
        pageTitle: 'Projects Page',
        projectsList: [
            {projectId: 1, projectName: 'Node app'}, 
            {projectId: 2, projectName: 'Php app'}, 
            {projectId: 3, projectName: 'Ruby app'}
        ]
    });
}); 

app.get('/info', (req, res) => {
    res.send('<h1>Info page - /info</h1>');
}); 

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});