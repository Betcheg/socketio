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
  ecrireAnnonce(data);
  ecrireEtat(3);
});

socket.on('start', function (data) {
  partieCourante.id = data.idPartie;
  partieCourante.mot = data.mot;
  ecrire(data.message);
});

socket.on('donner_indice', function (data) {
  ecrireIndice(afficherInput(data, 1));
  //ajouterIndiceTableau(data);
  verifToucheEntree();
});

socket.on('recevoir_indice', function (data) {
  ecrireIndice(afficherInput(data, 0));
  ajouterIndiceTableau(data);
  verifToucheEntree();
  ecrireEtat(0);
});

socket.on('mot_devine', function (data) {
    ajouterReponseTableau(data);
    ecrireEtat(0);
});

socket.on('gagner', function (data) {
  ecrireAnnonce(getMessageFin(data));
  ecrireEtat(2);
});
