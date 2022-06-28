class Container {
    constructor (array) {
        this.array = array;
        this.id = 1;
    }    

    save(element) {
        console.log("long del array", this.array.length)
        element['id'] = this.array.length + 1;
        const newId = this.array.push(element);
        console.log("item entero", this.array);
    }
    

    //Agregué este método para complementar el put por id
    async replaceById(id, data) {
        try {
            //const content = await fs.promises.readFile(this.fileName, 'utf-8');
            //const contentParse = JSON.parse(content);
            data["id"] = id;
            this.array[id-1] = data;
            try {
                await console.log("escritura exitosa", this.array);
            }
            catch (error) {
                console.log("el error al escribir fue: ", error);
            }
            return this.array[id-1];
        }
        catch (error) {
            console.log("error al leer (en Save): ", error);
        }
    }

    async getById(id) {
        try {
           //const content = await fs.promises.readFile(this.fileName, 'utf-8');
           // const contentParse = JSON.parse(content);
           console.log(this.array)
            const objectFinded = this.array.find((obj) => obj.id === id);
            console.log("encontrado en getbyid", objectFinded)
            if (objectFinded) {
                return objectFinded;
            } else {
                return null;
            }
        }
        catch (error) {
            console.log("error al buscar por id: ", error);
        }
    }

    async getAll() {
        console.log(this.array)
        return this.array;
    }

    async deleteById(id) {
        try {
            //const content = await fs.promises.readFile(this.fileName, 'utf-8');
            //const contentParse = JSON.parse(content);
            const idFind = this.array.find((elem) => elem.id === id);            
            if (!idFind) console.log("error: ese carrito no existe")
            else {
                const arrayModif = this.array.filter((elem) => elem.id !== id)
                return arrayModif;
            }
        }
        catch (error) {
            console.log("error al leer (en deleteById): ", error);
        }
    }
}


//Para chequear si existen los archivos

/* if (!array) array = []; */
/* console.log(array) */

module.exports = Container;

