const express = require('express');
const router = express.Router();
let alunos = require('../../tests/mocks/alunos.json');

/* GET users listing. */
router.get('/', function(_req, res, next) {
  const data = {alunos}
  res.json( data);
});

router.get('/:matricula', function(req,res,next){
  const{matricula} = req.params;
  const aluno = alunos.content[matricula];
  res.json({aluno})
})

router.post('/', function (req, res, next) {
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
