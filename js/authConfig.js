---
---

const msalConfig = {
  auth: {
    clientId: "e16874ba-81de-47bf-b6fe-14e0e881dc3c",
    authority: "https://login.microsoftonline.com/woivre.fr",
    redirectUri: "{{ site.url }}/login.html",
  },
  cache: {
    cacheLocation: "sessionStorage", // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  }
};

// Add here scopes for id token to be used at MS Identity Platform endpoints.
const loginRequest = {
  scopes: ["openid", "profile", "User.Read"]
};

const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
};