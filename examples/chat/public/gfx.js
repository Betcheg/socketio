
function afficherUsername(){
  setUsername(usernameInput.val());
}

function centerInBlock(chaine) {
  $("#contenu").html("<span style='text-align:center;margin-top: 150px;display: inline-block'>"+chaine+"</span>");
}

$("#jouer").click(function() {
  //  $("#contenu").fadeOut(400,function(){
  effacerContenu();
  recherchePartie();
  //});
});

function afficherNouvellePartie(data) {
    $("#contenu").html("");
      
}

function effacerTMP(){
  $( ".tmp" ).remove();
}

function ecrire(data){
  document.getElementById("contenu").innerHTML += data + "<br>";
}

function effacerContenu(){
    $("#contenu").html("");
}
