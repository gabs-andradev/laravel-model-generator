import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { parseMigration } from '../utils/parser';
import { generateModelContent } from '../utils/modelGenerator';

export async function generateModelFromMigration() {
    const editor = vscode.window.activeTextEditor;

    if (!editor) {
        vscode.window.showErrorMessage('Abra um arquivo de migration para gerar a model.');
        return;
    }

    const fileContent = editor.document.getText();
    const tables = parseMigration(fileContent);

    if (!tables || tables.length === 0) {
        vscode.window.showErrorMessage('Nenhuma tabela encontrada na migration.');
        return;
    }

    const workspace = vscode.workspace.workspaceFolders?.[0];
    if (!workspace) {
        vscode.window.showErrorMessage('Nenhuma pasta aberta.');
        return;
    }

    for (const { tableName, modelName, connection, fillable, casts } of tables) {
        const modelContent = generateModelContent(modelName, fillable, casts, tableName, connection);
        const outputPath = path.join(workspace.uri.fsPath, 'app', 'Models', `${modelName}.php`);

        // Verificar se o arquivo já existe
        if (fs.existsSync(outputPath)) {
            const overwrite = await vscode.window.showQuickPick(['Sim', 'Não'], {
                placeHolder: `O model ${modelName}.php já existe. Deseja sobrescrever?`,
            });

            if (overwrite !== 'Sim') {
                vscode.window.showInformationMessage(`Model ${modelName}.php ignorado.`);
                continue;
            }
        }

        fs.writeFileSync(outputPath, modelContent, 'utf8');
        vscode.window.showInformationMessage(`Model ${modelName}.php criado com sucesso.`);
    }
}
