const conexao = require('../database/conexao');

module.exports = {

    async index(request, response) {
        const { page = 1 } = request.query;

        const [count] = await conexao('casos').count();


        const casos = await conexao('casos')
        .join('ongs', 'ongs.id', '=', 'casos.ong_id')
        .limit(5)
        .offset((page - 1) * 5)
        .select([
         'casos.*', 
         'ongs.name',
         'ongs.email',
         'ongs.whatsapp',
         'ongs.city',
         'ongs.uf'
        ]);

        response.header('X-Total-Count', count['count(*)']);

        return response.json(casos);
    },

    async create(request, response) {
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization;

        const [id] = await conexao('casos').insert({
            title,
            description,
            value,
            ong_id,
        });
        
        return response.json({ id });
    },

    async delete(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const caso = await conexao('casos')
        .where('id', id)
        .select('ong_id')
        .first();

    if (caso.ong_id != ong_id){
        return response.status(401).json({ error: 'Operation not permited.'});
    }

    await conexao('casos').where('id', id).delete();

    return response.status(204).send();
    }

};