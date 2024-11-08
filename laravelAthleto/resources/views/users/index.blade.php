<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet"
integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
  <title>AdminerUsers</title>
</head>
<body>
  <nav class="navbar navbar-expand-lg navbar-light bg-warning">
    <div class="container-fluid">
      <div>
        <a class="navbar-brand h1" href={{ route('prod.index') }}>CRUD PRODUCTOS</a>
        <a class="navbar-brand h1" href={{ route('categories.index') }}>CRUD CATEGORIES</a>
        <a class="navbar-brand h1" href={{ route('users.index') }}>CRUD USUARIS</a>
      </div>
      <div class="justify-end ">
        <div class="col ">
          <a class="btn btn-sm btn-success" href={{ route('users.create') }}>Afegir Usuari</a>
        </div>
      </div>
    </div>
  </nav>
  <div class="container mt-5">
    <div class="row">
      @foreach ($usuaris as $user)
        <div class="col-sm">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title"> Id: {{ $user->id }}</h5>
            </div>
            <div class="card-body">
              <p class="card-text"> Nom: {{ $user->nom }}</p>
            </div>
            <div class="card-body">
              <p class="card-text"> Cognom: {{ $user->cognom }}</p>
            </div>
            <div class="card-body">
              <p class="card-text"> Nom usuari: {{ $user->nom_usuari }}</p>
            </div>
            <div class="card-body">
              <p class="card-text"> Email: {{ $user->email}}</p>
            </div>
            <div class="card-body">
              <p class="card-text"> Rol {{ $user->rol}}</p>
            </div>
            <div class="card-footer">
              <div class="row">
                <div class="col-sm">
                  <a href="{{ route('users.edit', $user->id) }}"
            class="btn btn-primary btn-sm">Edit</a>
                </div>
                <div class="col-sm">
                    <form action="{{ route('users.destroy', $user->id) }}" method="get">
                      @csrf
                      
                      <button type="submit" class="btn btn-danger btn-sm" href={{ route('users.index') }}>Delete</button>
                    </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      @endforeach
    </div>
  </div>
</body>
</html>