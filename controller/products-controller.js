/**
 * Steuert die Produktübersicht und ihre Buttons.
 */
class ProductsController {

    /**
     * Lädt die Produkte aus der API und zeigt sie in der Tabelle an.
     * Bei einem Fehler erscheint eine Meldung.
     */
    static async loadProducts() {
        document.body.classList.add("loading");

        try {
            const response = await ApiModel.getProducts();

            if (!LoginController.hasNoAuthenticationError(response)) {
                return;
            }

            if (!response.ok) {
                document.getElementById("product-message").textContent =
                    "Produkte konnten nicht geladen werden.";
                return;
            }

            const products = await response.json();
            ProductsController.showProducts(products);

        } catch (error) {
            console.error(error.message);

            document.getElementById("product-message").textContent =
                "Die API konnte nicht erreicht werden.";
        } finally {
            document.body.classList.remove("loading");
        }
    }

    /**
     * Erstellt für jedes Produkt eine Tabellenzeile mit den Aktionsbuttons.
     * Bei einer leeren Liste erscheint ein Hinweis.
     * @param products Die Produktliste aus der API.
     */
    static showProducts(products) {
        const productList = document.getElementById("products-list");
        productList.textContent = "";

        if (products.length === 0) {
            document.getElementById("product-message").textContent =
                "Noch keine Produkte vorhanden.";
            return;
        }

        for (const product of products) {
            const row = productList.insertRow();

            row.insertCell().textContent = product.sku;
            row.insertCell().textContent = product.name;
            row.insertCell().textContent = product.price;

            const actionsCell = row.insertCell();

            const detailsButton = document.createElement("button");
            detailsButton.type = "button";
            detailsButton.textContent = "Anzeigen / Bearbeiten";
            detailsButton.className = "table-button";
            /**
             * Öffnet die Detailseite mit der Artikelnummer dieses Produkts.
             */
            detailsButton.addEventListener("click", function () {
                window.location.href =
                    "/view/product-details.php?sku=" + encodeURIComponent(product.sku);
            });

            actionsCell.appendChild(detailsButton);

            const deleteButton = document.createElement("button");
            deleteButton.type = "button";
            deleteButton.textContent = "Löschen";
            deleteButton.className = "table-button";
            /**
             * Ruft die Löschmethode für dieses Produkt auf.
             */
            deleteButton.addEventListener("click", function () {
                ProductsController.deleteProduct(product.sku);
            });

            actionsCell.appendChild(deleteButton);
        }
    }

    /**
     * Fragt zuerst nach, ob das Produkt gelöscht werden soll.
     * Nach erfolgreichem Löschen lädt die Methode die Produktliste neu.
     * @param sku Die Artikelnummer des Produkts.
     */
    static async deleteProduct(sku) {
        const isConfirmed = confirm(
            "Produkt " + sku + " wirklich löschen?"
        );

        if (!isConfirmed) {
            return;
        }

        document.body.classList.add("loading");

        try {
            const response = await ApiModel.deleteProduct(sku);

            if (!LoginController.hasNoAuthenticationError(response)) {
                return;
            }

            if (!response.ok) {
                throw new Error("Das Produkt konnte nicht gelöscht werden.");
            }

            document.getElementById("product-message").textContent =
                "Produkt wurde gelöscht.";

            await ProductsController.loadProducts();

        } catch (error) {
            document.getElementById("product-message").textContent =
                error.message;
        } finally {
            document.body.classList.remove("loading");
        }
    }
}

ProductsController.loadProducts();