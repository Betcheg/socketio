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

var j1 = "";
var j2 = "";

var idJ1 = "";
var idJ2 = "";

var mots = ["chat", "chien", "groslu"];
var mot = "";

var joueurAttente = []; // Les joueur qui attendent une partie

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

  socket.on('new message', function (data) {
    socket.broadcast.emit('new message', {
      username: socket.username,
      message: data
    });
  });

  // *****************************************

  // client1 : nouveau joueur
  // serveur : nbjoueur ++
  // client1 :attente ...
  // client2 : nouveau joueur
  // serveur : -> nb joeuur ++
  // serveur : nbjoeuur = 2 => OK

  // serveur : commencer partie
  // serveur : Donner mot client 1
  // serveur : demander de deviner client2

  // ******************************************

// ============== TRAITEMENT =====================

  socket.on('add_user', function (username) {
    nombreDeJoueurTotal++;

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
      //joueurAttente.pop();
      var joueurCourant = {
      id: socket.id,
      pseudo: username,
    }
      socket.id = null;

      // Preparation de la partie

      var partieCourante = {
        joueur1: joueurCourant,
        joueur2: joueurAttente.pop(),
        motADeviner: mots[Math.floor(Math.random()*3)],
        nombreIndice: 1,
        etat: "", // Inactif ? Deco ?
        libre: false
      }
      listePartie.push(partieCourante);

      socket.broadcast.to(partieCourante.joueur1.id).emit('attente', "<i>Un joueur à été trouvé!</i>");
      socket.broadcast.to(partieCourante.joueur2.id).emit('attente', "<i>Un joueur à été trouvé!</i>");

      socket.broadcast.to(partieCourante.joueur1.id).emit('rdy', "<hr>C'est toi qui commence!");
      socket.broadcast.to(partieCourante.joueur1.id).emit('rdy', "Vous jouez contre <b>"+partieCourante.joueur2.pseudo+"</b>");
      socket.broadcast.to(partieCourante.joueur2.id).emit('rdy', "Vous jouez contre <b>"+partieCourante.joueur1.pseudo+"</b>");


      socket.broadcast.to(partieCourante.joueur1.id).emit('start', "Tu dois faire deviner le mot <b>"+partieCourante.motADeviner+"</b><hr>");
      socket.broadcast.to(partieCourante.joueur2.id).emit('start', "Tu dois essayer de DEVINER.<hr>");

      socket.broadcast.to(partieCourante.joueur1.id).emit('donner_indice', partieCourante.nombreIndice);

    }


  });

    socket.on('faire_deviner_mot', function (word) {
        socket.broadcast.to(idJ2).emit('recevoir_indice', word);
    });


    socket.on('repondre_mot', function (word) {
      socket.broadcast.to(idJ1).emit('mot_devine', j2+" a répondu : <b>"+word+"</b>");
      if (word == mot) {
        io.emit("gagner", nombreIndice);
      }
      else {
        nombreIndice++;
        socket.broadcast.to(idJ1).emit('donner_indice', nombreIndice);
    }
    });

});
