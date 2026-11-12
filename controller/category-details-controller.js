/**
 * Steuert die Kategoriedetailseite.
 */
class CategoryDetailsController {

    /**
     * Erkennt, ob eine Kategorie erstellt oder bearbeitet werden soll.
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
     * Lädt die gewählte Kategorie aus der API.
     * @param categoryId Die ID der Kategorie.
     */
    static async loadCategory(categoryId) {
        document.body.classList.add("loading");

        try {
            const response = await ApiModel.getCategory(categoryId);

            if (!LoginController.checkAuthentication(response)) {
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
    * Verhindert das normale Absenden und startet das Speichern.
    * @param event Das Absendeereignis des Formulars.
    */
    static onSubmit(event) {
        event.preventDefault();
        CategoryDetailsController.saveCategory();
    }

    /**
     * Erstellt eine Kategorie oder speichert ihre Änderungen.
     */
    static async saveCategory() {
        const params = new URLSearchParams(window.location.search);
        const categoryId = params.get("id");

        const name = document.getElementById("category-name").value.trim();
        const saveButton = document.querySelector("#category-form button");
        let active = "0";

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

            if (!LoginController.checkAuthentication(response)) {
                return false;
            }

            if (!response.ok) {
                throw new Error("Die Kategorie konnte nicht gespeichert werden.");
            }

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
     * Füllt das Formular mit den Kategoriedaten.
     * @param category Die geladene Kategorie.
     */
    static showCategory(category) {
        document.getElementById("category-name").value = category.name;
        document.getElementById("active").checked = category.active === "1";
    }
}

CategoryDetailsController.initialize();