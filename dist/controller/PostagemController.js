"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostagemController = void 0;
const api_erros_1 = require("../helpers/api-erros");
const UserRepository_1 = require("../repositories/UserRepository");
const User_1 = require("../entities/User");
class PostagemController {
    // GET
    async getPostToken(req, res) {
        const user = req.user;
        const postProfile = await UserRepository_1.postagemRepository.find({ relations: { dono_id: true }, where: { dono_id: { id: user.id } }, select: { dono_id: { id: false } } });
        const response = { user: user, postProfile: postProfile[0] ? postProfile[0] : null };
        return res.json(response);
    }
    async getpostPlayer(req, res) {
        let perPage = req.query.perPage;
        let page = req.query.page;
        const perPageNumber = parseInt(perPage);
        const pagenumber = parseInt(page);
        const tipo = Boolean(parseInt(req.params.tipo));
        const skip = (perPageNumber * pagenumber) - perPageNumber;
        let postagemResponse = [new User_1.Postagem];
        let posatgemFilter = [new User_1.Postagem];
        if (!isNaN(perPageNumber) && !isNaN(pagenumber)) {
            postagemResponse = await UserRepository_1.postagemRepository.find({ relations: { dono_id: true }, take: perPageNumber, skip: skip, where: { tipo: tipo } });
        }
        else {
            postagemResponse = await UserRepository_1.postagemRepository.find({ relations: { dono_id: true }, where: { tipo: tipo } });
        }
        // if(req.params.id){
        //   posatgemFilter = postagemResponse.filter( (x) => {  if (x.id == parseInt( req.params.id )) return x  })
        //   postagemResponse = posatgemFilter
        // }
        // if(req.query.elo){
        //   posatgemFilter = postagemResponse.filter( (x) => {  if ((x.elo)  == (req.query.elo)) return x  })
        //   postagemResponse = posatgemFilter
        // }
        // if(req.query.funcao){
        //   posatgemFilter = postagemResponse.filter( (x) => {  if (x.funcao >=  req.query.funcao ) return x  })
        //   postagemResponse = posatgemFilter
        // }
        // if(req.query.hora){
        //   posatgemFilter = postagemResponse.filter( (x) => {  if (x.hora) == (req.query.hora) ) return x  })
        //   postagemResponse = posatgemFilter
        // }
        let postCount = await UserRepository_1.postagemRepository.count();
        const response = { post: postagemResponse, limit: postCount };
        console.log(postagemResponse);
        return res.json(response);
    }
    //POST
    async createpost(req, res) {
        const id = req.user;
        // const data = new Date().getTime()
        const { descricao, jogo, funcao, elo, hora, tipo, pros } = req.body;
        if (descricao == undefined || descricao == "" ||
            jogo == undefined || jogo == "" ||
            funcao == undefined || funcao == "" ||
            elo == undefined || elo == "" ||
            hora == undefined || hora == "" ||
            tipo == undefined ||
            pros == undefined)
            throw new api_erros_1.BadRequestError('JSON invalido, Faltam Informacoes!');
        const verifique = await UserRepository_1.postagemRepository.findOneBy({ dono_id: id });
        if (verifique)
            throw new api_erros_1.BadRequestError('Postagem ja exsite!');
        const newPost = UserRepository_1.postagemRepository.create({
            descricao,
            jogo,
            funcao,
            elo,
            hora,
            tipo,
            pros,
            dono_id: id,
        });
        // newPost.hora = (`${new Date().getHours()}:${new Date().getMinutes()}`)
        // console.log(newPost);
        await UserRepository_1.postagemRepository.save(newPost);
        return res.status(201).json(newPost);
    }
    //PUT
    async updatepost(req, res) {
        const user = req.user;
        const postagem = await UserRepository_1.postagemRepository.findOne({ where: { dono_id: user } });
        if (postagem) {
            const { descricao, jogo, funcao, elo, hora, tipo, pros } = req.body;
            let response = {
                descricao,
                jogo,
                funcao,
                elo,
                hora,
                tipo,
                pros
            };
            // response.hora = (`${new Date().getHours()}:${new Date().getMinutes()}`)
            if (descricao) {
                response.descricao = Boolean((await UserRepository_1.postagemRepository.update({ id: postagem.id }, { descricao: descricao })).affected);
            }
            if (jogo) {
                response.jogo = Boolean((await UserRepository_1.postagemRepository.update({ id: postagem.id }, { jogo: jogo })).affected);
            }
            if (funcao) {
                response.funcao = Boolean((await UserRepository_1.postagemRepository.update({ id: postagem.id }, { funcao: funcao })).affected);
            }
            if (elo) {
                response.elo = Boolean((await UserRepository_1.postagemRepository.update({ id: postagem.id }, { elo: elo })).affected);
            }
            if (hora) {
                response.hora = Boolean((await UserRepository_1.postagemRepository.update({ id: postagem.id }, { hora: hora })).affected);
            }
            if (tipo) {
                response.tipo = Boolean((await UserRepository_1.postagemRepository.update({ id: postagem.id }, { tipo: tipo })).affected);
            }
            if (pros) {
                response.pros = Boolean((await UserRepository_1.postagemRepository.update({ id: postagem.id }, { pros: pros })).affected);
            }
        }
        return res.json({
            response: postagem
        });
    }
    //DELETE
    async deletePost(req, res) {
        const postUser = req.user;
        if (postUser) {
            const post = await UserRepository_1.postagemRepository.delete({ dono_id: postUser });
        }
        else {
            throw new api_erros_1.BadRequestError('!!!');
        }
        return res.json({
            response: true
        });
    }
}
exports.PostagemController = PostagemController;
