const id = Symbol('id')
var persona = {}
persona[id] = 18
persona.nombre = "Diego"
persona.apellido = "Sandoval"
persona['edad'] = 28
// console.log(persona[id])

var llaves = Object.keys(persona)
var valores = Object.values(persona)
var atributos = Object.entries(persona)
var simbolos = Object.getOwnPropertySymbols(persona)

// console.log(persona);
// console.log("Llaves", llaves);
// console.log("Valores", valores);
// console.log("Atributos", atributos);
// console.log("Simbolos", simbolos);
// console.log(persona[simbolos[0]])

// console.log("--------------------------------------------");
// for (const key of atributos) {
//     console.log(key[0]," - ",key[1])
// }

// Objeto con valores
var vehiculo = { 
    patente: 'ABFF12',
    marca: 'Chevrolet',
    modelo: 'Camaro',
    anio: 2023
}


// console.log("Vehículo", vehiculo);

//Objeto Proxy (Intermediario)
var proxyVehiculo = new Proxy(vehiculo, 
    {
        //Get nos permite obtener el valor de cualquier propiedad
        get: function(target, property){
            if(typeof target[property] == 'string'){
                return target[property].toUpperCase()
            } else {
                return target[property]
            }
        },
        //Set nos permite modificar el valor de cualquier propiedad
        set: function(target, property, value) {
            if(property == 'anio' && typeof value !== 'number') {
                return target[property] = null
            } else if(typeof value == 'string'){
                return target[property] = value.toLowerCase()
            } else {
                return target[property] = value
            }
            
        }
    }
)

proxyVehiculo.anio = "2023"
proxyVehiculo.modelo = "OpTrA"

// console.log("Proxy Vehículo - Marca", proxyVehiculo.marca);
// console.log("Proxy Vehículo - Año", proxyVehiculo.anio);

// console.log(proxyVehiculo);




//*********************************************************** Segunda Parte Viernes 05/05/2023 */
var equipo1 = {
    marca: "IBM",
    modelo: "R400",
    ram: 8,
    disco: 240,
    tipo: 'HDD'
}

var equipo2 = {
    marca: "Asus",
    modelo: "A15",
    ram: 32,
    disco: 500,
    tipo: 'SSD'
}


var proxyEquipo1 = new Proxy(equipo1, {
    get: function(objeto, propiedad) {
        if(propiedad == 'tipo') {
            return objeto[propiedad].toUpperCase()
        } else {
            return objeto[propiedad]
        }
    },
    set: function(objeto, propiedad, nuevo_valor) {
        switch (propiedad) {
            case "ram":
                if(nuevo_valor != 8 && nuevo_valor != 16 && nuevo_valor != 32) {
                    throw "El valor de la RAM debe ser 8, 16 o 32"
                }
            break;

            case "disco":
                if(nuevo_valor != 120 && nuevo_valor != 240 && nuevo_valor != 500) {
                    throw "El valor de Disco debe ser 120, 240 o 500"
                }
            break;

            case "tipo":
                if(nuevo_valor.toUpperCase() != "SSD" && nuevo_valor.toUpperCase() != "HDD") {
                    throw "El valor de tipo debe ser SSD o HDD"
                }
            break;
        
            default:
            break;
        }
        objeto[propiedad] = nuevo_valor
    }
})

try {
    proxyEquipo1.ram = 16
    proxyEquipo1.disco = 500
    proxyEquipo1.tipo = "hdd"
    console.log(proxyEquipo1);
    console.log(proxyEquipo1.tipo);

    console.log("Reflect Has - disco", Reflect.has(proxyEquipo1, 'disco'));
    console.log("Reflect Has - procesador", Reflect.has(proxyEquipo1, 'procesador'));

    console.log("Reflect Get - disco", Reflect.get(proxyEquipo1, 'disco'));
    console.log("Reflect Get - procesador", Reflect.get(proxyEquipo1, 'procesador'));

    console.log("Reflect ownKeys", Reflect.ownKeys(proxyEquipo1))

    Reflect.deleteProperty(proxyEquipo1, 'tipo')
    console.log("Reflect deleteProperty",proxyEquipo1);


} catch (error) {
    console.log(error);
}

