# 🧙 Laravel Model Generator – VSCode Extension

Gere automaticamente **Models do Laravel** a partir das suas **Migrations**, com suporte a:

- `fillable` e `casts` baseados nos campos
- conexões personalizadas (`Schema::connection(...)`)
- múltiplas tabelas por migration
- confirmação de sobrescrita de arquivos existentes
- tipos complexos como `nullable`, `default`, `foreignId`


---

## 📦 Instalação

```bash
    git clone https://github.com/gabs-andradev/laravel-model-generator
    cd laravel-model-generator
    npm install
    npm run watch
```

Abra o projeto no VSCode, pressione `F5` para iniciar a extensão em modo de desenvolvimento.

---

## Como usar

1. Abra uma migration do Laravel.
2. Pressione `Ctrl+Shift+P` e execute:  
   **"Laravel: Gerar Model a partir da Migration"**
3. A extensão irá:
   - Detectar todas as tabelas da migration.
   - Gerar os arquivos em `app/Models/NomeModel.php`.
   - Perguntar se deseja sobrescrever caso já exista.
   - Adicionar `$fillable`, `$casts` e, se necessário, `$table`.

---

## Exemplo de Migration muito básica

```php
Schema::connection('pgsql_myconnection')->create('clients', function (Blueprint $table) {
    $table->id();
    $table->string('name')->nullable();
    $table->foreignId('user_id')->constrained();
    $table->timestamps();
});
```

---

## 📄 Modelo Gerado

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    /**
     * Table name
     *
     * @var string
     */
    protected $table = 'pgsql_myconnection.clients';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'user_id',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'name' => 'string',
        'user_id' => 'integer',
    ];
}
```

---

## ✅ Recursos Suportados

- [x] Suporte a múltiplas tabelas por migration
- [x] `fillable` com base nos campos
- [x] `casts` gerados automaticamente
- [x] Campos `foreignId`, `nullable`, `default`
- [x] Conexões personalizadas com `Schema::connection()`
- [x] Pergunta se deve sobrescrever models existentes

---

## 📁 Estrutura do Projeto

```
src/
├── commands/
│   └── generateModel.ts        # Comando principal da extensão
├── utils/
│   ├── parser.ts               # Parser de arquivos de migration
│   └── modelGenerator.ts       # Gerador do conteúdo da Model
└── extension.ts                # Ativação da extensão
```

---

## 👨‍💻 Autor

Gabriel Andrade  
🌐 [gabandrade.dev](https://gabandrade.dev)

---

## 🧪 Contribuindo

Sinta-se livre para abrir **PRs**, **issues**, ou sugerir melhorias.  
Este projeto foi feito para facilitar a vida de quem ama Laravel tanto quanto VSCode. ❤️

---

## 📝 Licença

Este projeto está sob a licença [MIT](LICENSE).
