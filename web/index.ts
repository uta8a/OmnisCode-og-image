import { ParsedRequest } from '../api/_lib/types';
const { H, R, copee } = (window as any);
let timeout = -1;

interface ImagePreviewProps {
    src: string;
    onclick: () => void;
    onload: () => void;
    onerror: () => void;
    loading: boolean;
}

const ImagePreview = ({ src, onclick, onload, onerror, loading }: ImagePreviewProps) => {
    const style = {
        filter: loading ? 'blur(5px)' : '',
        opacity: loading ? 0.1 : 1,
    };
    const title = 'Click to copy image URL to clipboard';
    return H('a',
        { className: 'image-wrapper', href: src, onclick },
        H('img',
            { src, onload, onerror, style, title }
        )
    );
}

interface DropdownOption {
    text: string;
    value: string;
}

interface DropdownProps {
    options: DropdownOption[];
    value: string;
    onchange: (val: string) => void;
    small: boolean;
}

const Dropdown = ({ options, value, onchange, small }: DropdownProps) => {
    const wrapper = small ? 'select-wrapper small' : 'select-wrapper';
    const arrow = small ? 'select-arrow small' : 'select-arrow';
    return H('div',
        { className: wrapper },
        H('select',
            { onchange: (e: any) => onchange(e.target.value) },
            options.map(o =>
                H('option',
                    { value: o.value, selected: value === o.value },
                    o.text
                )
            )
        ),
        H('div',
            { className: arrow },
            '▼'
        )
    );
}

interface TextInputProps {
    value: string;
    oninput: (val: string) => void;
}

const TextInput = ({ value, oninput }: TextInputProps) => {
    return H('div',
        { className: 'input-outer-wrapper' },
        H('div',
            { className: 'input-inner-wrapper' },
            H('textarea',
                { type: 'text', value, oninput: (e: any) => oninput(e.target.value) }
            )
        )
    );
}

// interface ButtonProps {
//     label: string;
//     onclick: () => void;
// }

// const Button = ({ label, onclick }: ButtonProps) => {
//     return H('button', { onclick }, label);
// }

interface FieldProps {
    label: string;
    input: any;
}

const Field = ({ label, input }: FieldProps) => {
    return H('div',
        { className: 'field' },
        H('label', 
            H('div', {className: 'field-label'}, label),
            H('div', { className: 'field-value' }, input),
        ),
    );
}

interface ToastProps {
    show: boolean;
    message: string;
}

const Toast = ({ show, message }: ToastProps) => {
    const style = { transform:  show ? 'translate3d(0,-0px,-0px) scale(1)' : '' };
    return H('div',
        { className: 'toast-area' },
        H('div',
            { className: 'toast-outer', style },
            H('div',
                { className: 'toast-inner' },
                H('div',
                    { className: 'toast-message'},
                    message
                )
            )
        ),
    );
}

