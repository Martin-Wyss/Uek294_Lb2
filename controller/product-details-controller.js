/**
 * Steuert das Formular zum Anzeigen, Erstellen und Bearbeiten von Produkten.
 */
class ProductDetailsController {

    /**
     * Verbindet das Formular mit der Speichermethode und lädt die Kategorien.
     * Steht eine Artikelnummer in der Adresse, lädt die Methode auch das Produkt.
     */
    static async initialize() {
        document.getElementById("product-form")
            .addEventListener("submit", ProductDetailsController.onSubmit);
        const categoriesLoaded =
            await ProductDetailsController.loadCategories();

        if (!categoriesLoaded) {
            return;
        }

        const params = new URLSearchParams(window.location.search);
        const sku = params.get("sku");
        const heading = document.querySelector("h1");

        if (sku !== null) {
            heading.textContent = "Produkt anzeigen / bearbeiten";

            document.getElementById("sku").value = sku;
            document.getElementById("sku").readOnly = true;

            ProductDetailsController.loadProduct(sku);
        } else {
            heading.textContent = "Neues Produkt erstellen";
        }
    }

    /**
     * Lädt ein Produkt anhand seiner Artikelnummer und füllt das Formular aus.
     * Bei einem Ladefehler erscheint eine Meldung.
     * @param sku Die Artikelnummer des Produkts.
     * @returns Ein Promise. Bei einer Weiterleitung zum Login ergibt es false,
     *     sonst liefert es keinen Wert.
     */
    static async loadProduct(sku) {
        document.body.classList.add("loading");

        try {
            const response = await ApiModel.getProduct(sku);

            if (!LoginController.hasNoAuthenticationError(response)) {
                return false;
            }

            if (!response.ok) {
                throw new Error("Das Produkt konnte nicht geladen werden.");
            }

            const product = await response.json();
            ProductDetailsController.showProduct(product);

        } catch (error) {
            document.getElementById("product-message").textContent =
                error.message;
        } finally {
            document.body.classList.remove("loading");
        }
    }

    /**
     * Lädt die Kategorien aus der API und fügt sie ins Auswahlfeld ein.
     * @returns Ein Promise mit true bei Erfolg oder false bei einem Fehler
     *     oder einer Weiterleitung zur Anmeldung.
     */
    static async loadCategories() {
        try {
            const response = await ApiModel.getCategories();

            if (!LoginController.hasNoAuthenticationError(response)) {
                return false;
            }

            if (!response.ok) {
                throw new Error("Kategorien konnten nicht geladen werden.");
            }

            const categories = await response.json();
            const categorySelect = document.getElementById("category");

            for (const category of categories) {
                const option = document.createElement("option");

                option.value = category.category_id;
                option.textContent = category.name;

                categorySelect.appendChild(option);
            }

            return true;

        } catch (error) {
            document.getElementById("product-message").textContent =
                error.message;
            return false;
        }
    }

    /**
     * Trägt die gespeicherten Produktdaten in das Formular ein.
     * Wählt die passende Kategorie aus und setzt das Aktiv-Häkchen.
     * @param product Das Produkt, das aus der API geladen wurde.
     */
    static showProduct(product) {
        document.getElementById("sku").value = product.sku;
        document.getElementById("product-name").value = product.name;
        document.getElementById("price").value = product.price;
        document.getElementById("stock").value = product.stock;
        document.getElementById("description").value = product.description;
        document.getElementById("image").value = product.image;
        document.getElementById("active").checked = product.active === "1";
        document.getElementById("category").value = product.id_category;
    }

    /**
     * Verhindert das normale Absenden des Formulars und startet das Speichern.
     * @param event Das Ereignis beim Absenden des Formulars.
     */
    static onSubmit(event) {
        event.preventDefault();
        ProductDetailsController.saveProduct();
    }

    /**
     * Liest die Produktdaten aus dem Formular und sendet sie an die API.
     * Während der Anfrage ist der Speichern-Button gesperrt.
     * Wenn das Speichern klappt, öffnet sich die Produktübersicht.
     * Bei einem Fehler erscheint eine Meldung.
     */
    static async saveProduct() {
        const sku = document.getElementById("sku").value.trim();
        const name = document.getElementById("product-name").value.trim();
        const price = Number(document.getElementById("price").value);
        const stock = Number(document.getElementById("stock").value);
        const categoryId = Number(document.getElementById("category").value);
        const description = document.getElementById("description").value;
        const image = document.getElementById("image").value.trim();
        let active = 0;

        if (document.getElementById("active").checked) {
            active = 1;
        }

        const saveButton = document.querySelector("#product-form button");
        saveButton.disabled = true;
        document.body.classList.add("loading");

        try {
            const response = await ApiModel.createUpdateProduct(
                sku, active, categoryId, name, image, description, price, stock
            );

            if (!LoginController.hasNoAuthenticationError(response)) {
                return;
            }

            if (!response.ok) {
                throw new Error("Das Produkt konnte nicht gespeichert werden.");
            }
            
            alert("Das Produkt wurde gespeichert.");
            window.location.href = "/view/products.php";

        } catch (error) {
            document.getElementById("product-message").textContent =
                error.message;
        } finally {
            saveButton.disabled = false;
            document.body.classList.remove("loading");
        }
    }

}

ProductDetailsController.initialize();