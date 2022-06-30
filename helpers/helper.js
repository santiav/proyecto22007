const axios = require('axios');
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
        const percepcionAFIP = 0.35;
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