const themeOptions: DropdownOption[] = [
    {text: 'a11y-dark', value: 'a11y-dark'},
{text: 'a11y-light', value: 'a11y-light'},
{text: 'agate', value: 'agate'},
{text: 'androidstudio', value: 'androidstudio'},
{text: 'an-old-hope', value: 'an-old-hope'},
{text: 'arduino-light', value: 'arduino-light'},
{text: 'arta', value: 'arta'},
{text: 'ascetic', value: 'ascetic'},
{text: 'atelier-cave-dark', value: 'atelier-cave-dark'},
{text: 'atelier-cave-light', value: 'atelier-cave-light'},
{text: 'atelier-dune-dark', value: 'atelier-dune-dark'},
{text: 'atelier-dune-light', value: 'atelier-dune-light'},
{text: 'atelier-estuary-dark', value: 'atelier-estuary-dark'},
{text: 'atelier-estuary-light', value: 'atelier-estuary-light'},
{text: 'atelier-forest-dark', value: 'atelier-forest-dark'},
{text: 'atelier-forest-light', value: 'atelier-forest-light'},
{text: 'atelier-heath-dark', value: 'atelier-heath-dark'},
{text: 'atelier-heath-light', value: 'atelier-heath-light'},
{text: 'atelier-lakeside-dark', value: 'atelier-lakeside-dark'},
{text: 'atelier-lakeside-light', value: 'atelier-lakeside-light'},
{text: 'atelier-plateau-dark', value: 'atelier-plateau-dark'},
{text: 'atelier-plateau-light', value: 'atelier-plateau-light'},
{text: 'atelier-savanna-dark', value: 'atelier-savanna-dark'},
{text: 'atelier-savanna-light', value: 'atelier-savanna-light'},
{text: 'atelier-seaside-dark', value: 'atelier-seaside-dark'},
{text: 'atelier-seaside-light', value: 'atelier-seaside-light'},
{text: 'atelier-sulphurpool-dark', value: 'atelier-sulphurpool-dark'},
{text: 'atelier-sulphurpool-light', value: 'atelier-sulphurpool-light'},
{text: 'atom-one-dark', value: 'atom-one-dark'},
{text: 'atom-one-dark-reasonable', value: 'atom-one-dark-reasonable'},
{text: 'atom-one-light', value: 'atom-one-light'},
{text: 'brown-paper', value: 'brown-paper'},
{text: 'brown-papersq', value: 'brown-papersq'},
{text: 'codepen-embed', value: 'codepen-embed'},
{text: 'color-brewer', value: 'color-brewer'},
{text: 'darcula', value: 'darcula'},
{text: 'dark', value: 'dark'},
{text: 'default', value: 'default'},
{text: 'docco', value: 'docco'},
{text: 'dracula', value: 'dracula'},
{text: 'far', value: 'far'},
{text: 'foundation', value: 'foundation'},
{text: 'github', value: 'github'},
{text: 'github-gist', value: 'github-gist'},
{text: 'gml', value: 'gml'},
{text: 'googlecode', value: 'googlecode'},
{text: 'gradient-dark', value: 'gradient-dark'},
{text: 'gradient-light', value: 'gradient-light'},
{text: 'grayscale', value: 'grayscale'},
{text: 'gruvbox-dark', value: 'gruvbox-dark'},
{text: 'gruvbox-light', value: 'gruvbox-light'},
{text: 'highlights', value: 'highlights'},
{text: 'hopscotch', value: 'hopscotch'},
{text: 'hybrid', value: 'hybrid'},
{text: 'idea', value: 'idea'},
{text: 'ir-black', value: 'ir-black'},
{text: 'isbl-editor-dark', value: 'isbl-editor-dark'},
{text: 'isbl-editor-light', value: 'isbl-editor-light'},
{text: 'kimbie', value: 'kimbie'},
{text: 'kimbie', value: 'kimbie'},
{text: 'lightfair', value: 'lightfair'},
{text: 'lioshi', value: 'lioshi'},
{text: 'magula', value: 'magula'},
{text: 'mono-blue', value: 'mono-blue'},
{text: 'monokai', value: 'monokai'},
{text: 'monokai-sublime', value: 'monokai-sublime'},
{text: 'night-owl', value: 'night-owl'},
{text: 'nnfx', value: 'nnfx'},
{text: 'nnfx-dark', value: 'nnfx-dark'},
{text: 'nord', value: 'nord'},
{text: 'obsidian', value: 'obsidian'},
{text: 'ocean', value: 'ocean'},
{text: 'paraiso-dark', value: 'paraiso-dark'},
{text: 'paraiso-light', value: 'paraiso-light'},
{text: 'pojoaque', value: 'pojoaque'},
{text: 'pojoaque', value: 'pojoaque'},
{text: 'purebasic', value: 'purebasic'},
{text: 'qtcreator_dark', value: 'qtcreator_dark'},
{text: 'qtcreator_light', value: 'qtcreator_light'},
{text: 'railscasts', value: 'railscasts'},
{text: 'rainbow', value: 'rainbow'},
{text: 'routeros', value: 'routeros'},
{text: 'school-book', value: 'school-book'},
{text: 'school-book', value: 'school-book'},
{text: 'shades-of-purple', value: 'shades-of-purple'},
{text: 'solarized-dark', value: 'solarized-dark'},
{text: 'solarized-light', value: 'solarized-light'},
{text: 'srcery', value: 'srcery'},
{text: 'stackoverflow-dark', value: 'stackoverflow-dark'},
{text: 'stackoverflow-light', value: 'stackoverflow-light'},
{text: 'sunburst', value: 'sunburst'},
{text: 'tomorrow', value: 'tomorrow'},
{text: 'tomorrow-night-blue', value: 'tomorrow-night-blue'},
{text: 'tomorrow-night-bright', value: 'tomorrow-night-bright'},
{text: 'tomorrow-night', value: 'tomorrow-night'},
{text: 'tomorrow-night-eighties', value: 'tomorrow-night-eighties'},
{text: 'vs2015', value: 'vs2015'},
{text: 'vs', value: 'vs'},
{text: 'xcode', value: 'xcode'},
{text: 'xt256', value: 'xt256'},
{text: 'zenburn', value: 'zenburn'},
];
const langOptions: DropdownOption[] = [
    {text: 'Awk', value: 'awk'},
{text: 'Bash', value: 'bash'},
{text: 'Basic', value: 'basic'},
{text: 'BNF', value: 'bnf'},
{text: 'Brainfuck', value: 'brainfuck'},
{text: 'C#', value: 'csharp'},
{text: 'C', value: 'c'},
{text: 'C++', value: 'cpp'},
{text: 'CMake', value: 'cmake'},
{text: 'Coq', value: 'coq'},
{text: 'CSS', value: 'css'},
{text: 'Clojure', value: 'clojure'},
{text: 'CoffeeScript', value: 'coffeescript'},
{text: 'Crystal', value: 'crystal'},
{text: 'D', value: 'd'},
{text: 'Dart', value: 'dart'},
{text: 'Delphi', value: 'delphi'},
{text: 'Dockerfile', value: 'dockerfile'},
{text: 'Elixir', value: 'elixir'},
{text: 'Elm', value: 'elm'},
{text: 'Erlang', value: 'erlang'},
{text: 'Excel', value: 'excel'},
{text: 'F#', value: 'fsharp'},
{text: 'Fortran', value: 'fortran'},
{text: 'Go', value: 'go'},
{text: 'Gradle', value: 'gradle'},
{text: 'Groovy', value: 'groovy'},
{text: 'HTML, XML', value: 'xml'},
{text: 'HTTP', value: 'http'},
{text: 'Haskell', value: 'haskell'},
{text: 'Haxe', value: 'haxe'},
{text: 'Ini, TOML', value: 'ini'},
{text: 'JSON', value: 'json'},
{text: 'Java', value: 'java'},
{text: 'JavaScript', value: 'javascript'},
{text: 'Julia', value: 'julia'},
{text: 'Kotlin', value: 'kotlin'},
{text: 'LaTeX', value: 'tex'},
{text: 'Lisp', value: 'lisp'},
{text: 'Lua', value: 'lua'},
{text: 'Makefile', value: 'makefile'},
{text: 'Markdown', value: 'markdown'},
{text: 'Mathematica', value: 'mathematica'},
{text: 'Matlab', value: 'matlab'},
{text: 'Maxima', value: 'maxima'},
{text: 'Nginx', value: 'nginx'},
{text: 'Nim', value: 'nim'},
{text: 'Nix', value: 'nix'},
{text: 'OCaml', value: 'ocaml'},
{text: 'Objective C', value: 'objectivec'},
{text: 'OpenGL Shading Language', value: 'glsl'},
{text: 'OpenSCAD', value: 'openscad'},
{text: 'PHP', value: 'php'},
{text: 'Perl', value: 'perl'},
{text: 'Plaintext', value: 'plaintext'},
{text: 'PostgreSQL & PL/pgSQL', value: 'pgsql'},
{text: 'PowerShell', value: 'powershell'},
{text: 'Processing', value: 'processing'},
{text: 'Prolog', value: 'prolog'},
{text: 'Protocol Buffers', value: 'protobuf'},
{text: 'Python', value: 'python'},
{text: 'R', value: 'r'},
{text: 'ReasonML', value: 'reasonml'},
{text: 'Ruby', value: 'ruby'},
{text: 'Rust', value: 'rust'},
{text: 'SCSS', value: 'scss'},
{text: 'SQL', value: 'sql'},
{text: 'Scala', value: 'scala'},
{text: 'Scheme', value: 'scheme'},
{text: 'Shell', value: 'shell'},
{text: 'Smalltalk', value: 'smalltalk'},
{text: 'SML', value: 'sml'},
{text: 'Solidity', value: 'solidity'},
{text: 'Svelte', value: 'svelte'},
{text: 'Swift', value: 'swift'},
{text: 'Terraform (HCL)', value: 'terraform'},
{text: 'TypeScript', value: 'typescript'},
{text: 'VBA', value: 'vba'},
{text: 'VHDL', value: 'vhdl'},
{text: 'Verilog', value: 'verilog'},
{text: 'Vim Script', value: 'vim'},
{text: 'x86 Assembly', value: 'x86asm'},
{text: 'YAML', value: 'yml'},
]

