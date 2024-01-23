//1) import dotenv
//Loads .env file contents into process.env by default.

require('dotenv').config()
//2) import express

const express= require('express')

//3) import cors

const cors= require('cors')

//import router
const router= require('./Routers/router')

//import connection.js file
require('./DB/connections')

//import application specific middleware
/*const appMiddleware=require('./Middleware/appMiddleware')*/
//4) create server 

const pfServer= express()

//5 use of cors in server
pfServer.use(cors())

//6) Returns middleware that only parses json- javascript object
pfServer.use(express.json())
/*pfServer.use(appMiddleware)*/

//use of router by server
pfServer.use(router)

//server use uploads folder
//first arg- the way in which other applications should juse this folder
//second arg- export that folder- express.static
pfServer.use('/uploads',express.static('./uploads'))
//7) customize the port- by default-3000
const PORT= 4000 || process.env

//8) to run server
pfServer.listen(PORT,()=>{
    console.log(`SERVER RUNNING SUCCESSFULLY AT PORT NUMBER ${PORT}`);
})
//get request
pfServer.get('/',(req, res)=>{
res.send(`<h1 style="color:green">project fair server running successfully and ready to accept requests from client</h1>`)
})

/*//post request
pfServer.post('/',(req, res)=>{
    res.send(`post request`)
    })

//put request    
pfServer.put('/',(req, res)=>{
    res.send(`put request`)
    })/*/ 