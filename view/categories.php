<?php $page_title = "Kategorien"; ?>
<?php $page_controller_path = "/controller/categories-controller.js"; ?>
<?php require "blocks/header.php"; ?>

<h1>Kategorien</h1>

<button class="button" type="button" onclick="window.location.href='/view/category-details.php'">
    Neue Kategorie
</button>

<p id="category-message" role="status"></p>

<div class="table-container">
    <table id="categories-table">
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Aktiv</th>
                <th>Aktionen</th>
            </tr>
        </thead>
        <!-- Der Kategorie-Controller fügt hier die geladenen Kategorien als Tabellenzeilen ein. -->
        <tbody id="categories-list">
        </tbody>
    </table>
</div>

<?php require "blocks/footer.php"; ?>