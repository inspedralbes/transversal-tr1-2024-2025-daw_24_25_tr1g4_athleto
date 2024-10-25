# Informació del projecte

## Prototip de l'aplicació

[Enllaç a Penpot](https://design.penpot.app/#/view/5e250d03-b345-8112-8005-26cfbb154088?page-id=5e250d03-b345-8112-8005-26cfbb154089&section=interactions&index=0&share-id=9cff1166-2265-80f2-8005-297ab42637ea)

## Deploy

En fer un git clone o descarregar el repositori:

1. Dins d'el directori laravelAthleto, executar `composer install;` per instal·lar les dependencies.
2. Fes una copia del fitxer .env.example i anomena'l .env, dins d'aquest descomenta DB_HOST, DB_PORT, DB_DATABASE, DB_USERNAME i DB_PASSWORD.
    * Pots canviar les dades d'aquests atributs.
3. Iniciar el servei del servidor de base de dades i crear la base de dades especificada anteriorment.
4. Executar `php artisan migrate:fresh --seed;` per esborrar i tornar a crear las taules de database/migrations i insertar els valors de database/seeders.
5. Netejar cache, `php artisan config:clear;` `php artisan view:clear;` `php artisan cache:clear;`
6. Iniciar el servidor de laravel `php artisan serve;`
