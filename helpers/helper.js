const axios = require('axios');
const multer  = require('multer')
const hbs = require('hbs');

// Cálculo del dolar
let dolar;
let dolarPAIS;
axios.get('https://www.dolarsi.com/api/api.php?type=valoresprincipales')
    .then( function(respuesta) {
        dolar = respuesta.data[0].casa.venta // "130,13"
        dolar = dolar.replace(/,/g, ".")
        dolar = parseFloat(dolar)
    })
    .then( function() {
        const impuestoPAIS = 0.30;
        const percepcionAFIP = 0.45;
        dolarPAIS = (dolar * impuestoPAIS) + (dolar * percepcionAFIP) + dolar
        return dolarPAIS
    })
    .catch(function() {
        // manejamos el error
        console.log("error Axios", error)
    })



hbs.registerHelper("dolarApeso", function(precio) {
    let precioFinalARS = dolarPAIS * precio
    return new Intl.NumberFormat("es-AR", {style: "currency", currency: "ARS"}).format(precioFinalARS)
})

hbs.registerHelper("listado", function(texto) {

    
    let array = texto.split(",")
    html = "<ul>"

    for (let item of array) {
        html = `${html} <li>${item}</li>`
        // console.log(html)
    }

    return html + "</ul>"
})

// FUNCION: subida de imagen
var storage = multer.diskStorage({
	destination:  (req, file, cb) => {
		cb(null, './public/uploads/')
	},
	filename:  (req, file, cb) => {
		console.log("OBJETO FILE", file)
		let fileExtension = file.originalname.split('.')[1] 
        let nombreArchivo = file.originalname.split('.')[0] 
		cb(null, nombreArchivo + '-' + Date.now() + "." + fileExtension)
	},
})

var maxSize = (1024 * 1024) * 5 // 5MB
var maxSizeMB = formatBytes(maxSize,2) 

// FUNCION: tamaño de archivo
function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// FUNCION
var upload = multer({
	storage:storage, 
	limits: {
        fileSize: maxSize 
    },  
	fileFilter: (req, file, cb) => {
		if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || 	file.mimetype == "image/jpeg") {
			cb(null, true);
		} else {
			cb(null, false);
			return cb(new Error('Sólo los formatos .png .png, .jpg y .jpeg son los permitidos'));
        
		}
	}
}).single("rutaImagen")

module.exports = {
    upload,
    maxSizeMB,
    multer
}