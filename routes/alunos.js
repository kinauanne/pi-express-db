const { localApi } = require('../config/config_axios')
const express = require('express');
const router = express.Router();
const path = require('path');
const { title } = require('process');

/* GET users listing. */
router.get('/', async function(_req, res, next) {
  try {
    const resposta = await localApi.get('/api/v1/alunos');
    // consele.log
    const alunos = resposta.data;
    const viewData = { title: 'Alunos', alunos };
    res.status(200).render('list', viewData);
  } catch (error) {
    res.json({msg: error.message})
  }
});

router.get('/new', async function (_req, res, next) {
//  const viewData{
//    metodo: ""
//  }
  const parametro = "create";
  const data = { metodo: "post", parametro, title: 'Novo aluno', buttonText: "adicionar"}
  res.render('form', data);
});

router.get('/:matricula', async function(req,res,next){
  const matricula = req.params.matricula;
  try {
    let response = await localApi.get('/api/v1/alunos/' + matricula)
//    console.log(response)
    let aluno = response.data;
    let viewData = {aluno, title: 'detalhes do aluno'}

    res.status(200).render('card', viewData);
  } catch (error) {
    res.json({msg: error.message})
  }
})

router.get('/edit/:matricula', async function (req, res, next) {
  const matricula = req.params.matricula;
  const apiUrlPath = '/api/v1/alunos/' + matricula;
  parametro = matricula
  const viewData = { metodo: "post", parametro, title: 'Editar aluno', buttonText: "atualizar"}

  try {
    const resposta = await localApi.get(apiUrlPath);
    const aluno = resposta.data;
    viewData.aluno = aluno;

    res.status(200).render('form', viewData);
  } catch (error) {
    res.json({msg: error.message})
  }

});

router.post('/create', async function (req, res, next) {
  let novoAluno = req.body;
  try {
    const response = await localApi.post("alunos", novoAluno)
  } catch (error) {
    console.error(error.message)
  }
});

router.put('/:matricula', async function (req, res, next) {
  const matricula = req.params.matricula;
  const apiUrlPath = '/api/v1/alunos/' + matricula;
  const data = req.body;
  try {
    await localApi.put(apiUrlPath, data);
  } catch (error) {
    console.error(error.message)
  } finally {
    res.redirect('/alunos/' + matricula)
  }
  
  // res.send({body,method,msg:'Alterar o aluno'} );
});

router.delete('/:matricula', function (req, res, next) {
  const matricula = req.params.matricula;
  delete alunos.content[matricula]
  res.redirect(303, '/alunos')
});

module.exports = router;
