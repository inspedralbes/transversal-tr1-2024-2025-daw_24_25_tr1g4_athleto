<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  
<link rel="stylesheet" href="{{ asset('css/style.css') }}">

   <title>Pedidos</title>
</head>
<body>  
   
   
<div class="container">
    <h1>Gestión de Comandas</h1>


    <div class="table-container">
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                
      @foreach ($comanda['compras'] as $post)
                <tr>
                    <td>{{$post['compra']['id']}}</td>
                    <td>{{$post['compra']['estat']}}</td>
                    <td class="actions">
                        <a href="{{ route('comd.edit',['id'=> $post['compra']['id'], 'estat'=> 'cancelado'] ) }}" class="button btn-desactivado{{ $post['compra']['estat'] == 'cancelado' ? 'button btn-activado' : '' }}">Cancelado</a>    
                        <a href="{{ route('comd.edit',[ 'id'=> $post['compra']['id'], 'estat'=> 'pendiente'] ) }}" class="button btn-desactivado{{ $post['compra']['estat'] == 'pendiente' ? 'button btn-activado' : '' }}">Pendiente</a>
                        <a href="{{ route('comd.edit',['id'=> $post['compra']['id'], 'estat'=> 'aceptado'] ) }}" class="button btn-desactivado{{ $post['compra']['estat'] == 'aceptado' ? 'button btn-activado' : '' }}">Aceptado</a>
                        <a href="{{ route('comd.edit',['id'=> $post['compra']['id'], 'estat'=> 'completado'] ) }}" class="button btn-desactivado{{ $post['compra']['estat'] == 'completado' ? 'button btn-activado' : '' }}">Completado</a>
                        <a href="{{ route('comd.edit',['id'=> $post['compra']['id'], 'estat'=> 'enviado'] ) }}" class="button btn-desactivado{{ $post['compra']['estat'] == 'enviado' ? 'button btn-activado' : '' }}">Enviado</a>
                        <a href="{{ route('comd.edit',['id'=> $post['compra']['id'], 'estat'=> 'recibido'] ) }}" class="button btn-desactivado{{ $post['compra']['estat'] == 'recibido' ? 'button btn-activado' : '' }}">Recibido</a>
                    </td>
                </tr>
                @foreach ($post['producto'] as $pos )
                <tr>
                <td></td>
                <td colspan="2">
                    {{$pos->nom}}
                </td>

                </tr>
                @endforeach
    @endforeach    
             
            </tbody>
        </table>
    </div>
</div>



</body>
</html>