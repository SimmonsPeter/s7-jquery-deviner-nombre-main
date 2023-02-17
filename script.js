let aleatoire = Math.ceil(Math.random() * 100); //le nombre à deviner
let nbEssais = 0; //le nombre d'essais
let usedNumbers = []; //les nombres déjà utilisés
let hint = $("#hint"); //le message d'indice

function addMsgEssais(essai) {
    let msgEssais = $("#msgEssais");
    if (nbEssais === 1) {
        msgEssais.removeClass("invisible");
        //append msgEssaie it adds essai to the end of the list
        msgEssais.append(essai + " ");
    } else {
        msgEssais.append("| " + essai + " ");
    }
}

function checkIfUsed(essai) {
    return usedNumbers.includes(essai);
}

function checkAnswer(essai) {
    if (essai === aleatoire) {
        hint.text("Bravo, vous avez trouvé le nombre mystère en " + nbEssais + " essais !");
    }else if (essai < aleatoire) {
        hint.text("Le nombre à deviner est plus grand!");
    } else{
        hint.text("Le nombre à deviner est plus petit!");}
}

function disableUsedNumbers(){
    $(".nombre").each(function() {
        if (checkIfUsed($(this).text())) {
            $(this).addClass("used");
        }
    });
}

$(function () {
    let msgEssais = $("#msgEssais");
    hint = $("#hint"); // corrected

    msgEssais.addClass("invisible");

    $("button").click(function () {
        let essai = $("#essai").val();
        if (checkIfUsed(essai)) {
            hint.text("Vous avez déjà essayé ce nombre, veuillez en choisir un autre !");
        } else {
            usedNumbers.push(essai);
            nbEssais++;
            if (nbEssais === 10) {
                addMsgEssais(essai);
                hint.text("Vous avez atteint le nombre maximal d'essais !");
                essai.prop("disabled", true);
                $(this).prop("disabled", true);
            } else {
                addMsgEssais(essai);
                checkAnswer(essai);
                disableUsedNumbers();
            }
        }
    });
});
