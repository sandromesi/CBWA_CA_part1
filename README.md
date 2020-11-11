# Bug Tracker
![ladybuggray](https://github.com/sandromesi/CBWA_CA_part1/blob/master/ladybuggray.gif)

_A Cloud Based Web Applications Final CA Project_

## Description
A REST API developed for the Final Continuous Assessment of the Subject 
Cloud-Based Web Applications of the Higher Diploma in Science Computing Course Level 8 QQI in CCT College Dublin.

## Table of contents
* [How To Set It Up](#how-to-set-it-up)
* [Technologies](#technologies)
* [Routes](#routes)
* [Changelog](#changelog)
* [Roadmap](#roadmap)
* [Author Info](#author-info)

## How To Set It Up

## Technologies

* Visual Studio Code
* JavaScript
* NodeJs
* Npm
* Mongodb
* Express
* Body Parser
* Nodemon

## Routes
#### Home : 

* {GET} `/`
### Projects

#### Get all projects :

* {GET} `/projects`
#### Get individual projects : 

* {GET} `/projects/slug`
#### Add new Projects individually : 

* {POST} `/projects`
### Users
#### Get all users : 

* {GET} `/users`
#### Get individual users : 

* {GET} `/users/email`
#### Add new users individually : 

* {POST} `/users`
### Issues
#### Get all issues with comments : 

* {GET} `/issues`
#### Get individual issues : 

* {GET} `/issues/projectSlug-id/issues`
#### Get all issues for a project : 

* {GET} `/projects/projectSlug`
#### Add new issues to a project individually : 

* {POST} `/projects/slug/issues`
### Comments
#### Get all comments for an issue : 

* {GET} `/issues/projectSlug-id/comments`
#### Get individual comments for an issue : 

* {GET} `/issues/projectSlug-id/comments/commentId`
#### Add new comments to an issue : 

* {POST} `/issues/projectSlug-id/comments`

## Changelog

## Roadmap
- [x] Add to All promises a reject.
- [x] Add try-catch to await calling promises. (review)
- [x] Add indexe to avoid duplicate users. (based on email)
- [x] Add indexe to avoid duplicate projects. (based on SLUG)
- [ ] Add json schema validation to avoid add items without all the fields.
- [ ] Enhance error handling messages
- [ ] Use bcrypt to hash the password/key for the users.
- [ ] Add in email notifications.
- [ ] Docker-ise the application.
- [ ] Add Updated the status of an issue route
- [ ] Add Delete routes
- [ ] Add Get all comments route
- [ ] Add Get all comments for an author route
- [ ] Start working on your frontend.
- [ ] Add in due dates.
- [ ] Start unit testing.
- [ ] Add in issue linking (blocking, blocks, relates to, etc).
- [ ] Add Watchers of an issue (who wants updates on the status of issues/projects).

## Author Info
Created by [Alessandro Siqueira](alessandro_m_s@hotmail.com) - feel free to contact me!

LinkedIn: [Click Me!](https://www.linkedin.com/in/alessandro-siqueira-b0a90754/)

Email: [alessandro_m_s@hotmail.com](alessandro_m_s@hotmail.com)
