var md = require('./markdown-it')();
var _ = require('lodash');

// 找出以 :fang 开头， 以 fang: 结尾的，将 fang 替换为 yun，中间按照 markdown 显示
function my_block(state, startLine, endLine, silent) {
    let pos = state.bMarks[startLine] + state.tShift[startLine];
    let max = state.eMarks[startLine];
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

    let line = startLine + 1;
    while (!foundTail && line < endLine) {
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
        const headToken = state.push('fang_open', 'yun', 1);
        headToken.map = [ startLine, state.line ];

        const lineToken = state.push('inline', '', 0);
        lineToken.content = firstLine.trim();
        if (lastLine !== undefined) {
            lineToken.content += '\n' + state.getLines(startLine + 1, line - 1, state.tShift[startLine], true);
            lineToken.content += lastLine.trim();
        }
        lineToken.map  = [ startLine, state.line ];
        lineToken.children = [];

        const tailToken = state.push('fang_close', 'yun', -1);

        // console.log(token);
        return true;
    }
    return false;
}

function fang_block_head(tokens, idx) {
    const { content, tag } = tokens[idx];
    return `<${tag} `;
}

function fang_block_tail(tokens, idx) {
    const { content, tag } = tokens[idx];
    return ` />`;
}

function my_plugin(md, options) {
    md.block.ruler.before('table', 'my_block', my_block);
    md.renderer.rules.fang_block_head = fang_block_head;
    md.renderer.rules.fang_block_tail = fang_block_tail;
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

var result = md.render(str);
console.log('\nresult=', result);
