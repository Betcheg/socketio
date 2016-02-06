var socket = io();

socket.on('rdy', function (data) {
  effacerContenu();
  preparerContenu();
  partieCourante.id = data.idPartie;
  partieCourante.adversaire = data.adversaire;
  partieCourante.jid=data.jid;
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

  centerInBlock(afficherAttente());

});

socket.on('begin', function (data) {

  $("#contenu").html("");
  ecrire(data);

});

socket.on('attente', function (data) {
  ecrire(data);
});


socket.on('adversaireDeconnecte', function (data) {
  if($("#annonce").text() == "") {
  ecrireAnnonce("Votre adversaire s'est deconnecté ( "
  +data
  +").<br>La partie est donc dissoute."
  +"<br><br>"
  +"<button class='btnrejouer btn btn-sm btn-info active' onClick='rejouerFile()'>Rejouer</button>");
  }
  
  ecrireEtat(3);
  effacerTMP();
});

socket.on('tricheDetectee', function (data) {
  ecrireAnnonce("Un comportement malveillant a été détecté.<br>"
  +"Vous avez perdu 10 points."
  +"<br>La partie est donc dissoute."
  +"<br><br>"
  +"<button class='btnrejouer btn btn-sm btn-info active' onClick='rejouerFile()'>Rejouer</button>");

  ecrireEtat(3);
  effacerTMP();
});

socket.on('start', function (data) {
  partieCourante.id = data.idPartie;
  partieCourante.mot = data.mot;
  ecrire(data.message);
});

socket.on('donner_indice', function (data) {
  ecrireIndice(afficherInput(data, 1));
  $("#b_ind").focus();
  //ajouterIndiceTableau(data);
  verifToucheEntree();
});

socket.on('recevoir_indice', function (data) {
  ecrireIndice(afficherInput(data, 0));
    $("#b_ind").focus();
  ajouterIndiceTableau(data);
  verifToucheEntree();
  ecrireEtat(0);
});

socket.on('mot_devine', function (data) {
  ajouterReponseTableau(data);
  ecrireEtat(0);
});

socket.on('gagner', function (data) {
  ecrireAnnonce(getMessageGagne(data));
  ecrireIndice("");
  ecrireEtat(2);
});

socket.on('perdu', function (data) {
  ecrireAnnonce(getMessagePerdu(data));
  ecrireIndice("");
  ecrireEtat(3);
});
