var md = require('./markdown-it')({breaks: true, xhtmlOut: true});
var head = require('./head');

md.use(head, {autoNumber: true, ztree: false});

var str = `
[TOC]

# test

## something1

fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />


## something2

fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />

fangyunjiang<br />

## something3

fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />

# test1

## something1

fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />


## something2

fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />

fangyunjiang<br />

## something3

fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />
fangyunjiang<br />


`;

var result = md.render(str);
console.log(result);
