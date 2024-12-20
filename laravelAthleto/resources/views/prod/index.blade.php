<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
  <title>AdminerProd</title>
</head>

<body>
  <nav class="navbar navbar-expand-lg navbar-light bg-warning">
    <div class="container-fluid">
      <div>
        <a class="navbar-brand h1" href={{ route('categories.index') }}>CRUD CATEGORIES</a>
        <a class="navbar-brand h1" href={{ route('users.index') }}>CRUD USUARIS</a>
        <a class="navbar-brand h1" href={{ route('comd.index') }}>CRUD COMANDES</a>
      </div>
      <div class="justify-end ">
        <div class="col ">
          <a class="btn btn-sm btn-success" href={{ route('prod.create') }}>Afegir Producte</a>
        </div>
      </div>
    </div>
  </nav>
  <div class="container mt-5">
    <div class="row">
      @foreach ($productes as $post)
      <div class="col-sm">
      <div class="card">
        <div class="card-header">
        <h5 class="card-title">{{ $post->id }}</h5>
        </div>
        <div class="card-body">
        <p class="card-text">{{ $post->nom }}</p>
        </div>
        <div>
        <p>Categories:</p>
        <ul>
          @foreach ($post->categorias as $cat)
        <li>{{ $cat->nom }}</li>
      @endforeach
        </ul>
        </div>
        <div class="card-footer">
        <div class="row">
          <div class="col-sm">
          <a href="{{ route('prod.edit', $post->id) }}" class="btn btn-primary btn-sm">Edit</a>
          </div>
          <div class="col-sm">
          <form action="{{ route('prod.destroy', $post->id) }}" method="get">
            @csrf

            <button type="submit" class="btn btn-danger btn-sm" href={{ route('prod.index') }}>Delete</button>
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