var express = require('express');
var router = express.Router();
const { OAuth2Client } = require('google-auth-library')

var path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname, './../.env')
});

const client = new OAuth2Client(process.env.GOOGLE_OAUTH2_CLIENT_ID)
console.log('kedua', process.env.GOOGLE_OAUTH2_CLIENT_ID)

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', async function(req, res){
  // console.log(req.body.idToken)
  console.log(`


ini adalah post`)
  console.log(`

req.body`, req.session)
  req.session.test = "test ajah";
  const ticket = await client.verifyIdToken({
    idToken: req.body.idToken,
    audience: process.env.GOOGLE_OAUTH2_CLIENT_ID
  })

  const payload = ticket.getPayload();
  // const userid = payload['sub']; //google id, but we can use email
  // const email = payload['email']; // email
  const { userid, email, name } = payload;

  req.session.views.halo="halo"
  req.session.email = email;
  req.session.name = name
  req.session.save()
  console.log('line 34', req.session)
  //console.log(payload)
  res.send()
  // res.json(
  //   {
  //     userid,
  //     email,
  //     name
  //   }
  // )
})

router.get('/admin', (req, res)=>{
  console.log(`

/admin`)
  console.log(req.session)
  if(req.session.email){
    res.send("ok");
  }else{
    res.status(403)
    res.send("not allowed");
  }
  console.log(req.session)
})

router.get('/logout', function(req, res){
  req.session.destroy( err => {
    if (err)
      return console.log(err);
    res.send()
  })
})

module.exports = router;