// const fileTypeOptions: DropdownOption[] = [
//     { text: 'PNG', value: 'png' },
//     { text: 'JPEG', value: 'jpeg' },
// ];

// const fontSizeOptions: DropdownOption[] = Array
//     .from({ length: 10 })
//     .map((_, i) => i * 25)
//     .filter(n => n > 0)
//     .map(n => ({ text: n + 'px', value: n + 'px' }));

// const markdownOptions: DropdownOption[] = [
//     { text: 'Plain Text', value: '0' },
//     { text: 'Markdown', value: '1' },
// ];

// const imageLightOptions: DropdownOption[] = [
//     { text: 'Vercel', value: 'https://assets.vercel.com/image/upload/front/assets/design/vercel-triangle-black.svg' },
//     { text: 'Next.js', value: 'https://assets.vercel.com/image/upload/front/assets/design/nextjs-black-logo.svg' },
//     { text: 'Hyper', value: 'https://assets.vercel.com/image/upload/front/assets/design/hyper-color-logo.svg' },
// ];

// const imageDarkOptions: DropdownOption[] = [

//     { text: 'Vercel', value: 'https://assets.vercel.com/image/upload/front/assets/design/vercel-triangle-white.svg' },
//     { text: 'Next.js', value: 'https://assets.vercel.com/image/upload/front/assets/design/nextjs-white-logo.svg' },
//     { text: 'Hyper', value: 'https://assets.vercel.com/image/upload/front/assets/design/hyper-bw-logo.svg' },
// ];

