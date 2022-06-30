const express = require('express')
const app = express()
const hbs = require('hbs')
let nodemailer = require('nodemailer');

require('./helpers/helper');
const datos = require('./productos.json')


// Para que tome los datos de los formularios
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

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

app.post('/contacto', function(req, res) {
    // 1. Definir el transportador
    let transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "9e67f1cd60d6f3",
          pass: "086c522eabf980"
        }
    });
    // 2. Definimos el cuerpo de mail
    console.log("BODY: ", req.body)
    let data = req.body
    let mailOptions = {
        from: data.nombre,
        to: 'santiago.acosta@bue.edu.ar',
        subject: data.asunto,
        html: `
            <h2>El siguiente mensaje ha llegado de la web</h2>
            <p>${data.mensaje}</p>
        `
    }
    // 3. Enviamos el mail
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error)
            res.status(500, error.message)
            res.status(500).render('contacto', {
                mensaje: `Ha ocurrido el siguiente error: ${error.message}`,
                mostrar: true,
                clase: 'danger'

            })
        } else {
            console.log("E-mail enviado")
            res.status(200).render('contacto', {
                mensaje: `Tu e-mail ha sido enviado correctamente`,
                mostrar: true,
                clase: 'success'
            })
        }
    })
})


app.listen(3000, function () {
    console.log("El servidor está online en puerto 3000")
})