
const express = require('express')
const dotEnv = require('dotenv')
//const{MongoClient}= require('mongodb')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const employeeRoutes = require('./routes/employeeRoutes')


const app = express()

const PORT = process.env.PORT || 5000

dotEnv.config()
app.use(bodyParser.json())

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MONGO DB Connected Successfully")
    })
    .catch((error) => {
        console.log(`${error}`)
    })
    
//middleware
app.use('/employees', employeeRoutes)

app.listen(PORT, () => {
    console.log(`server started and running at ${PORT}`)
})
