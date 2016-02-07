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
  motADeviner: ""
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
  if(indice.val().length > 2 && legal(indice.val()) && indiceValide(partieCourante.motADeviner,indice.val())){
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
  if(indice.val().length > 2 && legal(indice.val())){
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

// ======

var mot_interdit = [
  "ABRUTI",
  "ABRUTIE",
  "BAISE",
  "BAISÉ",
  "BAISER",
  "BATARD",
  "BITE",
  "BOUGNOUL",
  "BRANLEUR",
  "BURNE",
  "CHIER",
  "COCU",
  "CON",
  "CONNARD",
  "CONNASSE",
  "CONNE",
  "COUILLE",
  "COUILLON",
  "COUILLONNE",
  "CREVARD",
  "CUL",
  "ENCULE",
  "ENCULÉ",
  "ENCULEE",
  "ENCULÉE",
  "ENCULER",
  "ENFOIRE",
  "ENFOIRÉ",
  "FESSE",
  "FION",
  "FOUTRE",
  "M'EMMERDES",
  "MEMMERDES",
  "MERDE",
  "NAZI",
  "HITLER",
  "HEILHITLER",
  "NEGRE",
  "NÈGRE",
  "NEGRESSE",
  "NÉGRESSE",
  "NIQUE",
  "NIQUER",
  "PARTOUZE",
  "PD",
  "PEDE",
  "PÉDÉ",
  "PETASSE",
  "PÉTASSE",
  "PINE",
  "POUFFE",
  "POUFFIASSE",
  "PUTAIN",
  "PUTE",
  "SALAUD",
  "SALEJUIF",
  "SALEARABE",
  "SALOP",
  "SALOPARD",
  "SALOPE",
  "SODOMIE",
  "SUCER",
  "T'ENCULE",
  "TABARNAK",
  "TAPETTE",
  "TARE",
  "TARÉ",
  "TENCULE",
  "TROUDUC",
  "VAGIN",
  "VIOL",
  "ZOB"] ;

// cette fonction prends en argument le mot à faire deviner et un essaie d'indice.
function indiceValide(a_deviner,essaie)
{
  var valide = true;
  a_deviner=a_deviner.toLowerCase();
  essaie=essaie.toLowerCase();
  var exp_reg = "^(.*)";
  for (var i=0; i < (a_deviner.length); i++ )
  {
    exp_reg = exp_reg.concat(a_deviner.charAt(i));
    exp_reg = exp_reg.concat("{1,}");
  }
  exp_reg=exp_reg.concat("(.*)$");

  if (!(essaie.indexOf(" ")===-1) || !(essaie.indexOf("_")===-1) )
  {
    valide = false;
  }

  else
  {
    var re = RegExp(exp_reg);

    if (re.test(essaie))
    {
      valide = false;
    }

    else
    {
      var une_difference = false;
      var deux_difference = false;
      var trois_difference = false;

      //la on va regarder si ya au moins trois caracteres de differents :)
      for (var i=0; i < (a_deviner.length); i++ )
      {
        if (!(a_deviner.charAt(i) === essaie.charAt(i)))
        {
          if (une_difference)
          {
            if (deux_difference)
            {
              trois_difference=true;
            }

            else
            {
              (deux_difference=true);
            }
          }

          else
          {
            une_difference = true;
          }
        }


      }
      valide=trois_difference && valide;

      essaie=essaie.toUpperCase();
      if (!(mot_interdit.indexOf(essaie)=== -1))
      {
        valide=false;
      }
    }
  }

  return (valide);
}

// cette fonction prends en argument le mot à faire deviner et une réponse et renvoie le duo : valide et trouvé.
function legal(essaie)
{
  var valide = true;
  var trouve = false;

  if (!(essaie.indexOf(" ")===-1) || !(essaie.indexOf("_")===-1) )
  {
    valide = false;
  }

  essaie=essaie.toUpperCase();
  if (!(mot_interdit.indexOf(essaie)=== -1))
  {
    valide=false;
  }

  return valide;
}
