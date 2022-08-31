import Seoltab from "../dist/index.js"

Seoltab.init({
  clientId: "128ba3b3-f2ca-4a33-afaf-aae20ba79093",
})

console.log(Seoltab.Auth.getClientId())

Seoltab.Auth.token({
  grantType: "authorization_code",
  redirectUri: "https://seoltab.com",
  code: "dc4dbd39-bb0e-49b5-82c4-2538628ec083",
}).then((res) => console.log(res))

// Seoltab.Auth.tokenInfo({
//   accessToken: "",
// }).then((res) => console.log(res))
