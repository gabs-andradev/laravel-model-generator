export function generateModelContent(
    modelName: string,
    fillable: string[],
    casts: Record<string, string>,
    tableName: string,
    connection?: string | null
): string {
    const fillableBlock = fillable.map(f => `        '${f}',`).join('\n');
    const castsBlock = Object.entries(casts)
        .map(([key, type]) => `        '${key}' => '${type}',`)
        .join('\n');

    const tableDeclaration = connection
        ? `
    /**
     * Table name
     *
     * @var string
     */
    protected \$table = '${connection}.${tableName}';
`
        : '';

    return `<?php

namespace App\\Models;

use Illuminate\\Database\\Eloquent\\Model;

class ${modelName} extends Model
{${tableDeclaration}
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected \$fillable = [
${fillableBlock}
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected \$casts = [
${castsBlock}
    ];
}
`;
}
