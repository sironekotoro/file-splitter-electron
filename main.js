const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const fs = require('fs');
const readline = require('readline');
const path = require('path');

let mainWindow; // mainWindowをグローバル変数として定義

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });
    mainWindow.loadFile('index.html');
}

app.whenReady().then(createWindow);

ipcMain.on('open-file-dialog', (event) => {
    dialog.showOpenDialog(mainWindow, { // mainWindow を正しく参照
        properties: ['openFile']
    }).then(result => {
        if (!result.canceled && result.filePaths.length > 0) {
            const filePath = result.filePaths[0];
            event.reply('file-selected', filePath);
            splitFile(filePath); // ファイル分割処理を呼び出す
        }
    }).catch(err => {
        console.log('Error opening file dialog:', err);
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

function splitFile(filePath) {
  const linesPerFile = 1000000;
  const outputDir = path.dirname(filePath);
  const inputFileExtension = path.extname(filePath);
  const inputFileName = path.basename(filePath, inputFileExtension);

  let fileCount = 1;
  let lineCount = 0;
  let totalLinesProcessed = 0;  // 変数の初期化を確実に行う
  let outputStream = fs.createWriteStream(`${outputDir}/${inputFileName}_part${fileCount}${inputFileExtension}`);

  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
  });

  rl.on('line', line => {
    totalLinesProcessed++;  // 各行ごとにインクリメント
    if (lineCount >= linesPerFile) {
        outputStream.close();
        fileCount++;
        lineCount = 0;
        outputStream = fs.createWriteStream(`${outputDir}/${inputFileName}_part${fileCount}${inputFileExtension}`);
    }
    outputStream.write(line + '\n');
    lineCount++;
    // 進捗情報を定期的に送信
    if (totalLinesProcessed % 1000 === 0) {  // 例として1000行ごとに更新
        mainWindow.webContents.send('progress-update', {
            totalLinesProcessed,
            filePart: fileCount,
            complete: false
        });
    }
});

rl.on('close', () => {
    outputStream.close();
    // 最終的な完了メッセージを送信
    mainWindow.webContents.send('progress-update', {
        totalLinesProcessed,
        filePart: fileCount,
        complete: true
    });
});


  rl.on('error', error => {
      console.error('Error while reading the file:', error);
  });

  outputStream.on('error', error => {
      console.error('Error while writing to file:', error);
  });
}
