/**
 * Steuert die Anmeldung, die Abmeldung und die Weiterleitung nach dem Login.
 */
class LoginController {
    /**
     * Verhindert das normale Absenden des Formulars und startet die Anmeldung.
     * @param event Das Ereignis beim Absenden des Formulars.
     */
    static onSubmit(event) {
        //verhindert das die seite beim absenden neu geladen wird
        event.preventDefault();
        document.body.classList.add("loading");
        LoginController.sendLogin();
    }

    /**
  * Liest Benutzername und Passwort aus und sendet sie an die API.
  * Wenn die Anmeldung klappt, startet die Weiterleitung.
  * Bei einem Fehler erscheint eine Meldung.
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
     * Öffnet nach dem Login die vorher gemerkte Seite.
     * Wenn keine Seite gespeichert ist, öffnet sich die Produktübersicht.
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
     * Verbindet den Abmelden-Button mit der Abmeldung, wenn es den Button auf der Seite gibt.
     */
    static initialize() {
        const logoutButton = document.getElementById("logout-button");

        if (logoutButton !== null) {
            logoutButton.addEventListener("click", LoginController.logout);
        }
    }

    /**
     * Merkt sich bei Status 401 die aktuelle Seite und öffnet die Anmeldung.
     * @param response Die Antwort der API.
     * @returns false bei Status 401, sonst true.
     */
    static hasNoAuthenticationError(response) {
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
     * Wenn die Abmeldung klappt, öffnet sich die Anmeldeseite.
     * Bei einem Fehler erscheint eine Meldung.
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