{{-- resources/views/categories/edit.blade.php --}}
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" 
        integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
  <title>Editar Category</title>
</head>
<body>
  <div class="container h-100 mt-5">
    <div class="row h-100 justify-content-center align-items-center">
      <div class="col-10 col-md-8 col-lg-6">
        <h3>Update Category</h3>
        <form action="{{ route('categories.update', $category->id) }}" method="post">
          @csrf
          @method('POST')
          <div class="form-group mb-3">
            <label for="nom">Nom de la Categoria</label>
            <input type="text" class="form-control" id="nom" name="nom" value="{{ $category->nom }}" required>
          </div>
          <button type="submit" class="btn btn-primary">Actualitzar Categoria</button>
        </form>
      </div>
    </div>
  </div>
</body>
</html>
