const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Crear esquema y modelo usuario
const VenueSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Campo nombre es requerido']
    },
    country: {
        type: String,
        required: [true, 'Campo pais es requerido']
    },
    city: {
        type: String,
        required: [true, 'Campo ciudad es requerido']
    },
    address: {
        type: String, 
        required: [true, 'Campo direcciòn es requerido']
    },
    postal_code: {
        type: String, 
        required: [true, 'Campo código postal es requerido']
    },
    floors: {
        type: Number, 
        required: [true, 'Campo número de pisos es requerido']
    },
    sections: {
        type: Number, 
        required: [true, 'Campo número de secciones es requerido']
    }
    
});

module.exports = Venue = mongoose.model('venue', VenueSchema);