// const widthOptions = [
//     { text: 'width', value: 'auto' },
//     { text: '50', value: '50' },
//     { text: '100', value: '100' },
//     { text: '150', value: '150' },
//     { text: '200', value: '200' },
//     { text: '250', value: '250' },
//     { text: '300', value: '300' },
//     { text: '350', value: '350' },
// ];

// const heightOptions = [
//     { text: 'height', value: 'auto' },
//     { text: '50', value: '50' },
//     { text: '100', value: '100' },
//     { text: '150', value: '150' },
//     { text: '200', value: '200' },
//     { text: '250', value: '250' },
//     { text: '300', value: '300' },
//     { text: '350', value: '350' },
// ];

interface AppState extends ParsedRequest {
    loading: boolean;
    showToast: boolean;
    messageToast: string;
    selectedImageIndex: number;
    widths: string[];
    heights: string[];
    overrideUrl: URL | null;
}

type SetState = (state: Partial<AppState>) => void;

const App = (_: any, state: AppState, setState: SetState) => {
    const setLoadingState = (newState: Partial<AppState>) => {
        window.clearTimeout(timeout);
        if (state.overrideUrl && state.overrideUrl !== newState.overrideUrl) {
            newState.overrideUrl = state.overrideUrl;
        }
        if (newState.overrideUrl) {
            timeout = window.setTimeout(() => setState({ overrideUrl: null }), 200);
        }

        setState({ ...newState, loading: true });
    };
    const {
        code = 'package main',
        theme = 'solarized-dark',
        lang = 'go',
        // widths=[],
        // heights=[],
        showToast = false,
        messageToast = '',
        loading = true,
        // selectedImageIndex = 0,
        overrideUrl = null,
    } = state;
    // const mdValue = md ? '1' : '0';
    // const imageOptions = theme === 'light' ? imageLightOptions : imageDarkOptions;
    const url = new URL(window.location.origin);
    url.pathname = `${encodeURIComponent(code)}.jpeg`;
    url.searchParams.append('theme', theme);
    url.searchParams.append('lang', lang);
    // url.searchParams.append('fontSize', fontSize);
    // for (let image of images) {
    //     url.searchParams.append('images', image);
    // }
    // for (let width of widths) {
    //     url.searchParams.append('widths', width);
    // }
    // for (let height of heights) {
    //     url.searchParams.append('heights', height);
    // }

    return H('div',
        { className: 'split' },
        H('div',
            { className: 'pull-left' },
            H('div',
                H(Field, {
                    label: 'Theme',
                    input: H(Dropdown, {
                        options: themeOptions,
                        value: theme,
                        onchange: (val: string) => setLoadingState({ theme: val })
                    })
                }),
                H(Field, {
                    label: 'File Type',
                    input: H(Dropdown, {
                        options: langOptions,
                        value: lang,
                        onchange: (val: string) => setLoadingState({ lang: val })
                    })
                }),
                H(Field, {
                    label: 'Code Input',
                    input: H(TextInput, {
                        value: code,
                        oninput: (val: string) => {
                            console.log('oninput ' + val);
                            setLoadingState({ code: val, overrideUrl: url });
                        }
                    })
                }),
            )
        ),
        H('div',
            { className: 'pull-right' },
            H(ImagePreview, {
                src: overrideUrl ? overrideUrl.href : url.href,
                loading: loading,
                onload: () => setState({ loading: false }),
                onerror: () => {
                    setState({ showToast: true, messageToast: 'Oops, an error occurred' });
                    setTimeout(() => setState({ showToast: false }), 2000);
                },
                onclick: (e: Event) => {
                    e.preventDefault();
                    const success = copee.toClipboard(url.href);
                    if (success) {
                        setState({ showToast: true, messageToast: 'Copied image URL to clipboard' });
                        setTimeout(() => setState({ showToast: false }), 3000);
                    } else {
                        window.open(url.href, '_blank');
                    }
                    return false;
                }
            })
        ),
        H(Toast, {
            message: messageToast,
            show: showToast,
        })
    );
};

R(H(App), document.getElementById('app'));
