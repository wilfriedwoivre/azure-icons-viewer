---
---


const welcomeField = document.getElementById("signInName");

const myMSALObj = new Msal.UserAgentApplication(msalConfig);

function checkToken() {

    const idToken = window.sessionStorage.getItem('msal.idtoken')
    if (idToken === null) {
        window.location.replace("{{ site.url }}/login.html");
    }

    if (myMSALObj.clientId !== "e16874ba-81de-47bf-b6fe-14e0e881dc3c") {
        window.location.replace("{{ site.url }}/login.html")
    }
    getTokenPopup(loginRequest).then(response => {
        callMSGraph(graphConfig.graphMeEndpoint, response.accessToken, updateSignInAccount);
    });

}

function updateSignInAccount(request) {
    const username = request.givenName;

    welcomeField.innerHTML = `Bonjour ${username} !`;
}

function signOut() {
    myMSALObj.logout();
}

function getTokenPopup(request) {
    return myMSALObj.acquireTokenSilent(request)
        .catch(error => {
            console.log(error);
            console.log("silent token acquisition fails. acquiring token using popup");

            // fallback to interaction when silent call fails
            return myMSALObj.acquireTokenPopup(request)
                .then(tokenResponse => {
                    return tokenResponse;
                }).catch(error => {
                    console.log(error);
                });
        });
}

function callMSGraph(endpoint, token, callback) {
    const headers = new Headers();
    const bearer = `Bearer ${token}`;

    headers.append("Authorization", bearer);

    const options = {
        method: "GET",
        headers: headers
    };

    console.log('request made to Graph API at: ' + new Date().toString());

    fetch(endpoint, options)
        .then(response => response.json())
        .then(response => callback(response, endpoint))
        .catch(error => console.log(error))
}