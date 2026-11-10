<!DOCTYPE html>
<html lang="de">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Onlineshop <?= $page_title ?></title>
    <link rel="stylesheet" href="/view/stylesheets/style.css">
    <script defer src="/model/api-model.js"></script>
    <?php if ($page_controller_path): ?>
        <script defer src="<?= $page_controller_path ?>"></script>
    <?php endif; ?>
</head>

<body>
    <?php if ($page_title !== "Login"): ?>
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