# VSCode settings

{
"workbench.colorTheme": "Visual Studio Dark",
// "terminal.integrated.shell.windows": "C:\\Windows\\sysnative\\bash.exe"
"terminal.integrated.shell.windows": "C:\\Program Files\\Git\\bin\\bash.exe",
// vue
"eslint.enable": true, //Enable eslint
"eslint.options": {
"extensions": [ //List of file extensions to activate eslint
".html",
".js",
".vue",
".jsx"
]
},
"eslint.validate": [
{ //list of extensions to validate
"language": "html",
"autoFix": true
},
{
"language": "vue",
"autoFix": true //Autofix any fixable errors when linting
},
{
"language": "javascript",
"autoFix": true
},
{
"language": "javascriptreact",
"autoFix": true
}
],
// Run the linter on save (onSave) or on type (onType)
"eslint.run": "onSave",
"eslint.autoFixOnSave": true,
"workbench.iconTheme": "vs-minimal", //Autofix any fixable errors when linting
// end vue
"editor.formatOnSave": true,
"prettier.semi": false
}
