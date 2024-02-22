const path = require('path');
const vscode = require('vscode');
const { globalData } = require('../common/global');

function getHtml(extensionName = '', webview) {
    return `
    <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${extensionName}</title>
            <style>
                html, body {
                    width: 100%;
                    height: 100%;
                    margin: 0;
                    padding: 0;
                }
            </style>
        </head>
        <body>
            <iframe src="${
                globalData.webviewUri
            }" frameborder="0" width="100%" height="100%" style="display: block"></iframe>
            <script src="${webview.asWebviewUri(
                vscode.Uri.file(
                    path.join(globalData.context.extensionPath, 'src/webview', 'onmessage.js'),
                ),
            )}"></script>
        </body>
    </html>`;
}

module.exports = {
    getHtml,
};
