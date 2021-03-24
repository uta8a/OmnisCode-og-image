
import { readFileSync } from 'fs';
// import marked from 'marked';
import { sanitizeHtml } from './sanitizer';
import { ParsedRequest } from './types';

// import SyntaxHighlighter from 'react-syntax-highlighter';
// import { githubGist } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
// import React from 'react';
// const twemoji = require('twemoji');
// const twOptions = { folder: 'svg', ext: '.svg' };
// const emojify = (text: string) => twemoji.parse(text, twOptions);

const rglr = readFileSync(`${__dirname}/../_fonts/Inter-Regular.woff2`).toString('base64');
const bold = readFileSync(`${__dirname}/../_fonts/Inter-Bold.woff2`).toString('base64');
const mono = readFileSync(`${__dirname}/../_fonts/Vera-Mono.woff2`).toString('base64');
const scp = readFileSync(`${__dirname}/../_fonts/SourceCodePro-Regular.woff2`).toString('base64');

function getCss(theme: string, fontSize: string) {
    let background = 'white';
    let foreground = 'black';
    let radial = 'lightgray';

    if (theme === 'dark') {
        background = 'black';
        foreground = 'white';
        radial = 'dimgray';
    }
    return `
    @font-face {
        font-family: 'Inter';
        font-style:  normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${rglr}) format('woff2');
    }

    @font-face {
        font-family: 'Inter';
        font-style:  normal;
        font-weight: bold;
        src: url(data:font/woff2;charset=utf-8;base64,${bold}) format('woff2');
    }

    @font-face {
        font-family: 'Vera';
        font-style: normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${mono})  format("woff2");
    }
    @font-face {
        font-family: 'SourceCodePro';
        font-style: normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${scp})  format("woff2");
    }

    body {
        background: ${background};
        background-image: radial-gradient(circle at 25px 25px, ${radial} 2%, transparent 0%), radial-gradient(circle at 75px 75px, ${radial} 2%, transparent 0%);
        background-size: 100px 100px;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .logo-wrapper {
        display: flex;
        align-items: center;
        align-content: center;
        justify-content: center;
        justify-items: center;
    }
    .main-code {
        font-family: 'SourceCodePro', sans-serif;
    }
    .logo {
        margin: 0 75px;
    }

    .plus {
        color: #BBB;
        font-family: Times New Roman, Verdana;
        font-size: 100px;
    }

    .spacer {
        margin: 150px;
    }

    .emoji {
        height: 1em;
        width: 1em;
        margin: 0 .05em 0 .1em;
        vertical-align: -0.1em;
    }
    
    .heading {
        font-family: 'SourceCodePro', sans-serif;
        font-size: 80px /*${sanitizeHtml(fontSize)}*/;
        font-style: normal;
        color: ${foreground};
        line-height: 1.2;
    }`;
}
// const Component = (text, style) => {
//     return (
//       <SyntaxHighlighter language="javascript" style={style}>
//         {text}
//       </SyntaxHighlighter>
//     );
//   };

export function getHtml(parsedReq: ParsedRequest) {
    const { text, theme, fontSize } = parsedReq;
    return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.7.1/styles/solarized-dark.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.7.1/highlight.min.js"></script>
    <script>hljs.highlightAll();</script>

    <style>
        ${getCss(theme, fontSize)}
    </style>
    <body>
        <div>
            <div class="heading">
                <pre><code class="main-code go">${text}</code></pre>
            </div>
        </div>
        <script>
            
        </script>
    </body>
</html>`;
}

// function getImage(src: string, width ='auto', height = '225') {
//     return `<img
//         class="logo"
//         alt="Generated Image"
//         src="${sanitizeHtml(src)}"
//         width="${sanitizeHtml(width)}"
//         height="${sanitizeHtml(height)}"
//     />`
// }

// function getPlusSign(i: number) {
//     return i === 0 ? '' : '<div class="plus">+</div>';
// }
