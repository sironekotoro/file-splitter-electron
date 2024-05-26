const { ipcRenderer } = require('electron');

document.getElementById('select_file').addEventListener('click', () => {
    ipcRenderer.send('open-file-dialog');
});

ipcRenderer.on('progress-update', (event, data) => {
  const statusMessage = document.getElementById('status-message');
  if (data.complete) {
      statusMessage.textContent = 'Splitting complete.';
  } else {
      statusMessage.textContent = `Processing... Part ${data.filePart}, ${data.totalLinesProcessed} lines processed so far.`;
  }
});
