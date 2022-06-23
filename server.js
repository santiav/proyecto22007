const express = require('express')
const app = express()
const hbs = require('hbs')
const datos = require('./productos.json')

app.set('view engine', 'hbs');

// ruta raíz
app.get('/', function (req, res) {
    //console.log(datos[0].data)
    res.render('index', {
        productos: datos[0].data
    })
})

// contacto
app.get('/contacto', function (req, res) {
    res.render('contacto')
})

app.listen(3000, function () {
    console.log("El servidor está online en puerto 3000")
})