
import { readFileSync } from 'fs';
// import marked from 'marked';
import { sanitizeHtml } from './sanitizer';
import { ParsedRequest } from './types';
const op: {[key: string]: string} = {'awk': 'Awk',
'bash': 'Bash',
'basic': 'Basic',
'bnf': 'BNF',
'brainfuck': 'Brainfuck',
'csharp': 'C#',
'c': 'C',
'cpp': 'C++',
'cmake': 'CMake',
'coq': 'Coq',
'css': 'CSS',
'clojure': 'Clojure',
'coffeescript': 'CoffeeScript',
'crystal': 'Crystal',
'd': 'D',
'dart': 'Dart',
'delphi': 'Delphi',
'dockerfile': 'Dockerfile',
'elixir': 'Elixir',
'elm': 'Elm',
'erlang': 'Erlang',
'excel': 'Excel',
'fsharp': 'F#',
'fortran': 'Fortran',
'go': 'Go',
'gradle': 'Gradle',
'groovy': 'Groovy',
'xml': 'HTML, XML',
'http': 'HTTP',
'haskell': 'Haskell',
'haxe': 'Haxe',
'ini': 'Ini, TOML',
'json': 'JSON',
'java': 'Java',
'javascript': 'JavaScript',
'julia': 'Julia',
'kotlin': 'Kotlin',
'tex': 'LaTeX',
'lisp': 'Lisp',
'lua': 'Lua',
'makefile': 'Makefile',
'markdown': 'Markdown',
'mathematica': 'Mathematica',
'matlab': 'Matlab',
'maxima': 'Maxima',
'nginx': 'Nginx',
'nim': 'Nim',
'nix': 'Nix',
'ocaml': 'OCaml',
'objectivec': 'Objective C',
'glsl': 'OpenGL Shading Language',
'openscad': 'OpenSCAD',
'php': 'PHP',
'perl': 'Perl',
'plaintext': 'Plaintext',
'pgsql': 'PostgreSQL & PL/pgSQL',
'powershell': 'PowerShell',
'processing': 'Processing',
'prolog': 'Prolog',
'protobuf': 'Protocol Buffers',
'python': 'Python',
'r': 'R',
'reasonml': 'ReasonML',
'ruby': 'Ruby',
'rust': 'Rust',
'scss': 'SCSS',
'sql': 'SQL',
'scala': 'Scala',
'scheme': 'Scheme',
'shell': 'Shell',
'smalltalk': 'Smalltalk',
'sml': 'SML',
'solidity': 'Solidity',
'svelte': 'Svelte',
'swift': 'Swift',
'terraform': 'Terraform (HCL)',
'typescript': 'TypeScript',
'vba': 'VBA',
'vhdl': 'VHDL',
'verilog': 'Verilog',
'vim': 'Vim Script',
'x86asm': 'x86 Assembly',
'yml': 'YAML'}
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

function getCss() {

    return `
    * {
        margin: 0;
    }
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
        background: white;
        height: 100vh;
        display: flex;
        /* align-items: center;
        justify-content: center; */
    }

    .logo-wrapper {
        display: flex;
        align-items: center;
        align-content: center;
        justify-content: center;
        justify-items: center;
        margin-top: 10px;
    }


    .main-code {
        font-family: 'SourceCodePro', sans-serif;
        width: 100vw;
        padding: 70px;
        height: 100vh;
    }
    .language {
        font-family: 'Inter';
        font-style:  normal;
        font-weight: bold;
        font-size: 160px;
        background: #ffffcc;
        position: absolute;
        right: 0;
        line-height: 1.2;
        padding: 5px 100px 10px 100px;
    }
    .heading {
        font-family: 'SourceCodePro', sans-serif;
        font-size: 80px;
        font-style: normal;
        line-height: 1.2;
        width: 100%;
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
    const { code, theme, lang } = parsedReq;
    const innerText = sanitizeHtml(code);
    return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.7.1/styles/${theme}.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.7.1/highlight.min.js"></script>
    <script>hljs.highlightAll();</script>

    <style>
        ${getCss()}
    </style>
    <body>
        <div class="heading">
            <pre><code class="main-code ${lang}">${innerText}</code></pre>
        </div>
        <div class="language">${op[lang]}</div>
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
