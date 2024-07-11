const { localApi } = require('../config/config_axios')
const express = require('express');
const router = express.Router();
let alunos = require('../tests/mocks/alunos.json');

/* GET users listing. */
router.get('/', async function(_req, res, next) {
  try {
    const response = await localApi.get('/api/v1/alunos');
    const alunos = response.data.content;
    const data = { title: 'Alunos', alunos };
    res.status(200).render('list', data);
  } catch (error) {
    res.json({msg: error.message})
  }
});

router.get('/new', function (_req, res, next) {
  const { heads: labels } = alunos
  const parametro = "create";
  const data = { metodo: "post", parametro, title: 'Novo aluno', buttonText: "adicionar"}
  res.render('form', data);
});

router.get('/:matricula', function(req,res,next){
  const{matricula} = req.params;
  const aluno = alunos.content[matricula];
  res.render('card',{title:'Detalhes do Aluno',aluno})
})

router.get('/edit/:matricula', function (req, res, next) {
  const { matricula } = req.params;
  const parametro = matricula;
  const aluno = alunos.content[matricula];

  res.render('form', {metodo: "put", parametro, title: ' Editar aluno', buttonText: 'Salvar alterações', aluno});
});

router.post('/create', function (req, res, next) {
  let novoAluno = req.body;
  let matricula = novoAluno.matricula;

  alunos.content[matricula] = {
    ...novoAluno,
    matricula: Number(matricula)
  }
  res.redirect('/alunos');
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

router.delete('/:matricula', function (req, res, next) {
  const matricula = req.params.matricula;
  delete alunos.content[matricula]
  res.redirect(303, '/alunos')
});

module.exports = router;
