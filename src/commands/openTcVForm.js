const { globalData } = require('../common/global');
const { getHtml } = require('../webview/html');
const vscode = require('vscode');
const { msgDistribute } = require('../messages/distribute');

function openTcVForm() {
    return vscode.commands.registerCommand('tc-vform.openTcVForm', function () {
        if (globalData.webViewPanel) {
            vscode.window.showErrorMessage('TC VForm is already exist!');
            return;
        }
        vscode.window.showInformationMessage('Open TC VForm!');
        const webViewPanel = vscode.window.createWebviewPanel(
            globalData.extensionName,
            globalData.extensionName,
            vscode.ViewColumn.One,
            {
                enableScripts: true,
                enableForms: true,
                enableCommandUris: true,
                enableFindWidget: true,
            },
        );
        webViewPanel.webview.onDidReceiveMessage(
            (message) => {
                msgDistribute(message);
            },
            undefined,
            globalData.context.subscriptions,
        );
        webViewPanel.webview.html = getHtml(globalData.extensionName, webViewPanel.webview);
        globalData.webViewPanel = webViewPanel;
    });
}

module.exports = { openTcVForm };
