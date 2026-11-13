<!DOCTYPE html>
<html lang="de">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Onlineshop <?= $page_title ?></title>
    <link rel="stylesheet" href="/view/stylesheets/style.css">
    <!-- Das API-Model und der Login-Controller werden auf allen Seiten geladen. -->
    <script defer src="/model/api-model.js"></script>
    <script defer src="/controller/login-controller.js"></script>
    <?php if ($page_controller_path): ?>
        <script defer src="<?= $page_controller_path ?>"></script>
    <?php endif; ?>
</head>

<body>
    <?php if ($page_title !== "Login"): ?>
        <!-- Die Navigation erscheint nur auf den Verwaltungsseiten. -->
        <nav>
            <button class="button" type="button" onclick="window.location.href='/view/products.php'">
                Produkte
            </button>

            <button class="button" type="button" onclick="window.location.href='/view/categories.php'">
                Kategorien
            </button>

            <button class="button" type="button" id="logout-button">
                Abmelden
            </button>
        </nav>
    <?php endif; ?>
    <main>