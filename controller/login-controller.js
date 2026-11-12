class LoginController {

    static onSubmit(event) {
        //verhindert das die seite beim absenden neu geladen wird
        event.preventDefault();
        document.body.classList.add("loading");
        LoginController.sendLogin();
    }

    /**
    * Sendet die Anmeldedaten an die API und prüft die Antwort.
    */
    static async sendLogin() {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        try {
            let response = await ApiModel.sendLogin(username, password);

            if (!response.ok) {
                alert("Login gescheitert überprüfe deine Anmeldedaten.");
                return;
            }

            LoginController.loginSuccessfully();

        } catch (error) {
            console.error(error.message);
            alert("Die Anmeldung konnte nicht abgeschlossen werden.");
        } finally {
            document.body.classList.remove("loading");
        }
    }

    /**
    * Öffnet nach der Anmeldung die gewünschte Seite.
    */
    static loginSuccessfully() {
        const returnPage = sessionStorage.getItem("returnPage");
        sessionStorage.removeItem("returnPage");

        if (returnPage !== null && returnPage.startsWith("/view/")) {
            window.location.href = returnPage;
        } else {
            window.location.href = "/view/products.php";
        }
    }

    /**
    * Verbindet den Abmelden-Button mit der Abmeldung.
    */
    static initialize() {
        const logoutButton = document.getElementById("logout-button");

        if (logoutButton !== null) {
            logoutButton.addEventListener("click", LoginController.logout);
        }
    }

    /**
    * Öffnet bei fehlender Anmeldung die Login-Seite.
    * @param response Die Antwort der API.
    * @returns Ob kein Anmeldefehler vorliegt.
    */
    static checkAuthentication(response) {
        if (response.status === 401) {
            sessionStorage.setItem(
                "returnPage",
                window.location.pathname + window.location.search
            );

            window.location.href = "/index.php";
            return false;
        }

        return true;
    }

    /**
     * Meldet den Benutzer bei der API ab.
     */
    static async logout() {
        const logoutButton = document.getElementById("logout-button");
        logoutButton.disabled = true;
        document.body.classList.add("loading");

        try {
            const response = await ApiModel.sendLogout();

            if (!response.ok) {
                throw new Error("Abmelden fehlgeschlagen.");
            }

            window.location.href = "/index.php";

        } catch (error) {
            alert(error.message);
        } finally {
            logoutButton.disabled = false;
            document.body.classList.remove("loading");
        }
    }
}

LoginController.initialize();