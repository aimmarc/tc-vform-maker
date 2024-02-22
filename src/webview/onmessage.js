window.onmessage = function (e) {
    const vscode = acquireVsCodeApi();
    vscode.postMessage(e.data);
};
