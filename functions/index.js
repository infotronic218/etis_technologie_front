const functions = require('firebase-functions');
const $ = require('jquery');

exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
});

exports.restart = functions.https.onRequest((req, res) => {
    setInterval(() => {
        $.get('https://etis-technologies.herokuapp.com/api/pcategories').then((data) => {
            console.log(data);
            return true
        }).catch(error => {
            console.log(error);
            return false;
        })
    }, 18000000)
    res.send("Hello my friend")
});