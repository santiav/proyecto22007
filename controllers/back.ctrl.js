


const adminGET = function(req,res) {
    res.render('admin')
}

const agregarProductoGET = function(req,res) {
    res.render('agregar-producto')
}

const editarProductoGET = function(req,res) {
    res.render('editar-producto')
}

const loginGET = function(req,res) {
    res.render('login')
}

module.exports = {
    adminGET,
    agregarProductoGET,
    editarProductoGET,
    loginGET
}