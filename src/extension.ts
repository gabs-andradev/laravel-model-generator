import * as vscode from 'vscode';
import { generateModelFromMigration } from './commands/generateModel';

export function activate(context: vscode.ExtensionContext) {
	const disposable = vscode.commands.registerCommand(
		'extension.generateLaravelModel',
		generateModelFromMigration
	);

	context.subscriptions.push(disposable);
}

export function deactivate() { }
