var window = $(window);
var usernameInput = $('.usernameInput'); // Input for username
var texte = $('.blocktext'); // Messages area
var indice;

pseudoTmp = "visiteur"+(Math.floor(Math.random() * 1000) +1);
var pseudoJoueur = pseudoTmp;

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
  if(indice.val().length > 2){
  socket.emit('faire_deviner_mot', {
    idPartie: partieCourante.id,
    adversaire: partieCourante.adversaire,
    jid: partieCourante.jid,
    pseudo: pseudoJoueur,
    indice: indice.val()
  });
  ajouterIndiceTableau(indice.val());
  ecrireEtat(1);
  effacerTMP();
}
else $(".ind").addClass('error');
}

function donnerReponse(){
  indice = $('.ind');
    if(indice.val().length > 2){
  socket.emit('repondre_mot', {
    idPartie: partieCourante.id,
    adversaire: partieCourante.adversaire,
    jid: partieCourante.jid,
    pseudo: pseudoJoueur,
    mot: indice.val()
  });
  ajouterReponseTableau(indice.val());
  ecrireEtat(1);
  effacerTMP();
}
else $(".ind").addClass('error');
}


function rejouer(){
  effacerContenu();
  centerInBlock(afficherAttente());
  socket.emit('rejouer', {
    idPartie: partieCourante.id
  });

}
