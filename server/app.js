const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = 5000
const { MONGOURI } = require('./keys')
const fileUpload = require('express-fileupload')

mongoose.connect(MONGOURI,{
    useFindAndModify: false,
    useNewUrlParser:true,
    useUnifiedTopology:true
})


mongoose.connection.on('connected',()=>{
    console.log("successfully connected to the database")
})
mongoose.connection.on('error',(error)=>{
    console.log("There was an error while connecting to the database: ",error)
})


require('./models/operator')
require('./models/patient')
require('./models/donor')

app.use(express.json())
app.use(fileUpload())
app.use(require('./routes/auth'))
app.use(require('./routes/profile'))


app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
})