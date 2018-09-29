const express = require ('express');
const path = require('path');
const routeur = express.Router();
const mongoose = require ('mongoose');
const { body, validationResult } = require('express-validator/check');
const auth = require('http-auth');

const Registration = mongoose.model('Registration');
const basic = auth.basic({
  file: path.join(__dirname, '../users.htpasswd'),
});


routeur.get ('/', (req, res) => {
    res.render ('form.pug',{title:'Formulaire inscription'});
  });

  routeur.post ('/',
  [
    body('name')
      .isLength({ min: 1 })
      .withMessage('Sil vous plait entrer votre nom'),
    body('password')
      .isLength({ min: 1 })
      .withMessage('Sil vous plait entrer votre mot de passe'),
    ]
    ,(req, res) => {const errors = validationResult (req);

        if (errors.isEmpty()) {
            const registration = new Registration(req.body);
            registration.save()
              .then(() => { res.send('Thank you for your registration!'); })
              .catch(() => { res.send('Sorry! Something went wrong.'); });
          } else {
            res.render('form', {
              title: 'Registration form',
              errors: errors.array(),
              data: req.body,
            });
          }
});

routeur.get('/registrations',auth.connect(basic), (req, res) => {
    Registration.find()
      .then((registrations) => {
        res.render('index', { title: 'Listing registrations', registrations });
      })
      .catch(() => { res.send('Sorry! Something went wrong.'); });
  });

module.exports = routeur;