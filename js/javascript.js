/* Fonction pour afficher un message quand l'utilisateur clique sur le bouton */
function contact() {
    var ok = true;
    var errorMsg = "Veuillez corriger les erreurs suivantes : \n\n";
    const name = document.querySelector('input[name="name"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const commentaire = document.getElementById("comment").value;
    const radios = document.getElementsByName("inlineRadioOptions");
    const info = radios[0].checked;
    const job = radios[1].checked;

    if (name == "") {
        errorMsg += "- Nom manquant.\n";
        ok = false;
    }

    if (email == "") {
        errorMsg += "- Email manquant.\n";
        ok = false;
    }

    if (commentaire == "") {
        errorMsg += "- Commentaire manquant.\n";
        ok = false;
    }

    if (!info && !job) {
        errorMsg += "- Choisissez une des deux options : Demande d'informations ou Proposition d'emploi\n";
        ok = false;
    }

    if (!ok) {
        alert(errorMsg)
    } else {
        alert("Merci ! Nous vous recontacterons dans les plus brefs délais.")
    }
}