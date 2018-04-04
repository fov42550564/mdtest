var md = require('./markdown-it')();
var _ = require('lodash');



function my_inline(state, silent) {
    console.log(_.omit(state, 'md', 'Token', 'scanDelims', 'push', 'pushPending'));
    return false;
}
function my_block1(state, start, end, silent) {
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

// 找出以 :fang 开头， 以 fang: 结尾的，将 fang 替换为 yun
function my_block(state, start, end, silent) {
    let pos = state.bMarks[start] + state.tShift[start];
    let max = state.eMarks[start];
    const text = state.src;

    if (pos + 5 > max) {
        return false;
    }
    if(text.slice(pos, pos + 5) !== ':fang') {
        return false;
    }
    pos += 5;

    let foundTail = false;
    let firstLine = text.subtring(pos, max);
    let lastLine = '';
    if(firstLine.trim().slice(-5) === 'fang:'){
        firstLine = firstLine.trim().slice(0, -5);
        foundTail = true;
    }

    let line = start + 1;
    while (!foundTail && line < end) {
        pos = state.bMarks[line] + state.tShift[line];
        max = state.eMarks[line];
        const lineText = text.slice(pos, max).trim();
        if(lineText.slice(-5) === 'fang:') {
            lastLine = lineText.slice(0, -5);
            foundTail = true;
        }
        line++;
    }
    state.line = line;

    const token = state.push('fang_block', 'fang', 0);
    token.block = true;
    token.content = firstLine + '\n';
    token.content += state.getLines(start + 1, line, state.tShift[start], true);
    token.content += lastLine;

    token.map = [ start, state.line ];

    console.log(token);

    return true;
}

function my_plugin(md, options) {
    // md.inline.ruler.before('text', 'my_inline', my_inline);
    md.block.ruler.push('my_block', my_block);
}

md.use(my_plugin);

var str = `:fang 123 fang:`;

var result = md.render(str);
console.log('\n', result);
