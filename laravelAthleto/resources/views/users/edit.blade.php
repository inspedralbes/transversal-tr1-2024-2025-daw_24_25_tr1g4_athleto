<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
  <title>Editar</title>
</head>

<body>
  <div>
    <div class="container h-100 mt-5">
      <div class="row h-100 justify-content-center align-items-center">
        <div class="col-10 col-md-8 col-lg-6">
          <h3>Update User </h3>
          <form action="{{ route('users.update', $prod->id) }}" method="post">
            @csrf
            @method('POST')
            <div class="form-group">
              <label for="nom">Nom</label>
              <input type="text" class="form-control" id="nom" name="nom" value="{{ $prod->nom }}" required>
            </div>
            <div class="form-group">
              <label for="cognom">Cognom</label>
              <input type="text" class="form-control" id="cognom" name="cognom" value="{{ $prod->cognom }}" required>
            </div>
            <div class="form-group">
              <label for="nom_usuari">Nom_usuari</label>
              <input type="text" class="form-control" id="nom_usuari" name="nom_usuari" value="{{ $prod->nom_usuari }}"
                required>
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input type="text" class="form-control" id="email" name="email" value="{{ $prod->email }}" required>
            </div>
            <div class="form-group">
              <label for="rol">Rol</label>
              <input type="number" class="form-control" id="rol" name="rol" value="{{ $prod->rol }}" required>
            </div>
            <a class="btn mt-3 btn-primary" href={{ route('users.index') }}>
              Volver
            </a>
            <button type="submit" class="btn mt-3 btn-primary">Update User</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</body>

</html>