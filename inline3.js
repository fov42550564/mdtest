var md = require('./markdown-it')();
var _ = require('lodash');

// 将所有的 : 替换为 fang
function my_inline(state, silent) {
    let { src, pos, posMax } = state;
    state.src = src.replace(/:/g, 'fang');
    state.posMax += src.match(/:/g).length * 3;
    return false;
}

function my_plugin(md, options) {
    md.inline.ruler.push('my_inline', my_inline);
    // md.inline.ruler.before('text', 'my_inline', my_inline);
}

md.use(my_plugin);

var str = `1:23456::7`;

var result = md.render(str);
console.log('\nresult=', result);
