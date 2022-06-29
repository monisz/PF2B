class Container {

    array = [];

    //constructor (array) {
      //  this.array = array;
        //this.id = 1;
    //}    

    save(element) {
        console.log("long del array", this.array.length)
        element['id'] = this.array.length + 1;
        const newId = this.array.push(element);
        console.log("item entero", this.array);
        return element.id;
    }
    

    //Agregué este método para complementar el put por id
    replaceById(id, data) {
        console.log("en replacebyid, id y elem entero", id, data)
        data["id"] = id;
        this.array[id-1] = data;
        return this.array[id-1];
    }

    getById(id) {
        console.log("array al entrar en getbyid", this.array)
        const objectFinded = this.array.find((obj) => obj.id === id);
        console.log("encontrado en getbyid", objectFinded)
        if (objectFinded) {
            return objectFinded;
        } else {
            return null;
        }
    }

    getAll() {
        console.log(this.array)
        return this.array;
    }

    deleteById(id) {
        const idFind = this.array.find((elem) => elem.id === id);            
        if (!idFind) console.log("error: ese carrito no existe")
        else {
            const arrayModif = this.array.filter((elem) => elem.id !== id)
            return arrayModif;
        }
    }
}


//Para chequear si existen los archivos

/* if (!array) array = []; */
/* console.log(array) */

class Carts extends Container {
    constructor() {
        super();
    }
}
class Products extends Container {
    constructor() {
        super();
    }
}


module.exports = Carts;
module.exports = Products;

