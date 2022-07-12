
let nodemailer = require('nodemailer');
let db = require('../db')

const inicioGET = function (req, res) {


    /* console.log("antes", req.session.contador)

    req.session.contador = req.session.contador ? req.session.contador + 1 : 1;

    console.log("despues", req.session.contador)
    console.log(req.session)

    res.send(`visita nro ${req.session.contador}`) */
   
    let sql = "SELECT * FROM productos"
    db.query(sql, function(error, data) {
        if (error) res.send(`Ocurrió un error ${error.code}`)
        res.render('index', {
            titulo: "Mi emprendimiento",
            logueado: req.session.logueado,
            usuario: req.session.usuario,
            productos: data
        })
    })
    


}

const contactoGET = function (req, res) {
    res.render('contacto', {
        titulo: "Contacto",
        logueado: req.session.logueado,
        usuario: req.session.usuario,
    })
}

const contactoPOST = function(req, res) {
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
}

const comoComprarGET = function(req,res) {
    res.render('como-comprar', {
        titulo: "Cómo comprar",
        logueado: req.session.logueado,
        usuario: req.session.usuario,
    })
}

const detalleProductoGET_ID =  function(req,res) {
    let id = req.params.id

    let sql = "SELECT * FROM productos WHERE id = ?"
    db.query(sql, id, function(err, data) {
      
        if (err) res.send(`Ocurrió un error ${err.code}`);

        if (data == "") {
            res.status(404).render("404", {
                titulo: "404 - Página no encontrada",
                mensaje: `Producto con ID ${id} no existe`
            })
        } else {
            res.render('detalle-producto', {
                titulo: `Detalle del producto ${data[0].nombre}`,
                producto: data[0],
                logueado: req.session.logueado,
                usuario: req.session.usuario,
            })
        }
    })
    
}

const sobreNosotrosGET = function(req,res) {
    res.render('sobre-nosotros', {
        titulo: "Sobre nosotros",
        logueado: req.session.logueado,
        usuario: req.session.usuario,
    })
}

module.exports = {
    inicioGET,
    contactoGET,
    contactoPOST,
    comoComprarGET,
    detalleProductoGET_ID,
    sobreNosotrosGET
}