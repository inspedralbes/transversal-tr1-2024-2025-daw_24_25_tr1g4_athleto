<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" 
        integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
  <title>AdminerCat</title>
</head>
<body>
  <nav class="navbar navbar-expand-lg navbar-light bg-warning">
    <div class="container-fluid">
    <div>
        <a class="navbar-brand h1" href={{ route('prod.index') }}>CRUD PRODUCTOS</a>
        <a class="navbar-brand h1" href={{ route('users.index') }}>CRUD USUARIS</a>
        <a class="navbar-brand h1" href={{ route('comd.index') }}>CRUD COMANDES</a>
      </div>
      <div class="justify-end">
        <a class="btn btn-sm btn-success" href="{{ route('categories.create') }}">Afegir Categoria</a>
      </div>
    </div>
  </nav>
  <div class="container mt-5">
    <div class="row">
      @foreach ($categories as $category)
        <div class="col-sm-4 mb-3">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title">{{ $category->nom }}</h5>
            </div>
            <div class="card-body">
              <p class="card-text">ID Categoria: {{ $category->id }}</p>
            </div>
            <div class="card-footer">
              <div class="row">
                <div class="col-sm">
                  <a href="{{ route('categories.edit', $category->id) }}" class="btn btn-primary btn-sm">Editar</a>
                </div>
                <div class="col-sm">
                  <form action="{{ route('categories.destroy', $category->id) }}" method="post">
                    @csrf
                    @method('GET')
                    <button type="submit" class="btn btn-danger btn-sm">Eliminar</button>
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
