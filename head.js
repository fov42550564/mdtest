'use strict';

const TOC_REGEXP = /^\[toc\]$/im;
const ANCHOR_SVG = '<svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>';

function getSerial(serialPool, level) {
    let list = [];
    for (const l in serialPool) {
        list.push(serialPool[l]);
        if (l == level) {
            break;
        }
    }
    return list.join('.');
}

function toSlug(string) {
    let slug = string
    .toString()
    .toLowerCase()
    .replace(/\([^()]*\)$/, '')
    .replace(/\[|\]|\(|\)/g, '')
    .replace(/[^a-z0-9\u4e00-\u9fa5]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

    if (/\s[.]{1,}/.test(string)) {
        slug += '-';
    }

    return slug;
};

module.exports = function(md) {
    let gstate;
    function toc(state, silent) {
        while (state.src.indexOf('\n') >= 0 && state.src.indexOf('\n') < state.src.indexOf('[toc]')) {
            if (state.tokens.slice(-1)[0].type === 'softbreak') {
                state.src = state.src.split('\n').slice(1).join('\n');
                state.pos = 0;
            }
        }
        var token;

        // trivial rejections
        if (state.src.charCodeAt(state.pos) !== 0x5B /* [ */ ) {
            return false;
        }

        var match = TOC_REGEXP.exec(state.src);
        if (!match) {
            return false;
        }
        match = match.filter(function(m) {
            return m;
        });
        if (match.length < 1) {
            return false;
        }
        if (silent) { // don't run any pairs in validation mode
            return false;
        }

        token = state.push('toc_open', 'toc', 1);
        token.markup = '[toc]';

        token = state.push('toc_body', '', 0);
        token.content = '';

        token = state.push('toc_close', 'toc', -1);

        var offset = 0;
        var newline = state.src.indexOf('\n');
        if (newline !== -1) {
            offset = state.pos + newline;
        } else {
            offset = state.pos + state.posMax + 1;
        }
        state.pos = offset;

        return true;
    }

    md.renderer.rules.heading_open = function(tokens, idx) {
        const { serial, toc_id, head_id, title, level } = tokens[idx].toc;
        return (
            `
            <h${level}>
            <a class="anchor" aria-hidden="true" id="${head_id}"></a>
            <a href="#${toc_id}" aria-hidden="true" class="hash-link" >${ANCHOR_SVG}</a>
            <span style="margin-right: 10px;">${serial}</span>
            `
        );
    };

    md.renderer.rules.toc_open = function(tokens, index) {
        return '';
    };

    md.renderer.rules.toc_close = function(tokens, index) {
        return '';
    };

    md.renderer.rules.toc_body = function(tokens, index) {
        let indent = 0;
        const headings = gstate.tokens.filter(o => o.type === 'heading_open');

        const list = headings.map(o => {
            const { serial, toc_id, head_id, title, level } = o.toc;
            const res = [];
            if (level > indent) {
                const ldiff = (level - indent);
                for (let i = 0; i < ldiff; i++) {
                    res.push('<ul class="table-of-contents">');
                    indent++;
                }
            } else if (level < indent) {
                const ldiff = (indent - level);
                for (let i = 0; i < ldiff; i++) {
                    res.push('</ul>');
                    indent--;
                }
            }
            res.push(`<li><a class="anchor" aria-hidden="true" href="#${head_id}" id="${toc_id}"><span style="margin-right: 6px;">${serial}</span>${title}</a></li>`);
            return res.join('');
        });


        return list.join('') + new Array(indent + 1).join('</ul>');
    };

    md.core.ruler.push('grab_state', function(state) {
        const serialPool = {};
        const tokens = state.tokens;
        let lastLevel = 0;

        for (const i in tokens) {
            const token = tokens[i];
            if (token.type !== 'heading_open') {
                continue;
            }
            const level = +token.tag.substr(1, 1);
            if (lastLevel < level) {
                serialPool[level] = 1;
            } else {
                serialPool[level]++;
            }
            lastLevel = level;
            token.toc = {
                serial: getSerial(serialPool, level),
                title: toSlug(tokens[+i+1].content),
                toc_id: `__toc_id_${token.map[0]}`,
                head_id: `__head_id_${token.map[0]}`,
                level,
            }
        }
        gstate = state;
    });
    md.inline.ruler.after('emphasis', 'toc', toc);
};
