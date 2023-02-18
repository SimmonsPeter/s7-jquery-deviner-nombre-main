let aleatoire = Math.ceil(Math.random() * 100 +1); //le nombre à deviner
let nbEssais = 0; //le nombre d'essais
let usedNumbers = []; //les nombres déjà utilisés
let hint = $("#hint"); //le message d'indice

function addMsgEssais(essaiVal) {

    let msgEssais = $("#msgEssais");
    if (nbEssais === 1) {
        msgEssais.removeClass("invisible");
        //append msgEssaie it adds essai to the end of the list
        msgEssais.append(essaiVal + " ");
    } else {
        msgEssais.append("| " + essaiVal + " ");
    }
}

function checkIfUsed(essaiVal) {
    return usedNumbers.includes(essaiVal);
}

function checkAnswer(essaiVal) {
    updateDivs(essaiVal,aleatoire)
    if (parseInt(essaiVal) === aleatoire) {
        hint.text("Bravo, vous avez trouvé le nombre mystère en " + nbEssais + " essais !");
        $(".nombre:not(:contains(" + aleatoire + "))").remove();
        $(".nombre:contains(" + aleatoire + ")").addClass("numGagnant")
        $("#new-game-btn").removeClass("invisible")
        $("#submit").prop("disabled", true);

    } else if (essaiVal < aleatoire) {
        hint.text("Le nombre à deviner est plus grand!");
    } else {
        hint.text("Le nombre à deviner est plus petit!");
    }
}

function disableUsedNumbers() {
    $(".nombre").each(function () {
        if (checkIfUsed($(this).text())) {
            $(this).addClass("used");
        }
    });
}
function updateDivs(essaiVal, aleatoire) {
    $(".nombre").each(function() {
        let number = parseInt($(this).text());
        if (number > parseInt(essaiVal) && parseInt(essaiVal) > aleatoire) {
            $(this).remove(); // remove the div if its number is greater than essaiVal and greater than aleatoire
        } else if (number < parseInt(essaiVal) && parseInt(essaiVal) < aleatoire) {
            $(this).remove(); // remove the div if its number is smaller than essaiVal and smaller than aleatoire
        }

    });

}

$(function () {
    console.log(aleatoire)
    let msgEssais = $("#msgEssais");
    hint = $("#hint"); // corrected

    msgEssais.addClass("invisible");

    $("button").click(function () {

        let essai = $("#essai");
        let essaiVal = essai.val();
        if (checkIfUsed(essaiVal)) {
            hint.text("Vous avez déjà essayé ce nombre, veuillez en choisir un autre !");
        } else if (essaiVal < 1 || essaiVal > 100) {
            hint.text("Veuillez entrer un nombre entre 1 et 100");
        } else {
            usedNumbers.push(essaiVal);
            nbEssais++;
            if (nbEssais === 10) {
                addMsgEssais(essaiVal);
                hint.text("Vous avez atteint le nombre maximal d'essais !");
                essai.prop("disabled", true);
                $(this).prop("disabled", true);
                $("#new-game-btn").removeClass("invisible")
            } else {
                addMsgEssais(essaiVal);
                checkAnswer(essaiVal);
                disableUsedNumbers();
            }

        }


        essai.val("");
    });

    $('#new-game-btn').click(function () {
        location.reload();
    });

});
