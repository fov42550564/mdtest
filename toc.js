var md = require('./markdown-it')({breaks: true});
var head = require('./head');

md.use(head, {autoNumber: false});

var str = `
[TOC]

# test

## something1

fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>

## something2

fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>

## something3

fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>
fangyunjiang</br>


`;

var result = md.render(str);
console.log(result);
