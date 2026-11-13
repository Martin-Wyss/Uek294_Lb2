/**
 * Steuert die Kategorieübersicht und ihre Buttons.
 */
class CategoriesController {

    /**
     * Lädt die Kategorien aus der API und zeigt sie in der Tabelle an.
     * Bei einem Fehler erscheint eine Meldung.
     */
    static async loadCategories() {
        document.body.classList.add("loading");

        try {
            const response = await ApiModel.getCategories();

            if (!LoginController.hasNoAuthenticationError(response)) {
                return;
            }

            if (!response.ok) {
                document.getElementById("category-message").textContent =
                    "Kategorien konnten nicht geladen werden.";
                return;
            }

            const categories = await response.json();
            CategoriesController.showCategories(categories);

        } catch (error) {
            console.error(error.message);

            document.getElementById("category-message").textContent =
                "Die API konnte nicht erreicht werden.";
        } finally {
            document.body.classList.remove("loading");
        }
    }

    /**
     * Erstellt für jede Kategorie eine Tabellenzeile mit den Aktionsbuttons.
     * Zeigt den Aktivstatus als Ja oder Nein an.
     * Bei einer leeren Liste erscheint ein Hinweis.
     * @param categories Die Kategorienliste aus der API.
     */
    static showCategories(categories) {
        const categoryList = document.getElementById("categories-list");
        categoryList.textContent = "";

        if (categories.length === 0) {
            document.getElementById("category-message").textContent =
                "Noch keine Kategorien vorhanden.";
            return;
        }

        for (const category of categories) {
            const row = categoryList.insertRow();

            row.insertCell().textContent = category.category_id;
            row.insertCell().textContent = category.name;

            if (category.active === "1") {
                row.insertCell().textContent = "Ja";
            } else {
                row.insertCell().textContent = "Nein";
            }

            const actionsCell = row.insertCell();

            const detailsButton = document.createElement("button");
            detailsButton.type = "button";
            detailsButton.textContent = "Anzeigen / Bearbeiten";
            detailsButton.className = "table-button";
            /**
             * Öffnet die Detailseite mit der ID dieser Kategorie.
             */
            detailsButton.addEventListener("click", function () {
                window.location.href =
                    "/view/category-details.php?id=" + encodeURIComponent(category.category_id);
            });

            actionsCell.appendChild(detailsButton);

            const deleteButton = document.createElement("button");
            deleteButton.type = "button";
            deleteButton.textContent = "Löschen";
            deleteButton.className = "table-button";
            /**
             * Ruft die Löschmethode für diese Kategorie auf.
             */
            deleteButton.addEventListener("click", function () {
                CategoriesController.deleteCategory(category.category_id);
            });

            actionsCell.appendChild(deleteButton);
        }
    }

    /**
     * Fragt zuerst nach, ob die Kategorie gelöscht werden soll.
     * Nach erfolgreichem Löschen lädt die Methode die Kategorienliste neu.
     * @param categoryId Die ID der Kategorie.
     */
    static async deleteCategory(categoryId) {
        const isConfirmed = confirm(
            "Kategorie " + categoryId + " wirklich löschen?"
        );

        if (!isConfirmed) {
            return;
        }

        document.body.classList.add("loading");

        try {
            const response = await ApiModel.deleteCategory(categoryId);

            if (!LoginController.hasNoAuthenticationError(response)) {
                return;
            }

            if (!response.ok) {
                throw new Error("Die Kategorie konnte nicht gelöscht werden.");
            }

            document.getElementById("category-message").textContent =
                "Kategorie wurde gelöscht.";

            await CategoriesController.loadCategories();

        } catch (error) {
            document.getElementById("category-message").textContent =
                error.message;
        } finally {
            document.body.classList.remove("loading");
        }
    }

}

CategoriesController.loadCategories();