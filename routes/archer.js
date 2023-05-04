/*
  weather.js -- Router accessing APIs
  This is a demo showing how to have an express server
  get information by accessing multiple APIs.
  In this case we use the US government weather API
  which is a free service provided to the world.
*/
const express = require('express');
const { Configuration, OpenAIApi } = require("openai");
if (!process.env.OPENAI_API_KEY) {throw new Error('OPENAI_API_KEY is required')}
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const router = express.Router();

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
  console.log(req.body.prompt)
  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: req.body.prompt,
    });
    res.status(200).send(completion.data.choices[0].text);
    return;
  } catch (error) {
    res.status(500).json({error});
    return
    }
  }
)

  module.exports = router;
