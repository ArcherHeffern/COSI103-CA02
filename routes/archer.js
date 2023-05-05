/*
  weather.js -- Router accessing APIs
  This is a demo showing how to have an express server
  get information by accessing multiple APIs.
  In this case we use the US government weather API
  which is a free service provided to the world.
*/
const express = require('express');
const router = express.Router();
const axios = require('axios');

isLoggedIn = (req,res,next) => {
  if (res.locals.loggedIn) {
    next()
  } else {
    res.redirect('/login')
  }
}

router.get('/archer', isLoggedIn, (req,res) => {
    res.render('archer')
})

router.post('/api/v1/prompt/archer', isLoggedIn, async (req,res) => {
  if (!req.body.prompt) {res.status(400).json({error: 'prompt is required'}).send(); return}
  const response = await axios.post('http://gracehopper.cs-i.brandeis.edu:3500/openai',
  {prompt:req.body.prompt})
  res.status(200).send(response.data.choices[0]['message']['content']);
  return;
  })

  module.exports = router;
