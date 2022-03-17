# Interactive MERN Stack-TUTOR CENTRAL

## Description

This project test our collaborative skills and coding abilities, especially in the context of a scalable, user-focused MERN app. It is an app that connects tutors and students.

## Concept

A marketplace for tutors and students to connect. 
Sometimes you just need an hour of support with a trusted tutor to solve a challenge. Our marketplace allows you to make that connection quickly and easily. 
As a Student I want to be able to search for Tutors that are experts in the subject for which I need help and coordinate time with them to resolve my question for a reasonable fee. 
As a Tutor I want to be able to present my skills and past tutoring in an attractive marketplace where Students can find me and connect easily so that I can provide support to them.

## Requirements

    Use React for the front end.
    Use GraphQL with a Node.js and Express.js server.
    Use MongoDB and the Mongoose ODM for the database.
    Use queries and mutations for retrieving, adding, updating, and deleting data.
    Be deployed using Heroku (with data).
    Have a polished UI.
    Be responsive.
    Be interactive (i.e., accept and respond to user input).
    Include authentication (JWT).
    Protect sensitive API key information on the server.
    Have a clean repository that meets quality coding standards (file structure, naming conventions, best practices for class and id naming conventions,     indentation, quality comments, etc.).
    Have a high-quality README (with unique name, description, technologies used, screenshot, and link to deployed application).

## Tools and Technologies

This app use **React, React Dom, MongoDB, GraphQL, Apollo, Stripe, Bootstrap, JWT**

## Usage
1. Clone the *project repository* and *cd <project>* on your terminal and run *npm install* to download all dependencies for the project.
2.Run *npm run develop* to open the the app in the browser
3. If you want to test the graphql in the backend, navigate into *localhost:3001/graphql* or you can open it from Insomia, postman or MYSQL workbench.
    Example query
        query user($username: String!) {
        user(username: $username) {
         _id
         username
         email
       }
     }
    
 And it will return you a data or user with generated id. 
 3. You need to create a *.env* file to keep all protected information like **API KEY, JWT TOKEN SECRET and AWS Database Key** .
 4. You can run the Front End alone by running *cd client* then *npm start*.
 5. The same with the server or Backend, run *cd server* then *npm start* and navigate into localhost:3001/graphql from browser, insomia or postman.
    
## Deployed application

[The Live Site](https://tutor-central.herokuapp.com/)

[Github Repository](https://github.com/ALMA-DEV914/tutor-central-mern/)
## Snapshots

<img width="1792" alt="Screen Shot 2022-03-06 at 4 15 45 PM" src="https://user-images.githubusercontent.com/65073138/156949167-119dffe4-bca4-46f8-931b-9a70b908e81f.png">

<img width="1788" alt="Screen Shot 2022-03-06 at 4 16 47 PM" src="https://user-images.githubusercontent.com/65073138/156949175-5048f9c8-8545-4493-9c33-ac2e8bb253a8.png">

### Questions

For questions and inquiries  
Tom Bellenger [email](mailto:tbellenger@gmail.com)  
Alma Braun [email](mailto:aungonalna58@gmail.com)  
Tarek Youssef [email](mailto:tmyous04@gmail.com)  
We are happy to serve you.
