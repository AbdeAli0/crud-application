const express = require("express");
const axios = require("axios");
const route = express.Router();
const controller = require('../controller/controller')

route.get('/',(req,res) => {
    //Make an api call to /api/users
    axios.get('http://localhost:3000/api/users/')
    .then(function(response){
        res.render('index',{users:response.data});
    })
    .catch(err =>{
        res.send(err);
    })
})

route.get('/add-user',(req,res) => {
    res.render('add_user');
})

route.get('/update-user',(req,res) => {
    axios.get('http://localhost:3000/api/users/',{ params: {id:req.query.id} })
    .then(function(userData){
        res.render('update_user',{ user: userData.data });
    })
    .catch(err => {
        res.send(err);
    })
})

//API
route.post('/api/users',controller.create);
route.get('/api/users',controller.find);
route.put('/api/users/:id',controller.update);
route.delete('/api/users/:id',controller.delete);

module.exports = route;