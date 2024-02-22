const { globalData } = require('./src/common/global');
const vscode = require('vscode');
const { openTcVForm } = require('./src/commands/openTcVForm');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    try {
        globalData.context = context;
        globalData.currentDocumentPath = vscode.window.activeTextEditor.document.uri.path;
    } catch (err) {
        console.log(err);
    }
    console.log('Congratulations, your extension "tc-vform" is now active!');
    let openTcVFormCommand = openTcVForm();
    context.subscriptions.push(...[openTcVFormCommand]);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate,
};
