/**
 * Sammelt die Anfragen an die API.
 */
class ApiModel {
    /**
     * Sendet die Anmeldedaten an die API.
     * @param username Der eingegebene Benutzername.
     * @param password Das eingegebene Passwort.
     * @returns Ein Promise mit der Antwort der API.
     */
    static sendLogin(username, password) {
        return fetch("https://campus.csbe.ch/uek294/api/v1/authenticate", {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({
                username: username,
                password: password
            })
        });
    }
    
    /**
     * Meldet den Benutzer bei der API ab.
     * @returns Ein Promise mit der Antwort der API.
     */
    static sendLogout() {
        return fetch("https://campus.csbe.ch/uek294/api/v1/unauthenticate", {
            method: "POST",
            credentials: "include"
        });
    }

    /**
     * Fragt die Liste aller Kategorien bei der API ab.
     * @returns Ein Promise mit der Antwort der API.
     */
    static getCategories() {
        return fetch("https://campus.csbe.ch/uek294/api/v1/categories", {
            method: "GET",
            credentials: "include"
        });
    }

    /**
     * Sendet eine neue Kategorie an die API.
     * @param active Der gewünschte Status: 1 für aktiv, 0 für inaktiv.
     * @param name Der Name der neuen Kategorie.
     * @returns Ein Promise mit der Antwort der API.
     */
    static createCategory(active, name) {
        return fetch("https://campus.csbe.ch/uek294/api/v1/category", {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({
                active: active,
                name: name
            })
        });
    }

    /**
     * Fragt eine einzelne Kategorie bei der API ab.
     * @param categoryId Die ID der Kategorie, die geladen werden soll.
     * @returns Ein Promise mit der Antwort der API.
     */
    static getCategory(categoryId) {
        return fetch("https://campus.csbe.ch/uek294/api/v1/category/" + encodeURIComponent(categoryId), {
            method: "GET",
            credentials: "include"
        });
    }

    /**
     * Speichert Änderungen an einer bestehenden Kategorie.
     * @param categoryId Die ID der Kategorie.
     * @param active Der neue Status: 1 für aktiv, 0 für inaktiv.
     * @param name Der neue Name der Kategorie.
     * @returns Ein Promise mit der Antwort der API.
     */
    static updateCategory(categoryId, active, name) {
        return fetch("https://campus.csbe.ch/uek294/api/v1/category/" + encodeURIComponent(categoryId), {
            method: "PATCH",
            credentials: "include",
            body: JSON.stringify({
                active: active,
                name: name
            })
        });
    }

    /**
     * Sendet die Anfrage zum Löschen einer Kategorie.
     * @param categoryId Die ID der Kategorie, die gelöscht werden soll.
     * @returns Ein Promise mit der Antwort der API.
     */
    static deleteCategory(categoryId) {
        return fetch("https://campus.csbe.ch/uek294/api/v1/category/" + encodeURIComponent(categoryId), {
            method: "DELETE",
            credentials: "include",
        });
    }

    /**
     * Fragt die Liste aller Produkte bei der API ab.
     * @returns Ein Promise mit der Antwort der API.
     */
    static getProducts() {
        return fetch("https://campus.csbe.ch/uek294/api/v1/products", {
            method: "GET",
            credentials: "include",
        });
    }

    /**
     * Fragt ein einzelnes Produkt bei der API ab.
     * @param sku Die Artikelnummer des Produkts, das geladen werden soll.
     * @returns Ein Promise mit der Antwort der API.
     */
    static getProduct(sku) {
        return fetch("https://campus.csbe.ch/uek294/api/v1/product/" + encodeURIComponent(sku), {
            method: "GET",
            credentials: "include",
        });
    }

    /**
     * Erstellt ein neues Produkt oder speichert Änderungen an einem Produkt.
     * @param sku Die Artikelnummer des Produkts.
     * @param active Der gewünschte Status. 1 bedeutet aktiv, 0 inaktiv.
     * @param categoryId Die ID der ausgewählten Kategorie.
     * @param name Der Name des Produkts.
     * @param image Die Adresse des Produktbilds.
     * @param description Die Beschreibung des Produkts.
     * @param price Der Preis des Produkts.
     * @param stock Die Anzahl Stück am Lager.
     * @returns Ein Promise mit der Antwort der API.
     */
    static createUpdateProduct(sku, active, categoryId, name, image, description, price, stock) {
        return fetch("https://campus.csbe.ch/uek294/api/v1/product/" + encodeURIComponent(sku), {
            method: "PUT",
            credentials: "include",
            body: JSON.stringify({
                active: active,
                id_category: categoryId,
                name: name,
                image: image,
                description: description,
                price: price,
                stock: stock
            })
        });
    }

    /**
     * Sendet die Anfrage zum Löschen eines Produkts.
     * @param sku Die Artikelnummer des Produkts, das gelöscht werden soll.
     * @returns Ein Promise mit der Antwort der API.
     */
    static deleteProduct(sku) {
        return fetch("https://campus.csbe.ch/uek294/api/v1/product/" + encodeURIComponent(sku), {
            method: "DELETE",
            credentials: "include"
        });
    }
}