var window = $(window);
var usernameInput = $('.usernameInput'); // Input for username
var texte = $('.blocktext'); // Messages area
var indice;
// Prompt for setting a username
var username;
var socket = io();

var partieCourante = {
  id: "",
  adversaire: "",
  motADeviner: "",
  nombreIndice: 1
}

function afficherUsername(){
  setUsername(usernameInput.val());
}

// Sets the client's username
function setUsername (un) {
  username = un;
  console.log(un);
  socket.emit('add_user', username);
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
  socket.emit('rejouer', {
    idPartie: partieCourante.id
  });
  ecrire("<i> en attente ... </i>");
}



socket.on('rdy', function (data) {
  partieCourante.id = data.idPartie;
  partieCourante.adversaire = data.adversaire;
  ecrire(data.message);
  document.getElementById("intro").innerHTML ="";
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
  ecrire("Indice n°"+data+ "<div class='tmp'><input type='text' class='ind' maxlength='14'><button onClick='donnerIndice()'> OK </button></div>");
});

socket.on('recevoir_indice', function (data) {
  ecrire("Vous avez recu l'indice: <b>" + data +"</b>");
  ecrire("<div class='tmp'>Votre réponse ? <input type='text' class='ind' maxlength='14'><button onClick='donnerReponse()'> OK </button></div>");
});

socket.on('mot_devine', function (data) {
  ecrire(data);
});

socket.on('gagner', function (data) {
  ecrire("Félicitation! Vous avez gagné en <b>"+data+"</b> coups!!");
  ecrire("<button onClick='rejouer()'>Rejouer contre la meme personne?</button>");
});

function ecrire(data){
  document.getElementById("block").innerHTML += data + "<br>";
}

function effacerTMP(){
  $( ".tmp" ).remove();
}
