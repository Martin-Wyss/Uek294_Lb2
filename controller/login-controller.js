class LoginController {
        
    static onSubmit(event) {
        //verhindert das die seite beim absenden neu geladen wird
        event.preventDefault();
        LoginController.sendLogin();
    }

    //macht das der code weiter geht und wartet nicht bis es fertig ist.
    static async sendLogin() {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        try {
            let response = await ApiModel.sendLogin(username, password);

            if (!response.ok) {
                alert("Login gescheitert überprüfe deine Anmeldedaten.");
                return;
            }

            console.log("Login erfolgreich");
        } catch (error) {
            console.error(error.message);
        }
    }
}

document
    .querySelector("#login-form")
    //ruft die Funktion onSubmit auf sobald auf Knopf gedrückt
    .addEventListener("submit", LoginController.onSubmit);