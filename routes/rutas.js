const { Router } = require('express')
const router = Router()

const { 
    inicioGET,
    contactoGET,
    contactoPOST,
    comoComprarGET,
    detalleProductoGET,
    sobreNosotrosGET
} = require('../controllers/front.ctrl')

// === FRONT ====
// ruta raíz
router.get('/', inicioGET)

// contacto
router.get('/contacto', contactoGET)

router.post('/contacto', contactoPOST)

router.get('/como-comprar', comoComprarGET)

router.get('/detalle-producto', detalleProductoGET)

router.get('/sobre-nosotros', sobreNosotrosGET)

// === ADMIN ===

const {
    adminGET,
    agregarProductoGET,
    editarProductoGET,
    loginGET
}= require('../controllers/back.ctrl')

router.get('/admin',adminGET )

router.get('/agregar-producto', agregarProductoGET)

router.get('/editar-producto', editarProductoGET)

router.get('/login', loginGET)


module.exports = router