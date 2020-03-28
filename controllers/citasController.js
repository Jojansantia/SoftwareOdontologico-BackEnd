const Citas = require('../models/Citas');
// const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
// const jwt = require('jsonwebtoken');

exports.crearCitas = async (req,res) => {

    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }

    const { fecha } = req.body;

    try {

        let citas = await Citas.findOne({ fecha });

        if (citas) {
            return res.status(400).json({ msg: 'La cita ya existe'});
        }

        citas = new Citas(req.body);

        await citas.save();

        res.status(400).json({ msg: "Cita creada correctamente"})
        
    } catch (error) {
        res.status(400).json({ msg: "Error al insertar cita"})
    }

}