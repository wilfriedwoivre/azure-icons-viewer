---
---

const myMSALObj = new Msal.UserAgentApplication(msalConfig);

function signIn() {
  myMSALObj.loginPopup(loginRequest)
    .then(loginResponse => {
      console.log('id_token acquired at: ' + new Date().toString());
      console.log(loginResponse);
      window.location.href = "{{ site.url }}";
    }).catch(error => {
      console.log(error);
    });
}

