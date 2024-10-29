<div>
<div class="container h-100 mt-5">
  <div class="row h-100 justify-content-center align-items-center">
    <div class="col-10 col-md-8 col-lg-6">
      <h3>Update Post</h3>
      <form action="{{ route('prod.update', $prod->id) }}" method="post">
        @csrf
        @method('POST')
        <div class="form-group">
          <label for="nom">nom</label>
          <input type="text" class="form-control" id="nom" name="nom"
            value="{{ $prod->nom }}" required>
        </div>
         
        <button type="submit" class="btn mt-3 btn-primary">Update Post</button>
      </form>
    </div>
  </div>
</div>
</div>
