<div class="container h-100 mt-5">
  <div class="row h-100 justify-content-center align-items-center">
    <div class="col-10 col-md-8 col-lg-6">
      <h3>Add a Post</h3>
      <form action="{{ route('prod.store') }}" method="post">
        @csrf
        <div class="form-group">
          <label for="nom">Nom</label>
          <input type="text" class="form-control" id="nom" name="nom" required>
        </div>
        <div class="form-group">
          <label for="descripcio">Descripcio</label>
          <textarea class="form-control" id="descripcio" name="descripcio" rows="3" required></textarea>
        </div>
        <br>
        <div class="form-group">
          <label for="preu">Preu</label>
          <input type="text" class="form-control" id="preu" name="preu" required>
        </div>
        <div class="form-group">
          <label for="imatge">imatge</label>
          <input type="text" class="form-control" id="imatge" name="imatge" required>
        </div>
        <button type="submit" class="btn btn-primary">Create Post</button>
      </form>
    </div>
  </div>
</div>
