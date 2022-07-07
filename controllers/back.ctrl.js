let db = require('../db')


const adminGET = function(req,res) {
    
    let sql = "SELECT * FROM productos"
    db.query(sql, function(err, data) {
        if (err) res.send(`Ocurrió un error ${err.code}`);

        res.render('admin', {
            titulo: "Panel de control",
            productos: data
        })
    })
}

// PRODUCTO GET
const agregarProductoGET = function(req,res) {
  res.render("agregar-producto", {
    titulo: "Agregar producto"
  })
   
}
// PRODUCTO POST
const agregarProductoPOST = function(req,res) {
    console.log("DATOS FORM -->", req.body)
    const detalleProducto = req.body

    let sql = "INSERT INTO productos SET ?"
    db.query(sql, detalleProducto, function(err, data) {
        if (err) res.send(`Ocurrió un error ${err.code}`);
        console.log("Producto agregado correctamente ")
       
    })
    res.render("agregar-producto", {
        mensaje: "Producto agregado correctamente",
        titulo: "Agregar producto"
    })
}

// EDITAR GET ID
const editarProductoGET = function(req,res) {
    
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
            res.render('editar-producto', {
                producto: data[0]
            })
        }
    })

}

// EDITAR POST ID
const editarProductoPOST = function(req, res) {
    let id = req.params.id
    let detalleProducto = req.body

    let sql = "UPDATE productos SET ? WHERE id = ?"
    db.query(sql, [detalleProducto, id], function(err, data) {
        if (err) res.send(`Ocurrió un error ${err.code}`);
        console.log(data.affectedRows + " registro actualizado");
    })

    res.redirect("/admin")

}

// BORRAR ID
const borrarGET = function(req, res) {
    let id = req.params.id

    let sql = "DELETE FROM productos WHERE id = ?"
    db.query(sql, id, function(err, data) {
        if (err) res.send(`Ocurrió un error ${err.code}`);
        console.log(data.affectedRows + " registro borrado");
    })

    res.redirect("/admin")

}

const loginGET = function(req,res) {
    res.render('login')
}

module.exports = {
    adminGET,
    agregarProductoGET,
    agregarProductoPOST,
    editarProductoGET,
    editarProductoPOST,
    borrarGET,
    loginGET
}