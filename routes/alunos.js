const express = require('express');
const router = express.Router();
let alunos = require('../tests/mocks/alunos.json');

/* GET users listing. */
router.get('/', function(req, res, next) {
  const data = {
    title: 'Alunos',
    alunos: alunos.content
  }
  res.render('list', data);
});

module.exports = router;

router.get('/:matricula', function (req, res, next) {
  const { matricula } = req.params;

  const aluno = alunos.content[matricula];

  res.render('card', { title: 'Detalhes do aluno', aluno})
});
