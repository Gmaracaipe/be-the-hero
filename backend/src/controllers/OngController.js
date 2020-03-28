const crypto = require('crypto');
const conexao = require('../database/conexao');

module.exports = {

    async index(request, response) {
        const ongs = await conexao('ongs').select('*');
    
        return response.json(ongs);
    },

    async create(request, response) {
        const { name, email, whatsapp, city, uf } = request.body;

    const id = crypto.randomBytes(4).toString('HEX');
    
    await conexao('ongs').insert({
        id,
        name,
        email,
        whatsapp,
        city,
        uf,
    })

    return response.json({ id });
        

    }
}