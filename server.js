var graphqlHTTP = require('express-graphql');
var express = require('express');
var path = require('path');
var schema = require('./schema.js');

express()
    .use('/query', graphqlHTTP({ schema: schema, pretty: true }))
    .use('/', express.static(path.join(__dirname, 'public')))
    .listen(3000)
