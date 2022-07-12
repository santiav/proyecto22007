const { Router } = require('express')
const router = Router()

const { 
    inicioGET,
    contactoGET,
    contactoPOST,
    comoComprarGET,
    detalleProductoGET_ID,
    sobreNosotrosGET
} = require('../controllers/front.ctrl')

// === FRONT ====
// ruta raíz
router.get('/', inicioGET)

// contacto
router.get('/contacto', contactoGET)

router.post('/contacto', contactoPOST)

router.get('/como-comprar', comoComprarGET)

router.get('/detalle-producto/:id', detalleProductoGET_ID)

router.get('/sobre-nosotros', sobreNosotrosGET)

// === ADMIN ===

const {
    adminGET,
    agregarProductoGET,
    agregarProductoPOST,
    editarProductoGET,
    editarProductoPOST,
    borrarGET,
    loginGET,
    loginPOST,
    logout
}= require('../controllers/back.ctrl')

router.get('/admin',adminGET )

router.get('/agregar-producto', agregarProductoGET)
router.post('/agregar-producto', agregarProductoPOST)

router.get('/editar/:id', editarProductoGET)
router.post('/editar/:id', editarProductoPOST)
router.get('/borrar/:id', borrarGET)
router.get('/login', loginGET)
router.post('/login', loginPOST)
router.get("/logout", logout)

module.exports = router