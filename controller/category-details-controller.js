/**
 * Steuert das Formular zum Anzeigen, Erstellen und Bearbeiten von Kategorien.
 */
class CategoryDetailsController {

    /**
     * Verbindet das Formular mit der Speichermethode.
     * Steht eine Kategorie-ID in der Adresse, lädt die Methode diese Kategorie.
     */
    static initialize() {
        document.getElementById("category-form")
            .addEventListener("submit", CategoryDetailsController.onSubmit);

        const params = new URLSearchParams(window.location.search);
        const categoryId = params.get("id");
        const heading = document.querySelector("h1");

        if (categoryId !== null) {
            heading.textContent = "Kategorie anzeigen / bearbeiten";
            CategoryDetailsController.loadCategory(categoryId);
        } else {
            heading.textContent = "Neue Kategorie erstellen";
        }
    }

    /**
     * Lädt eine Kategorie anhand ihrer ID und füllt das Formular aus.
     * Bei einem Ladefehler erscheint eine Meldung.
     * @param categoryId Die ID der Kategorie.
     * @returns Ein Promise. Bei einer Weiterleitung zum Login ergibt es false,
     *     sonst liefert es keinen Wert.
     */
    static async loadCategory(categoryId) {
        document.body.classList.add("loading");

        try {
            const response = await ApiModel.getCategory(categoryId);

            if (!LoginController.hasNoAuthenticationError(response)) {
                return false;
            }

            if (!response.ok) {
                throw new Error("Die Kategorie konnte nicht geladen werden.");
            }

            const category = await response.json();
            CategoryDetailsController.showCategory(category);

        } catch (error) {
            document.getElementById("category-message").textContent =
                error.message;
        } finally {
            document.body.classList.remove("loading");
        }
    }

    /**
     * Verhindert das normale Absenden des Formulars und startet das Speichern.
     * @param event Das Ereignis beim Absenden des Formulars.
     */
    static onSubmit(event) {
        event.preventDefault();
        CategoryDetailsController.saveCategory();
    }

    /**
     * Liest den Namen und den Aktivstatus aus dem Formular.
     * Mit einer ID wird die bestehende Kategorie geändert.
     * Ohne ID wird eine neue Kategorie erstellt.
     * Wenn das Speichern klappt, öffnet sich die Kategorieübersicht.
     * @returns Ein Promise. Bei einer Weiterleitung zum Login ergibt es false,
     *     sonst liefert es keinen Wert.
     */
    static async saveCategory() {
        const params = new URLSearchParams(window.location.search);
        const categoryId = params.get("id");

        const name = document.getElementById("category-name").value.trim();
        const saveButton = document.querySelector("#category-form button");
        let active = 0;

        if (document.getElementById("active").checked) {
            active = 1;
        }

        if (name === "") {
            document.getElementById("category-message").textContent =
                "Bitte gib einen Namen ein.";
            return;
        }

        saveButton.disabled = true;
        document.body.classList.add("loading");

        try {
            let response;

            if (categoryId !== null) {
                response = await ApiModel.updateCategory(
                    categoryId, active, name
                );
            } else {
                response = await ApiModel.createCategory(active, name);
            }

            if (!LoginController.hasNoAuthenticationError(response)) {
                return false;
            }

            if (!response.ok) {
                throw new Error("Die Kategorie konnte nicht gespeichert werden.");
            }

            alert("Die Kategorie wurde gespeichert.");
            window.location.href = "/view/categories.php";

        } catch (error) {
            document.getElementById("category-message").textContent =
                error.message;
        } finally {
            saveButton.disabled = false;
            document.body.classList.remove("loading");
        }
    }

    /**
     * Trägt den gespeicherten Namen ins Formular ein
     * und setzt das Häkchen passend zum Aktivstatus.
     * @param category Die Kategorie aus der API.
     */
    static showCategory(category) {
        document.getElementById("category-name").value = category.name;
        document.getElementById("active").checked = category.active === "1";
    }
}

CategoryDetailsController.initialize();