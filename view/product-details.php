<?php $page_title = "Produktdetails"; ?>
<?php $page_controller_path = "/controller/product-details-controller.js"; ?>
<?php require "blocks/header.php"; ?>

<h1>Produkt erstellen / bearbeiten</h1>

<p id="product-message" role="status"></p>

<form id="product-form">
    <label for="sku">Artikelnummer</label>
    <input type="text" id="sku" required>

    <label for="product-name">Name</label>
    <input type="text" id="product-name" required>

    <label for="price">Preis</label>
    <input type="number" id="price" min="0" step="0.01" required>

    <label for="stock">Lagerbestand</label>
    <input type="number" id="stock" min="0" step="1" required>

    <label for="category">Kategorie</label>
    <select id="category" required>
        <option value="">Bitte wählen</option>
    </select>

    <label for="description">Beschreibung</label>
    <textarea id="description"></textarea>

    <label for="image">Bild-URL</label>
    <input type="url" id="image">

    <label for="active">
        <input type="checkbox" id="active" checked>
        Aktiv
    </label>

    <button class="button" type="submit">Speichern</button>
</form>

<button class="button" type="button" onclick="window.location.href='/view/products.php'">
    Zurück zu den Produkten
</button>

<?php require "blocks/footer.php"; ?>