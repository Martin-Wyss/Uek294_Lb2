<h1>Anmeldung</h1>
<p>Produkt/Kategorieverwaltung</p>
<form onSubmit="LoginController.onSubmit(event)" id="login-form">
    <label for="username">Benutzername: <br>
        <input required type="text" id="username" placeholder="Benutzername" maxlength="150">
    </label> <br>

    <label for="password">Passwort: <br>
        <input required type="password" id="password" placeholder="Passwort" maxlength="150">
    </label> <br>
    <p>
        <button class="button" type="submit">Anmelden</button>
    </p>
</form>