class Container {

    array = [];

    save(element) {
        element['id'] = this.array.length + 1;
        const newId = this.array.push(element);
        return element.id;
    }

    //Agregué este método para complementar el put por id
    replaceById(id, data) {
        data["id"] = id;
        this.array[id-1] = data;
        return this.array[id-1];
    }

    getById(id) {
        const objectFinded = this.array.find((obj) => obj.id === id);
        if (objectFinded) return objectFinded;
        else return null;
    }

    getAll() {
        return this.array;
    }

    deleteById(id) {
        const idFind = this.array.find((elem) => elem.id === id);            
        if (!idFind) console.log("error: ese item no existe");
        else {
            const arrayModif = this.array.filter((elem) => elem.id !== id);
            this.array = arrayModif;
            return this.array;
        }
    }
}

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

const arrayProducts = new Products();
const arrayCarts = new Carts();

module.exports = { Container, arrayProducts, arrayCarts };
