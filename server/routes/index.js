var express = require('express');
var router = express.Router();
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.GOOGLE_OAUTH2_CLIENT_ID)

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', async function(req, res, next){
  // console.log(req.body.idToken)
  const ticket = await client.verifyIdToken({
    idToken: req.body.idToken,
    audience: process.env.GOOGLE_OAUTH2_CLIENT_ID
  })

  const payload = ticket.getPayload();
  const userid = payload['sub']; //google id, but we can use email
  const email = payload['email']; // email

  req.session.email = email;
  req.session.name = name
  console.log(payload)
  res.json({
    "message" : "wow"
  })
})

router.get('/logout', function(req, res){
  req.session.destroy( err => {
    if (err)
      return console.log(err);
    res.send()
  })
})

module.exports = router;