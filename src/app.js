//requiriendo modulos
const express = require('express');
const path = require('path')

const app = express();

//importacion de rutas y controladores
const customerRoutes = require('./routes/customer.js')

//settings
var port = process.env.PORT || 9000;
app.set('views', path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: false}))

//Routes
app.use('/', customerRoutes)




app.listen(port, ()=>{
    console.log(`server connect in port ${port}`);
}) 