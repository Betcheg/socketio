// Setup basic express server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('../..')(server);
var port = process.env.PORT || 3000;

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});
// Routing
app.use(express.static(__dirname + '/public'));

// *************************************

var nombreDeJoueurTotal = 0;  // Nombre de joueur en ligne

var mots = ["chat", "chien", "groslu"];
var mot = "";

var joueurAttente = []; // Les joueurs qui attendent une partie

// Squelette d'un joueur
var joueur = {
  id: "",
  pseudo: ""
}
// Squelette d'une partie
var partie = {
  id: 0, // optionnel
  joueur1: joueur,
  joueur2: joueur,
  motADeviner: "",
  nombreIndice: 1,
  etat: "", // Inactif ? Deco ?
  libre: true
}

var listePartie = [];
// **************************************
io.on('connection', function (socket) {

  //***************************************
  function getRandomId()
  {
    var randomId = "";
    var randomChar = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 16; i++ )
    randomId += randomChar.charAt(Math.floor(Math.random() * randomChar.length));

    return randomId;
  }

  function trouverPartie(idAchercher) {
    for (i=0; i<listePartie.length; i++){
      if(listePartie[i].id == idAchercher){
        return i;
      }
    }
    console.log("SCENARIO D'ERREUR, A TRAITER");
    return -1;
  }

  function lancerPartie(partieCourante){
    var socktmp = socket.id;
    socket.id = null;
    partieCourante.etat = "cours";
    partieCourante.nombreIndice = 1;
    partieCourante.motADeviner = mots[Math.floor(Math.random()*3)];
    socket.broadcast.to(partieCourante.joueur1.id).emit('attente', "<hr>C'est toi qui commence!");

    socket.broadcast.to(partieCourante.joueur1.id).emit('rdy', {
      idPartie: partieCourante.id,
      adversaire: partieCourante.joueur2.pseudo,
      message: "Vous jouez contre <b>"+partieCourante.joueur2.pseudo+"</b><br>"
    });

    socket.broadcast.to(partieCourante.joueur2.id).emit('rdy', {
      idPartie: partieCourante.id,
      adversaire: partieCourante.joueur1.pseudo,
      message: "Vous jouez contre <b>"+partieCourante.joueur1.pseudo+"</b><br>"
    });


    socket.broadcast.to(partieCourante.joueur1.id).emit('start', {
      idPartie: partieCourante.id,
      mot: partieCourante.motADeviner,
      message: "Tu dois faire deviner le mot <b>"+partieCourante.motADeviner+"</b><hr>"
    });


    socket.broadcast.to(partieCourante.joueur2.id).emit('start', {
      idPartie: partieCourante.id,
      mot: "",
      message: "Tu dois essayer de DEVINER.<hr>"
    });

    socket.broadcast.to(partieCourante.joueur1.id).emit('donner_indice', partieCourante.nombreIndice);
    socket.id = socktmp;
  }
  //***************************************

  // ============== TRAITEMENT =====================

  socket.on('disconnect', function() {
    var trouve = false;
    var iPartie = 0;

    for (i=0; i<joueurAttente.length; i++){
      if(joueurAttente[i].id == socket.id){
        iPartie=i;
        trouve = true;
        break;
      }
      else {
      }

    }

    if(trouve){
      joueurAttente.splice(iPartie, 1);
      nombreDeJoueurTotal--;
      //io.emit('attente', "Un joueur qui attendait s'est deco");
    }

    else {
      var nomJoueur = "";
      for (i=0; i<listePartie.length; i++){
        if(listePartie[i].joueur1.id == socket.id ){
          iPartie=i;
          trouve = true;
          nomJoueur = listePartie[i].joueur1.pseudo;
          break;
        }
        else if (listePartie[i].joueur2.id == socket.id){
          iPartie=i;
          trouve = true;
          nomJoueur = listePartie[i].joueur2.pseudo;
          break;
        }
      }

      if(trouve){
        io.emit('attente', "Un joueur dans une partie s'est deco ( "+nomJoueur+" ).");
        io.emit('attente', "La partie est donc dissoute.");
        nombreDeJoueurTotal--;
        listePartie.splice(iPartie, 1);
      }

      else {
        console.log("N'est pas censé arriver.");
        console.log("Il faut mettre les orphelins dans la file d'attente à nouveau");
      }

    }


  });

  socket.on('add_user', function (username) {
    nombreDeJoueurTotal++;
    var tmpSocketId = socket.id;

    if(joueurAttente.length == 0){
      var joueurCourant = {
        id: socket.id,
        pseudo: username,
      }
      joueurAttente.push(joueurCourant);
      socket.id = null;
      socket.broadcast.to(joueurCourant.id).emit('attente', "<i>En attente d'un second joueur</i>");
    }

    else {

      var joueurCourant = {
        id: socket.id,
        pseudo: username,
      }
      socket.id = null;

      // Preparation des informations de la partie
      var partieCourante = {
        id: getRandomId(),
        joueur1: joueurAttente.shift(),
        joueur2: joueurCourant,
        motADeviner: "",
        nombreIndice: 1,
        etat: "cours", // Cours, Finie
        libre: false
      }
      // Ajout de la partie à la liste des parties en cours
      listePartie.push(partieCourante);

      socket.broadcast.to(partieCourante.joueur1.id).emit('attente', "<i>Un joueur à été trouvé!</i>");
      socket.broadcast.to(partieCourante.joueur2.id).emit('attente', "<i>Un joueur à été trouvé!</i>");

      lancerPartie(partieCourante);

    }
    socket.id = tmpSocketId;



  });

  socket.on('faire_deviner_mot', function (data) {

    var iPartie = trouverPartie(data.idPartie);
    if(iPartie == -1){
      console.log("SCENARIO D'ERREUR, A TRAITER");
    }
    else{
      socket.broadcast.to(listePartie[iPartie].joueur2.id).emit('recevoir_indice', data.indice);
    }
  });


  socket.on('repondre_mot', function (data) {
    var tmp = socket.id;
    socket.id = null;

    var iPartie = trouverPartie(data.idPartie);
    if(iPartie == -1){
      console.log("SCENARIO D'ERREUR, A TRAITER");
    }
    else{

      socket.broadcast.to(listePartie[iPartie].joueur1.id).emit('mot_devine', listePartie[iPartie].joueur2.pseudo+" a répondu : <b>"+data.mot+"</b>");

      if (listePartie[iPartie].motADeviner == data.mot) {
        socket.broadcast.to(listePartie[iPartie].joueur1.id).emit('gagner', listePartie[iPartie].nombreIndice);
        socket.broadcast.to(listePartie[iPartie].joueur2.id).emit('gagner', listePartie[iPartie].nombreIndice);
        listePartie[iPartie].etat = "finie";
      }
      else {
        listePartie[iPartie].nombreIndice++;
        socket.broadcast.to(listePartie[iPartie].joueur1.id).emit('donner_indice', listePartie[iPartie].nombreIndice);
      }
    }
    socket.id=tmp;
  });

  socket.on('rejouer', function(data) {
    var iPartie = trouverPartie(data.idPartie);
    if(iPartie == -1){
            console.log("SCENARIO D'ERREUR, A TRAITER");
    }
    else {
      if(listePartie[iPartie].etat == "finie") { // La partie est finie, 1 seule personne souhaite rejouer
        listePartie[iPartie].etat = "attentedeuxiemejoueur";
      }
      else if(listePartie[iPartie].etat == "attentedeuxiemejoueur"){ // Les 2 joueurs souhaitent rejouer
        // On echange les roles
        var tmp = listePartie[iPartie].joueur1;
        listePartie[iPartie].joueur1 = listePartie[iPartie].joueur2;
        listePartie[iPartie].joueur2 = tmp;
        // On lance la partie
        lancerPartie(listePartie[iPartie]);
      }
    }
  });

});
