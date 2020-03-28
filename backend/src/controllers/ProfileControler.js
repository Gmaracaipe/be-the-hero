const conexao = require('../database/conexao');

module.exports = {
    async index(request, response){
        const ong_id = request.headers.authorization;

        const casos =  await conexao('casos')
        .where('ong_id', ong_id)
        .select('*');

        return response.json(casos);
    }
}