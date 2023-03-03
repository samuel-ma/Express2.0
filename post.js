

const express = require("express");
const router = require("router");

// post page routes
router.route("/post/:slug")
    .all(function(req,res,next){
        // run this code each time
        // we can fetch the post by id from the database
    })
    .get(function(req,res,next){
        // render posts
    })
    .put(function(req,res,next){
        // update posts
    })
    .post(function(req,res,next){
        // createa new posts
    })
    .del(function(req,res,next){
        // remove posts
    })

module.exports = router