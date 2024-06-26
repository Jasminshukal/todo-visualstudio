import * as vscode from "vscode";
import { getNonce } from "./getNonce";


export class SidebarProvider implements vscode.WebviewViewProvider {
  _view?: vscode.WebviewView;
  _doc?: vscode.TextDocument;

  constructor(private readonly _extensionUri: vscode.Uri) {}

  public resolveWebviewView(webviewView: vscode.WebviewView) {
    this._view = webviewView;

    webviewView.webview.options = {
      // Allow scripts in the webview
      enableScripts: true,

      localResourceRoots: [this._extensionUri],
    };

    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

    webviewView.webview.onDidReceiveMessage(async (data) => {
      switch (data.type) {
        case "onInfo": {
          if (!data.value) {
            return;
          }
          vscode.window.showInformationMessage(data.value);
          break;
        }
        case "onError": {
          if (!data.value) {
            return;
          }
          vscode.window.showErrorMessage(data.value);
          break;
        }
      }
    });
  }

  public revive(panel: vscode.WebviewView) {
    this._view = panel;
  }

  private _getHtmlForWebview(webview: vscode.Webview) {
    const scriptUri = webview.asWebviewUri(
        vscode.Uri.joinPath(this._extensionUri, "media", "main.js")
      );
  
      // Local path to css styles
      const styleResetPath = vscode.Uri.joinPath(
        this._extensionUri,
        "media",
        "reset.css"
      );
      const stylesPathMainPath = vscode.Uri.joinPath(
        this._extensionUri,
        "media",
        "vscode.css"
      );
    const stylesResetUri = webview.asWebviewUri(styleResetPath);
    const stylesMainUri = webview.asWebviewUri(stylesPathMainPath);
   

    // Use a nonce to only allow a specific script to be run.
    const nonce = getNonce();

    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
<meta http-equiv="Content-Security-Policy" content="img-src https: data:; style-src 'unsafe-inline' ${
webview.cspSource
}; script-src 'nonce-${nonce}';">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        
<link href="${stylesResetUri}" rel="stylesheet">
<link href="${stylesMainUri}" rel="stylesheet">
<script nonce="${nonce}">
   
</script>
    </head>
<body>

  <p>Welcome To Jess Todo</p>
  <input class="js_input_main" type='text'/>
  <button id='js-button'>JEss</button>
  <div id='content'>List will print hear.</div>
</body>

<script src="${scriptUri}" nonce="${nonce}"></script>
    </html>`;
  }
}
