var window = $(window);
var usernameInput = $('.usernameInput'); // Input for username
var texte = $('.blocktext'); // Messages area
var indice;

pseudoTmp = "visiteur"+(Math.floor(Math.random() * 1000) +1);

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

  effacerTMP();
  ecrire("<i> en attente ... </i>");
}

function donnerReponse(){
  indice = $('.ind');
  socket.emit('repondre_mot', {
    idPartie: partieCourante.id,
    mot: indice.val(),
  });
  effacerTMP();
  ecrire("<i> en attente ... </i>");
}


function rejouer(){
  effacerContenu();
  socket.emit('rejouer', {
    idPartie: partieCourante.id
  });
  ecrire("<i> en attente ... </i>");
}
