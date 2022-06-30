let nodemailer = require('nodemailer');
const datos = require('../productos.json')
const { Router } = require('express')
const router = Router()

// === FRONT ====
// ruta raíz
router.get('/', function (req, res) {
    //console.log(datos[0].data)
    res.render('index', {
        productos: datos[0].data
    })
})

// contacto
router.get('/contacto', function (req, res) {
    res.render('contacto')
})

router.post('/contacto', function(req, res) {
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

router.get('/como-comprar', function(req,res) {
    res.render('como-comprar')
})

router.get('/detalle-producto', function(req,res) {
    res.render('detalle-producto')
})

router.get('/sobre-nosotros', function(req,res) {
    res.render('sobre-nosotros')
})

// === ADMIN ===
router.get('/admin', function(req,res) {
    res.render('admin')
})

router.get('/agregar-producto', function(req,res) {
    res.render('agregar-producto')
})

router.get('/editar-producto', function(req,res) {
    res.render('editar-producto')
})

router.get('/login', function(req,res) {
    res.render('login')
})


module.exports = router