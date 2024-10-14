const express=require("express");
const {handleGenerateNewShortURL,handleGetAnalytics,handleGetRedirect}=require('../controllers/url')

const router=express.Router();

router.post('/',handleGenerateNewShortURL);

router.get('/analytics/:shortId',handleGetAnalytics);

router.get('/:shortId',handleGetRedirect)

module.exports=router;