var window = $(window);
var usernameInput = $('.usernameInput'); // Input for username
var texte = $('.blocktext'); // Messages area
var indice;
// Prompt for setting a username
var username;
var socket = io();

pseudoTmp = "visiteur"+(Math.floor(Math.random() * 1000) +1);

$("#jouer").click(function() {
  //  $("#contenu").fadeOut(400,function(){
  $("#contenu").html("");
  recherchePartie();
  //});
});


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

function centerInBlock(chaine) {
  $("#contenu").html("<span style='text-align:center;margin-top: 150px;display: inline-block'>"+chaine+"</span>");

}

function afficherUsername(){
  setUsername(usernameInput.val());
}


// Sets the client's username
function setUsername (un) {
  username = un;
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
  $( ".btnrejouer" ).remove();
    $("#contenu").html("");
  socket.emit('rejouer', {
    idPartie: partieCourante.id
  });
  ecrire("<i> en attente ... </i>");
}


socket.on('rdy', function (data) {
  partieCourante.id = data.idPartie;
  partieCourante.adversaire = data.adversaire;
  ecrire(data.message);
  //  document.getElementById("intro").innerHTML ="";
});

socket.on('info', function (data) {

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

function ecrire(data){
  document.getElementById("contenu").innerHTML += data + "<br>";
}

function effacerTMP(){
  $( ".tmp" ).remove();
}
