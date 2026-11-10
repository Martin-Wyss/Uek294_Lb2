/**
 * Steuert die Produktdetailseite.
 */
class ProductDetailsController {

    /**
     * Erkennt, ob ein Produkt erstellt oder bearbeitet werden soll.
     */
    static initialize() {
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
    * Lädt das gewählte Produkt aus der API.
    * @param sku Die Artikelnummer des Produkts.
    */
    static async loadProduct(sku) {
        document.body.classList.add("loading");

        try {
            const response = await ApiModel.getProduct(sku);

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
    * Füllt das Formular mit den Produktdaten.
    * @param product Das geladene Produkt.
    */
    static showProduct(product) {
        document.getElementById("sku").value = product.sku;
        document.getElementById("product-name").value = product.name;
        document.getElementById("price").value = product.price;
        document.getElementById("stock").value = product.stock;
        document.getElementById("description").value = product.description;
        document.getElementById("image").value = product.image;
        document.getElementById("active").checked = product.active === "1";
    }
}

ProductDetailsController.initialize();