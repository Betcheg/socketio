function preparerContenu(){
  $("#contenu").html("<div id='adversaire'></div>"
  +"<div id='etat'></div>"
  +"<div id='divmot'></div>"
  +"<div id='tableau'>"
  +"<div id='tableauIndice'><li class='titretableau'>Indices</li></div>"
  +"<div id='tableauReponse'><li class='titretableau'>Réponses</li></div>"
  +"</div>"
  +"<div id='holderindice'>"
  +"<div id='indice'></div>"
  +"</div>"
  +"<div id='indicereponse'>"
  +"<div id='annonce'></div>"
  +"</div>");
}

function ecrireVersus(j, a) {
  $("#adversaire").html("<b>"+j+"</b> vs <b>"+a+"</b>");
}


function ecrireAnnonce(c) {
  $("#annonce").append(c);
}

function ajouterReponseTableau(c){
$("#tableauReponse").append("<li>"+c+"</li>");
}

function ajouterIndiceTableau(c){
$("#tableauIndice").append("<li>"+c+"</li>");
}

function ecrireIndice(c) {
  $("#indice").html(c);
}

function ecrireEtat(e) {
  if (e == 0){ // 0 : à vous, 1 en attente, 2 fini
    $("#etat").html(
       '<div class="progress" style="height: 100%; line-height: 100%">'
      +'<div class="progress-bar  progress-bar-success progress-bar-striped" role="progressbar"'
      +'aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width:100%">'
      +' A vous de jouer'
      +'  </div>'
      +'</div>');
  }
  else if(e == 1){
    $("#etat").html(
      '<div class="progress" style="height: 100%; line-height: 100%">'
      +'<div class="progress-bar  progress-bar-warning progress-bar-striped active" role="progressbar"'
      +'aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width:100%">'
      +' En attente de l\'adversaire'
      +'  </div>'
      +'</div>');
  }
  else if(e == 2){ // Gagné
    $("#etat").html(
      '<div class="progress" style="height: 100%; line-height: 100%">'
      +'<div class="progress-bar  progress-bar-info progress-bar-striped" role="progressbar"'
      +'aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width:100%">'
      +'Partie terminée'
      +'  </div>'
      +'</div>');
  }
  else if(e == 3){ // Problème
    $("#etat").html(
      '<div class="progress" style="height: 100%; line-height: 100%">'
      +'<div class="progress-bar  progress-bar-danger progress-bar-striped" role="progressbar"'
      +'aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width:100%">'
      +'Partie terminée'
      +'  </div>'
      +'</div>');
  }
}

function ecrireMotAFaireDeviner(m){
    $("#divmot").html("Vous devez faire deviner le mot <span class='gras'>"+m+'</span>');
}

function afficherUsername(){
  setUsername(usernameInput.val());
}

function centerInBlock(chaine) {
  $("#contenu").html("<span style='text-align:center;margin-top: 150px;display: inline-block'>"+chaine+"</span>");
}

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

function afficherAttente() {
  return "<i>Recherche d'un adversaire...</i>"
  +'<div class="progress">'
  +'<div class="progress-bar progress-bar-striped active" role="progressbar"'
  +'aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width:200%">'
  +''
  +'  </div>'
  +'</div>';
}

function getMessageGagne(data) {
return "Félicitation! Vous avez gagné en <b>"+data+"</b> coups!!<br>"
+"<button class='btnrejouer btn btn-sm btn-info active' onClick='rejouer()'>Rejouer contre la meme personne?</button>";
}

function getMessagePerdu(data) {
  if(data.n==1) {
    return "Vous n'avez pas réussi à faire deviner le mot...<br><br>"
    +"<button class='btnrejouer btn btn-sm btn-info active' onClick='rejouer()'>Rejouer contre la meme personne?</button>";

  } else {
return "Vous n'avez pas réussi à deviner le mot...<br>"
+"Il s'agissait du mot <span class='gras'>"+data.mot+"</span> <br><br>"
+"<button class='btnrejouer btn btn-sm btn-info active' onClick='rejouer()'>Rejouer contre la meme personne?</button>";
}
}

function afficherInput(data, r){
  //  0 = indice, 1 = reponse;

if( r == 0) {
  return "Vous avez recu l'indice: <b>" + data +"</b>"
  +"<div class='tmp'>"
  +"<input type='text' placeholder='Indice' autofocus class='ind' maxlength='14'> "
  +"<button id='b_ind' onClick='donnerReponse()' class='btn btn-sm btn-success'> OK </button></div>";
}
else {
  return "<div class='tmp'>"
  +"<label>Indice n°"+data+"</label> <br>"
  +"<input type='text' placeholder='Indice' autofocus class='ind' maxlength='14'> "
  +"<button id='b_ind' onClick='donnerIndice()' class='btn btn-sm btn-success'> OK </button></div>"
}

}

function verifToucheEntree(){
  $(".ind").keyup(function(event){
    if(event.keyCode == 13){
      $("#b_ind").click();
    }
  });
}
