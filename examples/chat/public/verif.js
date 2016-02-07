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




var accent={
    "é":"e", "è":"e", "ê":"e", "ë":"e",
    "ç":"c",
    "à":"a", "â":"a", "ä":"a",
    "î":"i", "ï":"i",
    "ù":"u",
    "ô":"o", "ó":"o", "ö":"o"};

function enleve_accent(chaine){
    for(i in accent){
	chaine=chaine.replace(new RegExp(i,"gi"),accent[i])
    }
    return chaine.toLowerCase()
}



// cette fonction prends en argument le mot à faire deviner et un essaie d'indice.
function indice(a_deviner,essaie)
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


    //alert(a_deviner);
    //alert(exp_reg);

    return (valide);
}





// cette fonction prends en argument le mot à faire deviner et une réponse et renvoie le duo : valide et trouvé.
function legal(essaie)
{

    var valide = true;

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

function trouver(a_deviner,essaie)
{

    essaie=essaie.toLowerCase();
    a_deviner=a_deviner.toLowerCase();
    essaie = enleve_accent(essaie) ;
    a_deviner= enleve_accent(a_deviner);

    return (a_deviner===essaie);
}

// tests :
alert(indice("notre", "ahahah"));
alert(legal("pédé"));
alert(trouver("noél","Noel"));
