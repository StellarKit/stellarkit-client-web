const path = require('path');
const fs = require('fs')

// everytime we build, give a new version number to bust caches
const version = Math.round(new Date().getTime() / 1000)

let contents = `
<html>
<head>
  <title>__TITLE__</title>
  <meta charset="UTF-8">
  <meta name='viewport' content='width=device-width, initial-scale=1' />
  <link rel="icon" type="image/x-icon" href="/favicon.ico">
  <link rel="icon" type="image/png" href="favicon-32x32.png" sizes="32x32" />
  <link rel="icon" type="image/png" href="favicon-16x16.png" sizes="16x16" />
</head>
<body>
  <div id='app'></div>
  <script src="./site.js?v=__VERSION__"></script>
</body>
</html>
`
contents = contents.replace("__TITLE__", 'StellarArmy')
contents = contents.replace("__VERSION__", version)

// make sure dist folder exists
function createIndexHTML() {
  const distPath = path.join(__dirname, '..', 'dist')
  fs.stat(distPath, (err) => {
    if (!err) {
      writeIndexContents()
    } else {
      fs.mkdir(distPath, (err) => {
        if (err) {
          console.log('ERROR: mkdir failed' + err)
        } else {
          writeIndexContents()
        }
      })
    }
  })
}

// create index.html and write contents
function writeIndexContents() {
  const indexPath = path.join(__dirname, '..', 'dist', 'index.html')
  fs.open(indexPath, 'w', (err, fd) => {
    if (err) {
      console.log('ERROR: open file failed')
    } else {
      fs.writeFile(fd, contents, (err) => {
        if (err) {
          console.log('ERROR: open file failed')
        } else {
          console.log('##>> dist/index.html created: version = ' + version)
        }
      })
    }
  })
}

createIndexHTML()