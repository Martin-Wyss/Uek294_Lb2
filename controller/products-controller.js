static initialize () {
        const params = new URLSearchParams(window.location.search);
        if (params.has("test")) {
            console.log(params.get("test"));
        }

LoginController.initialize();