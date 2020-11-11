const express = require('express');
const bodyParser = require('body-parser');

const hostname = '0.0.0.0';
const port = process.env.PORT || 3000;

const projectsController = require('./controllers/projects')();
const issuesController = require('./controllers/issues')();
const usersController = require('./controllers/users')();
const commentsController = require('./controllers/comments')();

const users = require('./models/users')();

const app = (module.exports = express());

console.log( "------------- index/before logging app.use" );
// logging
app.use((req, res, next) => {
    //Display log  for requests
    console.log("[%s] %s -- %s", new Date(), req.method, req.url);
    next();
});

console.log( "------------- index/after logging app.use" );
console.log( "------------- index/before check key app.use" );

app.use(async (req, res, next) => {
    const FailedAuthMessage = {
        // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/401
        error: "Failed Authentication",
        message: "Go Away!",
        code: "xxx", //Some useful error code
    };
    console.log( "------------- index/before suppliedKey" );
    const suppliedKey = req.headers["x-api-key"];
    console.log( "------------- suppliedKey" );
    console.log( suppliedKey );
    console.log( "------------- index/before clientIp" );
    const clientIp =
    req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    console.log( "------------- clientIp" );
    console.log( clientIp );
    console.log( "------------- index/before Check Pre-shared key" );

    // Check Pre-shared key
    if (!suppliedKey) {
        console.log(
            "   [%s] FAILED AUTHENTICATION -- %s, No Key Supplied",
            new Date(),
            clientIp
        );
        FailedAuthMessage.code = "01";
        return res.status(401).json(FailedAuthMessage);
    }

    console.log( "------------- index/before user" );
    const user = await users.getByKey(suppliedKey);
    if (!user) {
        console.log(
            "   [%s] FAILED AUTHENTICATION -- %s, Bad Key Supplied",
            new Date(),
            clientIp
        );
        FailedAuthMessage.code = "02";
        return res.status(401).json(FailedAuthMessage);
    }
    console.log( "------------- user" );
    console.log( user );
    next();
});
console.log( "------------- index/after check key app.use" );

app.use(bodyParser.json());

//////////////////////////////////// HOME //////////////////////////////////// 

app.get("/", (req, res) => {
    res.json({
        CBWA_CA_Part1: "Bug Tracker (API)",
        Name: "Alessandro Siqueira",
        Student_Number: 2020077
    });
});

////////////////////////////// ROUTES OF PROJECTS ////////////////////////////// 

//Get all projects
app.get('/projects', projectsController.getController);
//Get individual projects
app.get('/projects/:slug', projectsController.getBySlug);
//Add new projects individually
app.post('/projects', projectsController.postController);

////////////////////////////// ROUTES OF USERS ////////////////////////////// 

//Get all users
app.get('/users', usersController.getController);
//Get individual users
app.get('/users/:email', usersController.getByEmail);
//Add new users individually
app.post('/users', usersController.postController);

////////////////////////////// ROUTES OF ISSUES ////////////////////////////// 

//Get all issues with comments
app.get('/issues', issuesController.getController);
//Get individual issues
app.get('/issues/:projectSlug-:id', issuesController.getByIssueNumber);
//Get all issues for a project
app.get('/projects/:projectSlug/issues', issuesController.populatedController);
//Add new issues to a project individually
app.post('/projects/:slug/issues', issuesController.postController);

////////////////////////////// ROUTES OF COMMENTS ////////////////////////////// 

//Get all comments for an issue
app.get('/issues/:projectSlug-:id/comments', commentsController.getController);
//Get individual comments for an issue
app.get('/issues/:projectSlug-:id/comments/:commentId', commentsController.getByID);
//Add new comments to an issue
app.post('/issues/:projectSlug-:id/comments', commentsController.postController);



app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

//404
app.use((req, res) => {
    res.status(404).json({
        error: 404,
        message: 'Route not found',
    });
});