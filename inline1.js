var md = require('./markdown-it')();
var _ = require('lodash');

// 找出以 : 开头， 以 : 结尾的，将 : 替换为 fang, 中间按照原字符串显示
function my_inline(state, silent) {
    let { src, pos, posMax } = state;
    // return false;
    while (pos < posMax) {
        const token = state.push('fang_inline', 'fang', 0);
        token.content = src[pos];
        pos++;
        state.pos = pos;
    }
    return true;
}

function fang_inline(tokens, idx) {
    const { tag, content } = tokens[idx];
    return `<${tag}[${content}]>`;
}

function my_plugin(md, options) {
    md.inline.ruler.before('text', 'my_inline', my_inline);
    // md.inline.ruler.push('my_inline', my_inline);
    md.renderer.rules.fang_inline = fang_inline;
}

md.use(my_plugin);

var str = `1:23456:7`;

var result = md.render(str);
console.log('\nresult=', result);
