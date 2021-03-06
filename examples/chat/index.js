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

var mots = ["angle","armoire","banc","bureau","cabinet","carreau","chaise","classe","clé","coin","couloir","dossier","eau","école","écriture","entrée","escalier","étagère","étude","extérieur","fenêtre","intérieur","lavabo","lecture","lit","marche","matelas","maternelle","meuble","mousse","mur","peluche","placard","plafond","porte","portemanteau","poubelle","radiateur","rampe","récréation","rentrée","rideau","robinet","salle","savon","serrure","serviette","siège","sieste","silence","sol","sommeil","sonnette","sortie","table","tableau","tabouret","tapis","tiroir","toilette","vitre","w.-c.","crayon","stylo","feutre","taille-crayon","pointe","mine","gomme","dessin","coloriage","rayure","peinture","pinceau","couleur","craie","papier","feuille","cahier","carnet","carton","ciseaux","découpage","pliage","pli","colle","affaire","boîte","casier","caisse","trousse","cartable","jouet","jeu","pion","dé","domino","puzzle","cube","perle","chose","forme :carré","rond","pâteàmodeler","tampon","livre","histoire","bibliothèque","image","album","titre","bandedessinée","conte","dictionnaire","magazine","catalogue","page","ligne","mot","enveloppe","étiquette","carted’appel :affiche","alphabet","appareil","caméscope","cassette","cédé","cédérom","chaîne","chanson","chiffre","contraire","différence","doigt","écran","écriture","film","fois","idée","instrument","intrus","lettre","liste","magnétoscope","main","micro","modèle","musique","nom","nombre","orchestre","ordinateur","photo","point","poster","pouce","prénom","question","radio","sens","tambour","télécommande","téléphone","télévision","trait","trompette","voix","xylophone","zéro","ami","attention","camarade","colère","copain","coquin","dame","directeur","directrice","droit","effort","élève","enfant","fatigue","faute","fille","garçon","gardien","madame","maître","maîtresse","mensonge","ordre","personne","retard","sourire","travail","arrosoir","assiette","balle","bateau","boîte","bouchon","bouteille","bulles","canard","casserole","cuillère","cuvette","douche","entonnoir","gouttes","litre","moulin","pluie","poisson","pont","pot","roue","sacenplastique","saladier","seau","tablier","tasse","trous","verre","anorak","arc","bagage","baguette","barbe","bonnet","botte","bouton","bretelle","cagoule","casque","casquette","ceinture","chapeau","chaussette","chausson","chaussure","chemise","cigarette","col","collant","couronne","cravate","culotte","écharpe","épée","fée","flèche","fusil","gant","habit","jean","jupe","lacet","laine","linge","lunettes","magicien","magie","maillot","manche","manteau","mouchoir","moufle","nœud","paire","pantalon","pied","poche","prince","pull-over","pyjama","reine","robe","roi","ruban","semelle","soldat","sorcière","tache","taille","talon","tissu","tricot","uniforme","valise","veste","vêtement","aiguille","ampoule","avion","bois","bout","bricolage","bruit","cabane","carton","clou","colle","crochet","élastique","ficelle","fil","marionnette","marteau","métal","mètre","morceau","moteur","objet","outil","peinture","pinceau","planche","plâtre","scie","tournevis","vis","voiture","accident","aéroport","auto","camion","engin","feu","frein","fusée","garage","gare","grue","hélicoptère","moto","panne","parking","pilote","pneu","quai","train","virage","vitesse","voyage","wagon","zigzag","acrobate","arrêt","arrière","barre","barreau","bord","bras","cerceau","chaises","cheville","chute","cœur","corde","corps","côté","cou","coude","cuisse","danger","doigts","dos","échasses","échelle","épaule","équipe","escabeau","fesse","filet","fond","genou","gymnastique","hanche","jambes","jeu","mains","milieu","montagne","murd’escalade","muscle","numéro","ongle","parcours","pas","passerelle","pente","peur","pieds","plongeoir","poignet","poing","pontdesinge","poutred’équilibre","prises","rivièredescrocodiles","roulade","saut","serpent","sport","suivant","tête","toboggan","tour","trampoline","tunnel","ventre","bagarre","balançoire","ballon","bande","bicyclette","bille","cadenas","cageàécureuil","cerf-volant","château","coup","cour","course","échasse","flaque","paix","pardon","partie","pédale","pelle","pompe","préau","raquette","rayon","récréation","sable","sifflet","signe","tas","tricycle","tuyau","vélo","filet","allumette","anniversaire","appétit","beurre","coquille","crêpes","croûte","dessert","envie","faim","fève","four","galette","gâteau","goût","invitation","langue","lèvres","liquide","louche","mie","moitié","moule","odeur","œuf","part","pâte","pâtisserie","recette","rouleau","sel","soif","tarte","tranche","yaourt","glaçon","jus","kiwi","lame","mûre","noyau","paille","pamplemousse","râpe","arête","femme","frite","gobelet","jambon","os","poulet","purée","radis","restaurant","sole","animal","bébés","bouche","cage","câlin","caresse","cochond’Inde","foin","graines","hamster","lapin","maison","nez","œil","oreille","patte","toit","yeux","légume","abeille","agneau","aile","âne","arbre","bain","barque","bassin","bébé","bec","bête","bœuf","bottedefoin","boue","bouquet","bourgeon","branche","caillou","campagne","car","champ","chariot","chat","cheminée","cheval","chèvre","chien","cochon","colline","coq","coquelicot","crapaud","cygne","départ","dindon","escargot","étang","ferme","fermier","feuille","flamme","fleur","fontaine","fumée","grain","graine","grenouille","griffe","guêpe","herbe","hérisson","insecte","jardin","mare","marguerite","miel","morceaudepain","mouche","mouton","oie","oiseau","pierre","pigeon","plante","plume","poney","poule","poussin","prairie","rat","rivière","route","tortue","tracteur","tulipe","vache","vétérinaire","aigle","animaux","aquarium","bêtes","cerf","chouette","cigogne","crocodile","dauphin","éléphant","girafe","hibou","hippopotame","kangourou","lion","loup","ours","panda","panthère","perroquet","phoque","renard","requin","rhinocéros","singe","tigre","zèbre","zoo","épingle","bâton","bêtise","bonhomme","bottes","canne","cauchemar","cri","danse","déguisement","dinosaure","drapeau","enargent","enor","enrang","fête","figure","géant","gens","grand-mère","grand-père","joie","joue","journaux","maquillage","masque","monsieur","moustache","ogre","princesse","rue","trottoir","Noël","boule","cadeau","canneàpêche","chance","cube","guirlande","humeur","papillon","spectacle","surprise","trou","visage","âge","an","année","après-midi","calendrier","début","dimanche","été","étoile","fin","heuredesmamans","heure","hiver","horloge","jeudi","jour","journée","lumière","lundi","lune","mardi","matin","mercredi","midi","minuit","minute","mois","moment","montre","nuit","ombre","pendule","retour","réveil","saison","samedi","semaine","soir","soleil","temps","univers","vacances","vendredi","air","arc-en-ciel","brouillard","ciel","éclair","flocon","goutte","hirondelle","luge","neige","nuage","orage","ouragan","parapluie","parasol","ski","tempête","thermomètre","tonnerre","traîneau","vent","assiette","balai","biscuit","boisson","bol","bonbon","céréale","confiture","coquetier","couteau","couvercle","couvert","cuillère","cuisine","cuisinière","désordre","dînette","éponge","évier","four","fourchette","lait","lave-linge","lessive","machine","nappe","pain","pile","plat","plateau","poêle","réfrigérateur","repas","tartine","torchon","vaisselle","argent","aspirateur","bague","barrette","bijou","bracelet","brosse","cadre","canapé","chambre","cheveu","chiffon","cil","coffre","coffret","collier","couette","coussin","couverture","dent","dentifrice","drap","fauteuil","feràrepasser","frange","glace","lampe","lit","ménage","or","oreiller","parfum","peigne","pouf","poupée","poussette","poussière","shampoing","sourcil","trésor","tube","vase","adulte","album","amour","baiser","bavoir","biberon","bisou","caprice","cimetière","cousin","cousine","crèche","fils","frère","grand-parent","homme","jumeau","maman","mari","mariage","mère","papa","parent","père","petit-enfant","petit-fils","petite-fille","rasoir","sœur","ambulance","bosse","champignon","dentiste","docteur","fièvre","front","gorge","infirmier","infirmière","jambe","larme","médecin","menton","mine","ordonnance","pansement","peau","piqûre","poison","sang","santé","squelette","trousse","araignée","brouette","chenille","coccinelle","fourmi","herbe","jonquille","lézard","pâquerette","rangée","râteau","rosé","souris","taupe","terrain","terre","terrier","tige","ver","portière","sac","billet","caisse","farce","grimace","grotte","pays","regard","ticket","bûche","buisson","camp","chasseur","châtaigne","chemin","chêne","corbeau","écorce","écureuil","forêt","gourde","lac","loupe","lutin","marron","mûre","moustique","muguet","nid","paysage","pin","rocher","sapin","sommet","tente","adresse","appartement","ascenseur","balcon","boucherie","boulanger","boulangerie","boutique","bus","caniveau","caravane","carrefour","cave","charcuterie","cinéma","cirque","clind’œil","cloche","clocher","clown","coiffeur","colis-route","courrier","croix","église","embouteillage","endroit","enveloppe","essence","facteur","fleuriste","foire","hôpital","hôtel","immeuble","incendie","laisse","magasin","manège","médicament","moineau","monde","monument","ouvrier","palais","panneau","paquet","parc","passage","pharmacie","pharmacien","piscine","place","police","policier","pompier","poste","promenade","quartier","square","timbre","travaux","usine","village","ville","voisin","volet","abricot","ail","aliment","ananas","banane","bifteck","café","carotte","cerise","chocolat","chou","citron","citrouille","clémentine","concombre","coquillage","corbeille","crabe","crevette","endive","farine","fraise","framboise","fromage","fruit","gâteau","haricot","huile","légume","marchand","melon","monnaie","navet","noisette","noix","nourriture","oignon","orange","panier","pâtes","pêche","persil","petitpois","poire","poireau","pomme","pommedeterre","prix","prune","queue","raisin","riz","salade","sucre","thé","tomate","viande","vin","baleine","bouée","île","jumelles","marin","mer","mouette","navire","pêcheur","plage","poisson","port","sardine","serviette","vague","voile"];
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
    tour: joueur,
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

    function verifierPartie(partieCoteClient, iPartie) {
        var partieCoteServeur=listePartie[iPartie];
        if( ((partieCoteClient.pseudo==partieCoteServeur.joueur1.pseudo && partieCoteClient.adversaire==partieCoteServeur.joueur2.pseudo)
                    || (partieCoteClient.pseudo==partieCoteServeur.joueur2.pseudo && partieCoteClient.adversaire==partieCoteServeur.joueur1.pseudo))
                && partieCoteClient.idPartie==partieCoteServeur.id ) return true;
        else {
            console.log( "La partie" + partieCoteClient.idPartie + " " + partieCoteServeur.id + "is" + (partieCoteClient.idPartie==partieCoteServeur.id) );
            console.log("first "+(partieCoteClient.pseudo==partieCoteServeur.joueur1 && partieCoteClient.adversaire==partieCoteServeur.joueur2));
            console.log("second" + (partieCoteClient.pseudo==partieCoteServeur.joueur2.pseudo && partieCoteClient.adversaire==partieCoteServeur.joueur1));
            console.log();
            console.log();

            return false;
        }
    }

    function changerTour(iPartie) {
        if(listePartie[iPartie].joueur1==listePartie[iPartie].tour){
            listePartie[iPartie].tour=listePartie[iPartie].joueur2;
        }
        else if(listePartie[iPartie].joueur2==listePartie[iPartie].tour){
            listePartie[iPartie].tour=listePartie[iPartie].joueur1;
        }
        else {
            console.log("ERR");
        }
        //console.log("Maintenant au tour de " +listePartie[iPartie].tour.id);
    };

    function verifierInput(c){
        if(c.length <= 14) return true;
        else {
            console.log("mauvais input");
            console.log(c);
            console.log(c.length);
            return false;
        }
    }

    function verifierTour(j, i){
        var partieCoteServeur=listePartie[i];
        if( partieCoteServeur.tour.id==j) return true;
        else {
            console.log(partieCoteServeur.tour.id);
            console.log(j);
            console.log("mauvais tour");
            return false;
        }
    }


    var accent={
        "é":"e", "è":"e", "ê":"e", "ë":"e",
        "ç":"c",
        "à":"a", "â":"a", "ä":"a",
        "î":"i", "ï":"i",
        "ù":"u",
        "ô":"o", "ó":"o", "ö":"o"};


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

    function enleve_accent(chaine){
        for(i in accent){
            chaine=chaine.replace(new RegExp(i,"gi"),accent[i])
        }
        return chaine.toLowerCase()
    }

    function trouverMot(a_deviner,essaie)
    {
        essaie=essaie.toLowerCase();
        a_deviner=a_deviner.toLowerCase();
        essaie = enleve_accent(essaie) ;
        a_deviner= enleve_accent(a_deviner);

        return (a_deviner===essaie);
    }

    // cette fonction prends en argument le mot à faire deviner et un essaie d'indice.
    function indiceValide(a_deviner,essaie)
    {
        var valide = true;
        a_deviner=a_deviner.toLowerCase();
        essaie=essaie.toLowerCase();
        var exp_reg = "";
        for (var i=0; i < (a_deviner.length); i++ )
        {
            exp_reg = exp_reg.concat(a_deviner.charAt(i));
            exp_reg = exp_reg.concat("{1,}");
        }
        exp_reg=exp_reg.concat("");

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

    function lancerPartie(partieCourante){
        var socktmp = socket.id;
        socket.id = null;
        partieCourante.etat = "cours";
        partieCourante.nombreIndice = 1;
        partieCourante.motADeviner = mots[Math.floor(Math.random()*1075)];
        partieCourante.tour=partieCourante.joueur1;

        socket.broadcast.to(partieCourante.joueur1.id).emit('rdy', {
            idPartie: partieCourante.id,
            joueur: partieCourante.joueur1.pseudo,
            jid: partieCourante.joueur1.id,
            adversaire: partieCourante.joueur2.pseudo,
            commence: 1,
            mot: partieCourante.motADeviner,
        });

        socket.broadcast.to(partieCourante.joueur2.id).emit('rdy', {
            idPartie: partieCourante.id,
            joueur: partieCourante.joueur2.pseudo,
            jid: partieCourante.joueur2.id,
            adversaire: partieCourante.joueur1.pseudo,
            mot: "",
            commence: 0,
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
                if(nomJoueur == listePartie[iPartie].joueur1.pseudo){
                    socket.broadcast.to(listePartie[iPartie].joueur2.id).emit('adversaireDeconnecte', listePartie[iPartie].joueur1.pseudo);
                }
                else {
                    socket.broadcast.to(listePartie[iPartie].joueur1.id).emit('adversaireDeconnecte', listePartie[iPartie].joueur2.pseudo);
                }
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

            socket.broadcast.to(joueurCourant.id).emit('attenteAdversaire', "");
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

            //socket.broadcast.to(partieCourante.joueur1.id).emit('begin', "<i>Un joueur à été trouvé!</i>");
            //socket.broadcast.to(partieCourante.joueur2.id).emit('begin', "<i>Un joueur à été trouvé!</i>");

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
            if(verifierPartie(data, iPartie)
                    && verifierInput(data.indice)
                    && verifierTour(data.jid, iPartie)
                    && indiceValide(listePartie[iPartie].motADeviner, data.indice)
              ) { // On verifie que les infos rentrées par l'user sont valable
                socket.broadcast.to(listePartie[iPartie].joueur2.id).emit('recevoir_indice', data.indice);
                changerTour(iPartie);
            }

            else {
                var tmp = socket.id;
                socket.id =null;
                socket.broadcast.to(listePartie[iPartie].joueur1.id).emit('tricheDetectee', listePartie[iPartie].joueur2.pseudo);
                socket.broadcast.to(listePartie[iPartie].joueur2.id).emit('adversaireDeconnecte', listePartie[iPartie].joueur1.pseudo);
                socket.id = tmp;
                console.log("Scenario de triche 1");
                if(!verifierPartie(data, iPartie)) console.log("A");
 if(!verifierInput(data.indice)) console.log("B");
 if(!verifierTour(data.jid, iPartie)) console.log("C");
 if(!indiceValide(data.indice, listePartie[iPartie].motADeviner)) console.log("D");

            }
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

            if(verifierPartie(data, iPartie)
                    && verifierInput(data.mot)
                    && verifierTour(data.jid, iPartie)

              ) { // On verifie que les infos rentrées par l'user sont valable
                socket.broadcast.to(listePartie[iPartie].joueur1.id).emit('mot_devine',data.mot);

                if (trouverMot(listePartie[iPartie].motADeviner, data.mot)) {
                    socket.broadcast.to(listePartie[iPartie].joueur1.id).emit('gagner', listePartie[iPartie].nombreIndice);
                    socket.broadcast.to(listePartie[iPartie].joueur2.id).emit('gagner', listePartie[iPartie].nombreIndice);
                    listePartie[iPartie].etat = "finie";
                }
                else {
                    listePartie[iPartie].nombreIndice++;
                    if (listePartie[iPartie].nombreIndice > 4 ) {
                        socket.broadcast.to(listePartie[iPartie].joueur1.id).emit('perdu', {n:1,mot:listePartie[iPartie].motADeviner});
                        socket.broadcast.to(listePartie[iPartie].joueur2.id).emit('perdu', {n:2,mot:listePartie[iPartie].motADeviner});
                        listePartie[iPartie].etat = "finie";
                    }
                    else {
                        socket.broadcast.to(listePartie[iPartie].joueur1.id).emit('donner_indice', listePartie[iPartie].nombreIndice);
                        changerTour(iPartie);
                    }
                }
            }
            else {
                var tmp = socket.id;
                socket.id =null;
                socket.broadcast.to(listePartie[iPartie].joueur1.id).emit('adversaireDeconnecte', listePartie[iPartie].joueur2.pseudo);
                socket.broadcast.to(listePartie[iPartie].joueur2.id).emit('tricheDetectee', listePartie[iPartie].joueur1.pseudo);
                socket.id = tmp;
                console.log("Scenario d'erreur 2");
            }
        }
        socket.id=tmp;
    });

    socket.on('rejouer', function(data) {
        var iPartie = trouverPartie(data.idPartie);
        console.log("rejouer");
        if(iPartie == -1){
            console.log("SCENARIO D'ERREUR, A TRAITER");
            // Si la partie n'est pas trouvée c'est qu'elle a été dissoute. On remet alors le joueur dans la file
            /*  if(joueurAttente.length == 0){
                var joueurCourant = {
                id: socket.id,
                pseudo: username,
                }
                joueurAttente.push(joueurCourant);
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
            } */
        }
        else {
            if(listePartie[iPartie].etat == "finie") { // La partie est finie, 1 seule personne souhaite rejouer
                listePartie[iPartie].etat = "attentedeuxiemejoueur";
                console.log("attente2emej");
            }
            else if(listePartie[iPartie].etat == "attentedeuxiemejoueur"){ // Les 2 joueurs souhaitent rejouer
                // On echange les roles
                var tmp = listePartie[iPartie].joueur1;
                listePartie[iPartie].joueur1 = listePartie[iPartie].joueur2;
                listePartie[iPartie].joueur2 = tmp;
                // On lance la partie
                lancerPartie(listePartie[iPartie]);
                console.log("lancer");
            }
        }
    });

});
