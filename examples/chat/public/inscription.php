<!doctype html>
<html lang="en">
<head>
  <link href='https://fonts.googleapis.com/css?family=Ubuntu:500' rel='stylesheet' type='text/css'>
    <link href='style.css' rel='stylesheet' type='text/css'>
  <!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
  <meta charset="UTF-8">
  <title>Jeu debut</title>
</head>
<body style="background-image:url('http://image.noelshack.com/fichiers/2016/05/1454525899-ba.jpg')"> <!-- cce5ff -->

<div id="block" style="margin:auto; margin-top:30px; border:1px solid #cce5ff; border-radius: 15px;background-color:#FFFFFF; text-align:center;width: 700px; height:500px">

  <div id="contenu">

  <div id="inscription" style="margin-top:55px;display:inline-block;">
    <span class="titre gras">Inscription</span><br><br>
    <form role="form">
       <div class="form-group">
         <label for="usr">Pseudo:</label>
         <input type="text" class="form-control" id="usr">
       </div>
       <div class="form-group">
         <label for="pwd">Mot de passe:</label>
         <input type="password" class="form-control" id="pwd">
       </div>
       <div class="form-group">
         <label for="email">Email:</label>
         <input type="text" class="form-control" id="usr">
       </div>
       <br>
       <button type="submit" class="btn btn-primary" style="width:100%">S'inscrire</button>
     </form>
  </div>

</div>

</div>


      <script src="https://code.jquery.com/jquery-1.10.2.min.js"></script>
      <script src="gfx.js"></script>

</body>
</html>
