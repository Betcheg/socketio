var socket = io();

socket.on('rdy', function (data) {
  effacerContenu();
  preparerContenu();
  partieCourante.id = data.idPartie;
  partieCourante.adversaire = data.adversaire;

  ecrireVersus(data.joueur, data.adversaire);

  if(data.commence == 1) {
    ecrireEtat(0); // A vous de jouer
    ecrireMotAFaireDeviner(data.mot);
  }
  else {
    ecrireEtat(1); // En attente
  }


});

socket.on('attenteAdversaire', function (data) {

  data="<i>Recherche d'un adversaire...</i>"
  +'<div class="progress">'
  +'<div class="progress-bar progress-bar-striped active" role="progressbar"'
  +'aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width:200%">'
  +''
  +'  </div>'
  +'</div>';
  centerInBlock(data);

});

socket.on('begin', function (data) {

  $("#contenu").html("");
  ecrire(data);

});

socket.on('attente', function (data) {

  ecrire(data);

});

socket.on('start', function (data) {
  partieCourante.id = data.idPartie;
  partieCourante.mot = data.mot;
  ecrire(data.message);
});

socket.on('donner_indice', function (data) {
  ecrire("<div class='tmp'>"
  +"<label>Indice n°"+data+"</label> <br>"
  +"<input type='text' placeholder='Indice' autofocus class='ind' maxlength='14'> "
  +"<button id='b_ind' onClick='donnerIndice()' class='btn btn-sm btn-success'> OK </button></div>");

  $(".ind").keyup(function(event){
    if(event.keyCode == 13){
      $("#b_ind").click();
    }
  });
});

socket.on('recevoir_indice', function (data) {
  ecrire("Vous avez recu l'indice: <b>" + data +"</b>");
  ecrire("<div class='tmp'>"
  +"<input type='text' placeholder='Indice' autofocus class='ind' maxlength='14'> "
  +"<button id='b_ind' onClick='donnerReponse()' class='btn btn-sm btn-success'> OK </button></div>");
  $(".ind").keyup(function(event){
    if(event.keyCode == 13){
      $("#b_ind").click();
    }
  });
});

socket.on('mot_devine', function (data) {
  ecrire(data);
});

socket.on('gagner', function (data) {
  ecrire("Félicitation! Vous avez gagné en <b>"+data+"</b> coups!!");
  ecrire("<button class='btnrejouer' onClick='rejouer()'>Rejouer contre la meme personne?</button>");
});
