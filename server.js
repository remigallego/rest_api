const express       = require('express');
const mongodb       = require('mongodb');
const mongoose      = require('mongoose');
const morgan        = require('morgan');
const bodyparser    = require('body-parser');

const errorhandler  = require('errorhandler');

const Account = require('./models/account.js');

mongoose.connect('mongodb://localhost/test');
mongoose.Promise = global.Promise;

const app = express();

app.use(morgan('dev'));
app.listen(8080);
app.use(bodyparser.json());

app.get('/accounts', (req, res)=>{
  Account.find({}).then((result)=>{
    res.status(200).send(result);
  })
});

app.get('/accounts/last', (req, res)=>{
  Account.findOne().sort({ field: 'asc', _id: -1 }).limit(1).then((result)=>{
    res.send(result);
  })
});

app.post('/accounts', (req, res) => {
 Account.create({
    name: req.body.name,
    balance: req.body.balance
  })
  .then((result)=>{
      res.status(200).send(`\n___ Account ${result._id} created \n\n`);
  });
});

app.put('/accounts/:id', (req, res) => {
  Account.findByIdAndUpdate({_id: req.params.id}, {balance: req.body.balance}, (err, result) => {
    if(err) res.status(500).send(err);
    if(result === null) res.status(500).send(err);
    else {
      Account.findById({_id: req.params.id}, (err, result2) => {
        res.status(200).send(`\n___ Account ${result2._id} updated \n\n`);
      })
    }
  })
});

app.delete('/accounts/:id', (req, res)=>{
  let id = req.params.id;
  Account.deleteOne({_id: req.params.id}, (err, result)=>{
    if(err) res.status(500).send(err);
    res.status(200).send(`\n__ Account ${id} deleted \n\n`);
  });
});

app.delete('/accounts/delete/last', (req, res)=>{
  Account.findOne().sort({ field: 'asc', _id: -1 }).limit(1).then((result)=>{
    if(result === null) res.status(500).send("\n__ Empty collection\n\n");
    else {
    let id = result._id;
    Account.deleteOne({_id: id}, (err, result)=>{
      if(err) res.status(500).send(err);
      res.status(200).send(`\n__ Account ${id} deleted \n\n`);
    })
    }
  });
})
