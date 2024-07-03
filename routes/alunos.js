const express = require('express');
const router = express.Router();
let alunos = require('../tests/mocks/alunos.json');

/* GET users listing. */
router.get('/', function(_req, res, next) {
  const data = {
    title: 'Alunos',
    alunos: alunos.content
  }
  res.render('list', data);
});

router.get('/new', function (_req, res, next) {
  res.render('form', { title: ' Novo aluno', buttonText: 'Adicionar'});
});

router.get('/:matricula', function (req, res, next) {
  const { matricula } = req.params;

  const aluno = alunos.content[matricula];

  res.render('card', { title: 'Detalhes do aluno', aluno});
});

module.exports = router;
