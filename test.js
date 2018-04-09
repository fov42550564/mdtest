var md = require('./markdown-it')();
var _ = require('lodash');
var markdownItAttrs = require('markdown-it-attrs');
md.use(markdownItAttrs);


var str = `![example block image](http://img/example.png){width=100px height=200px}`;
var result = md.render(str);
console.log('\nresult=', result);
