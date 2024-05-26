const { ipcRenderer } = require('electron');

document.getElementById('select_file').addEventListener('click', () => {
    ipcRenderer.send('open-file-dialog');
});

ipcRenderer.on('file-selected', (event, path) => {
    console.log('File path:', path);
});
