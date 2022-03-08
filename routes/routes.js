const express = require('express');
const path = require("path");
const ImageModel = require('../model/image');
require('dotenv').config();

const router = express.Router();

router.get('/',async(req,res,next)=>{
  try{
    if(Object.keys(req.query).length !== 0){
      const query=req.query;
      if(query.hasOwnProperty("name")){
        const images=await ImageModel.find({ name: query.name}).lean();
        res.render('home',{num:images,page:1});
      }
      if(query.hasOwnProperty("page")){
        const images=await ImageModel.find().lean();
        res.render('home',{num:images,page:query.page});
      }
    }
    else{
    const images=await ImageModel.find().lean();
    res.render('home',{num:images,page:1});
    }
  }
  catch(err){
    res.send('bad parameters');
  }
});

router.get('/show/:id',async(req,res,next)=>{
  try{
    const image= await ImageModel.findById(req.params.id).lean();
    res.render('show',{num:image});
  }
  catch(err){
    res.send('bad parameters');
  }
});

router.get('/new',async(req,res,next)=>{
  try{
    res.render('form',{});
  }
  catch(err){
    res.send('bad parameters');
  }
});

router.post('/',async(req,res,next)=>{
  try{
    const img=req.body;
    if(req.body.url)
      await ImageModel.create(img);
    else
      req.body.url="https://cdn.pixabay.com/photo/2017/06/08/17/32/not-found-2384304_960_720.jpg";
    res.redirect('/');
  }
  catch(err){
    res.send('bad parameters');
  }
});

router.get('/:id/edit',async(req,res,next)=>{
  try{
    const image= await ImageModel.findById(req.params.id).lean();
    res.render('edit',{num:image});
  }
  catch(err){
    res.send('bad parameters');
  }
});

router.post('/:id/edit',async(req,res,next)=>{
  try{
    await ImageModel.findByIdAndUpdate(req.params.id,req.body,(err,img)=>{
      console.log(err);
    }).clone();
    res.redirect('/');
  }
  catch(err){
    res.send('bad parameters');
  }
});

router.post('/delete/:id',async(req,res,next)=>{
  try{
    await ImageModel.findByIdAndRemove(req.params.id,(err,img)=>{
      console.log(err);
    }).clone();
    res.redirect('/');
  }
  catch(err){
    res.send('bad parameters');
  }
});


module.exports = router;