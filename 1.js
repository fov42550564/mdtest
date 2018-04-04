var md = require('./markdown-it')();
var _ = require('lodash');

function my_inline(state, silent) {
    console.log(_.omit(state, 'md', 'Token', 'scanDelims', 'push', 'pushPending'));
    return false;
}
function my_block(state, start, end, silent) {
    // console.log('------', start, end);
    // console.log(_.omit(state, 'md', 'push', 'Token', 'isEmpty', 'skipEmptyLines', 'skipSpaces', 'skipSpacesBack', 'skipChars', 'skipCharsBack', 'getLines'));
    const text = state.src;
    console.log(state.bMarks);
    console.log(state.eMarks);
    for (const i in state.bMarks) {
        const b = state.bMarks[i];
        const e = state.eMarks[i];
        console.log(b, text.substring(b, e).charCodeAt(0));
    }
    state.line = 100;
    return false;
}

function my_plugin(md, options) {
    // md.inline.ruler.before('text', 'my_inline', my_inline);
    md.block.ruler.push('my_block', my_block);
}

md.use(my_plugin);


var result = md.render('1\n\n2');
console.log('\n', result);
