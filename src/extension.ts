import * as vscode from 'vscode';
import { SidebarProvider } from './SidebarProvider';

export function activate(context: vscode.ExtensionContext) {
	const sidebarProvider = new SidebarProvider(context.extensionUri);
	context.subscriptions.push(
	vscode.window.registerWebviewViewProvider(
		"vsinder-sidebar",
		sidebarProvider
	)
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('vstodo.AskQestion', async () => {
			// The code you place here will be executed every time your command is executed
			// Display a message box to the user
			const answer = await vscode.window.showInformationMessage('Hello World from vstodo!', 'Good', 'Bed');

			if(answer==='Good')
			{
				vscode.window.showInformationMessage('good');
			}
			else
			{
				vscode.window.showInformationMessage('bed so sorry.');
			}
		})
	);
}
export function deactivate() {}
