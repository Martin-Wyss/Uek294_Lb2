<!DOCTYPE html>
<html lang="de">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Onlineshop <?= $page_title ?></title>
    <link rel="stylesheet" href="view/stylesheets/style.css">
    <script defer src="model\api-model.js"></script>
    <?php if ($page_controller_path): ?>
        <script defer src="<?= $page_controller_path ?>"></script>
    <?php endif; ?>
</head>

<body>
    <main>