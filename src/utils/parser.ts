export function parseMigration(fileContent: string) {
    const matches = [...fileContent.matchAll(/Schema::(?:(connection)\(['"`](\w+)['"`]\)->)?create\(['"`](\w+)['"`],/g)];

    if (!matches.length) {
        return null;
    }

    const parsedTables = [];

    for (const [, , connection, tableName] of matches) {
        const modelName = tableName
            .split('_')
            .map(w => w.charAt(0).toUpperCase() + w.slice(1))
            .join('')
            .replace(/s$/, '');

        const tableRegex = new RegExp(`Schema::.*create\\(['"\`]${tableName}['"\`],.*?function\\s*\\(.*?\\{([\\s\\S]*?)\\}\\);`, 'g');
        const tableBlockMatch = tableRegex.exec(fileContent);
        const tableBlock = tableBlockMatch?.[1] ?? '';

        const fieldMatches = [...tableBlock.matchAll(/\$table->(\w+)\(['"`](\w+)['"`]\)([^;]*)/g)];

        const fillable: string[] = [];
        const casts: Record<string, string> = {};

        const castMap: Record<string, string> = {
            integer: 'integer',
            string: 'string',
            boolean: 'boolean',
            datetime: 'datetime',
            date: 'date',
            json: 'array',
            float: 'float',
            double: 'float',
        };

        for (const [, type, name, modifiers] of fieldMatches) {
            fillable.push(name);

            if (castMap[type]) {
                casts[name] = castMap[type];
            } else if (type === 'foreignId') {
                casts[name] = 'integer';
            }
        }

        parsedTables.push({ tableName, modelName, connection, fillable, casts });
    }

    return parsedTables;
}
