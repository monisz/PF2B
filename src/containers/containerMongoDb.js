const mongoose = require('mongoose');
const config = require('../../config');

class Container {
    constructor (collection) {
        this.collection = collection;
        this.id = 1;
    }    

    async save(element) {
        try {
            const allItems = await this.collection.find(); 
            element['id'] = allItems.length + 1;
            try {
                const elementToSave = new this.collection(element)
                await elementToSave.save();
                console.log("agregado exitoso", element.id);
            }
            catch (error) {
                console.log("el error al guardar fue: ", error);
            }
            return element.id;
        }
        catch (error) {
            console.log("error en Save): ", error);
        }
    }
    

    //Agregué este método para complementar el put por id
    async replaceById(idSearch, data) {
        try {
            await this.collection.updateOne({id: idSearch}, {$set: {
                title: data.title,
                description: data.description,
                code: data.code,
                thumbnail: data.thumbnail,
                price: data.price,
                stock: data.stock
            }})
            const result = await this.collection.find({id: idSearch})
            console.log(result)
            return result
        }
        catch (error) {
            console.log("error al reemplazar datos: ", error);
        }
    }

    async getById(idSearch) {
        try {
            const objectFinded = await this.collection.find({id: idSearch});
            if (objectFinded.length > 0) return objectFinded;
            else return null;
        }
        catch (error) {
            console.log("error al buscar por id: ", error);
        }
    }

    async getAll() {
        try {
            const allItems = await this.collection.find();
            console.log(allItems)
            return allItems;
        }
        catch (error) {
            console.log("error en getAll): ", error)
            return [];
        }
    }

    async deleteById(idSearch) {
        try {
            const result = await this.collection.deleteOne({id: idSearch});
            return result;
        }
        catch (error) {
            console.log("error en deleteById): ", error);
        }
    }
}


module.exports = Container;

