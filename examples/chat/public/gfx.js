function preparerContenu(){

  $("#contenu").html("<div id='adversaire' style='text-align:center; background-color:blue;'></div>"
  +"<div id='etat' style='background-color:yellow;'></div>"
  +"<div id='divmot' style='background-color: green;'></div>"
  +"<div id='indicereponse' style='background-color: orange;'></div>"
  +"<div id='indice' style='background-color: purple;'></div>");

}

function ecrireVersus(j, a) {
  $("#adversaire").html("<b>"+j+"</b> vs <b>"+a+"</b>");
}

function ecrireEtat(e) {
  if (e == 0){
    $("#etat").html("A toi");
  }
  else $("#etat").html("En attente");
}

function ecrireMotAFaireDeviner(m){
    $("#divmot").html("Vous devez faire deviner "+m);
}

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
