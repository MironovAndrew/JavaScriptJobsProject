var express = require('express');
var router = express.Router();
const { blogs } = require('../models');
const { Compunies, Customers, Comment } = require('../models');

router.get('/', async function (req, res, next) {
  let CustomersList = await Customers.findAll();
  res.render('index', { CustomersList });
});

router.get('/index.html', async function (req, res, next) {
  let CustomersList = await Customers.findAll();
  res.render('index', { CustomersList });
});

router.get('/blog.html', async function (req, res, next) {
  let blogList = await blogs.findAll();
  res.render('blog', { blogList });
});

router.get('/candidate.html', function (req, res, next) {
  res.render('candidate');
});

router.get('/contact.html', function (req, res, next) {
  res.render('contact');
});

router.get('/elements.html', function (req, res, next) {
  res.render('elements');
});

router.get('/job_details.html/:id', async function (req, res, next) {
  let compuny = await Compunies.findByPk(req.params.id, {
    include: [
      {
        model: Comment,
        as: 'comments',
        attributes: ['id', 'text', 'CustomerId'],
        // include: [
        //   {
        //     model: Customers,
        //     as: 'Customers',
        //     attributes: ['id', 'FirstName', 'SecondName'],
        //   },
        // ],
      },
    ],
  });
  if (!compuny) {
    res.redirect('/jobs.html');
  }

  const customers = {};
  for (const { CustomerId } of compuny.comments) {
    const customer = await Customers.findByPk(CustomerId);
    // compuny.comments[index].Customers = 1;
    // console.log(111, compuny.comments[index].id);
    customers[CustomerId] = customer;
  }

  res.render('job_details', {
    compuny,
    customers,
    CompuniesList: [],
    CompunyId: req.params.id,
  });
});

router.get('/jobs.html', async function (req, res, next) {
  let CompuniesList = await Compunies.findAll();
  res.render('jobs', { CompuniesList });
});

router.get('/main.html', function (req, res, next) {
  res.render('main');
});

router.get('/single-blog.html', function (req, res, next) {
  res.render('single-blog');
});

router.post('/add-comment', async function (req, res) {
  const { FirstName, SecondName, message, CompunyId } = req.body;
  const expectedUser = await Customers.findOne({
    where: { FirstName },
  });
  let CustomerId = expectedUser?.id;
  if (!expectedUser) {
    ({ id: CustomerId } = await Customers.create({
      FirstName,
      SecondName,
      Address: 'Россия',
    }));
  }

  await Comment.create({
    text: message,
    CustomerId: Number(CustomerId),
    CompunyId: Number(CompunyId),
  });

  res.redirect(`/job_details.html/${CompunyId}`);
});

module.exports = router;
