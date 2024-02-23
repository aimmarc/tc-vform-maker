const fs = require('fs');
const vscode = require('vscode');
const path = require('path');
const { globalData } = require('../../common/global');

/**
 * 获取对应的逻辑
 * @returns
 */
function getDocFolderPath() {
    const { currentDocumentPath } = globalData;
    return currentDocumentPath ? currentDocumentPath : vscode.workspace.rootPath;
    // if (!currentDocumentPath) return vscode.workspace.rootPath;
    // const index = currentDocumentPath.lastIndexOf('/');
    // return currentDocumentPath.slice(0, index);
}

/**
 * 将文件写入对应的目录
 * @param {*} option
 * @returns
 */
function writeFile(option = {}) {
    const { fileName, code } = option;
    const folderPath = getDocFolderPath();
    if (!folderPath) {
        vscode.window.showErrorMessage('请先打开一个vscode工作区！');
        return;
    }
    try {
        let filePath = path.join(folderPath, fileName);
        if (/\\/.test(filePath[0])) filePath = filePath.slice(1);
        fs.writeFileSync(filePath, code, 'utf8');
        vscode.window.showInformationMessage('文件已保存');
        globalData.webViewPanel.dispose();
        const docUri = vscode.Uri.parse(filePath);
        vscode.workspace.openTextDocument(docUri).then(vscode.window.showTextDocument);
        globalData.webViewPanel = null;
    } catch (err) {
        vscode.window.showErrorMessage(err);
    }
}

module.exports = {
    writeFile,
};
