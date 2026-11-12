<?php $page_title = "Produkte"; ?>
<?php $page_controller_path = "/controller/products-controller.js"; ?>
<?php require "blocks/header.php"; ?>

<h1>Produkte</h1>

<button class="button" type="button"
    onclick="window.location.href='/view/product-details.php'">
    Neues Produkt
</button>

<p id="product-message" role="status"></p>

<div class="table-container">
    <table id="products-table">
        <thead>
            <tr>
                <th>Artikelnummer</th>
                <th>Name</th>
                <th>Preis</th>
                <th>Aktionen</th>
            </tr>
        </thead>
        <tbody id="products-list">
        </tbody>
    </table>
</div>

<?php require "blocks/footer.php";