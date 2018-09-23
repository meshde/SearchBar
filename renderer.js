function byId(id) {
  return document.getElementById(id);
}

const { remote } = require('electron');
const { shell } = require('electron');

function handler(event) {
  if (event.keyCode === 27) {
    remote.getCurrentWindow().hide();
  }
}

byId('search-box').onkeyup = function (event) {
  if (event.keyCode === 13) {
    const query = `https://www.google.com/search?q=${byId('search-box').value}`;
    shell.openExternal(query);
  }
};

window.addEventListener('keyup', handler, true);
