var md = require('./markdown-it')();
var _ = require('lodash');

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
    let firstLine = text.slice(pos, max);
    let lastLine;
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

    if (foundTail) {
        const token = state.push('fang_block', 'yun', 0);
        token.block = true;
        token.content = firstLine.trim();
        if (lastLine !== undefined) {
            token.content += '\n' + state.getLines(start + 1, line - 1, state.tShift[start], true);
            token.content += lastLine.trim();
        }

        token.map = [ start, state.line ];

        // console.log(token);
        return true;
    }
    return false;
}

function blockRenderer(tokens, idx) {
    const { content, tag } = tokens[idx];
    return `<${tag}>${content}</${tag}>`;
}

function my_plugin(md, options) {
    md.block.ruler.before('table', 'my_block', my_block);
    md.renderer.rules.fang_block = blockRenderer;
}

md.use(my_plugin);

var str = `
:fang 123 fang:
123
`;

var str1 = `
:fang 1
2
3
hehe fang:
`;

var result = md.render(str1);
console.log('\nresult=', result);
