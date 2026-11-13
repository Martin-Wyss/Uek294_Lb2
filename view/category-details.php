<?php $page_title = "Kategoriedetails"; ?>
<?php $page_controller_path = "/controller/category-details-controller.js"; ?>
<?php require "blocks/header.php"; ?>

<h1>Kategorie erstellen / bearbeiten</h1>

<p id="category-message" role="status"></p>
<!-- Dieses Formular dient zum Erstellen und Bearbeiten von Kategorien. -->
<form id="category-form">
    <label for="category-name">Name</label>
    <input type="text" id="category-name" placeholder="Name" required>

    <label for="active">
        <input type="checkbox" id="active" checked>
        Aktiv
    </label>

    <button class="button" type="submit">Speichern</button>
</form>

<button class="button" type="button" onclick="window.location.href='/view/categories.php'">
    Zurück zu den Kategorien
</button>

<?php require "blocks/footer.php"; ?>