var window = $(window);
var usernameInput = $('.usernameInput'); // Input for username
var texte = $('.blocktext'); // Messages area
var indice;

pseudoTmp = "visiteur"+(Math.floor(Math.random() * 1000) +1);

$("#jouer").click(function() {
  //  $("#contenu").fadeOut(400,function(){
  effacerContenu();
  recherchePartie();
  //});
});

function rejouerFile(){
  effacerContenu();
  recherchePartie();
}

var partieCourante = {
  id: "",
  adversaire: "",
  motADeviner: "",
  nombreIndice: 1
}

function recherchePartie()
{
  socket.emit('add_user', pseudoTmp);
}

function setUsername (un) {
  socket.emit('add_user', un);
}

function donnerIndice(){
  indice = $('.ind');
  socket.emit('faire_deviner_mot', {
    idPartie: partieCourante.id,
    indice: indice.val(),
  });
  ajouterIndiceTableau(indice.val());
  ecrireEtat(1);
  effacerTMP();
}

function donnerReponse(){
  indice = $('.ind');
  socket.emit('repondre_mot', {
    idPartie: partieCourante.id,
    mot: indice.val(),
  });
  ajouterReponseTableau(indice.val());
  ecrireEtat(1);
  effacerTMP();
}


function rejouer(){
  effacerContenu();
  centerInBlock(afficherAttente());
  socket.emit('rejouer', {
    idPartie: partieCourante.id
  });

}
