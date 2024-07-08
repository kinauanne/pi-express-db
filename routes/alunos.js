var express = require('express');
var router = express.Router();
let alunos = require('../tests/mocks/alunos.json');
router.get('/', function(req, res, next) {
    const data = {
        title: 'Alunos',
        alunos: alunos.content
    }
    res.render('all_students',data);
});
router.get('/new', function(req, res, next) {
    parametro = "create"
    const data= {metodo:"POST",parametro, title: 'Novo Aluno',buttonText:'Adicionar Aluno'}
    res.render('form',data);
});
router.post('/', function (req, res, next) {
    const{body,method} = req
    res.send({body,method});
});
router.post('/create',function(req,res,next){
    let novoAluno = req.body
    let matricula = novoAluno.matricula
    alunos.content[matricula] = {
        ...novoAluno,
        matricula:Number(matricula)
    }
    res.redirect('/alunos')
})
router.get('/:matricula', function(req,res,next){
    const{matricula} = req.params;
    const aluno = alunos.content[matricula];
    res.render('details_student',{title:'Detalhes do Aluno',aluno})
})
router.get('/edit/:matricula', function(req, res, next) {
    const{matricula} = req.params;
    const aluno = alunos.content[matricula];
    const parametro = matricula;
    res.render('form',{metodo: "PUT",parametro, title: 'Editar Aluno',buttonText:'Salvar Alterações',aluno});
});
router.put('/:matricula', function (req, res, next) {
    // const{body,method} = req
    const {matricula} = req.params;
    const novoAluno = req.body;
    alunos.content[matricula] = {
        ...novoAluno,
        matricula:Number(matricula)};
    res.redirect('/alunos')
    // res.send({body,method,msg:'Alterar o aluno'} );
});
router.delete('/', function (req, res, next) {
    const{body,method} = req
    res.send({body,method,msg:'Vai remover aluno'});
});
module.exports = router;