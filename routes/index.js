'use strict';
/*
 * GET home page.
 */
exports.index = function(req, res){
    res.render( 'index', {
        title: 'Hello World from Node + Express + Pug + Mongodb!',
    });
};