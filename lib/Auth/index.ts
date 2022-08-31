import axios from "axios"
import * as jose from "jose"

import store from "../store"

type AuthorizeInput = {
  redirectUri: string
}

const authorize = (input: AuthorizeInput) => {
  const query = Object.entries({
    // client_id: store.state?.clientId,
    continue: input?.redirectUri,
  })
    .map((e) => (e[1] ? e.join("=") : null))
    .filter(Boolean)

  let uri = `https://auth.seoltab.com/signin/`
  if (query) uri += `?${query.join("&")}`

  location.href = uri
}

type TokenInput = {
  grantType: string
  redirectUri: string
  refreshToken?: string
  code?: string
  clientSecret?: string
}

const token = async (input: TokenInput) => {
  const res = await axios.post(
    "https://api.auth.seoltab.com/graphql",
    {
      query: `mutation refresh {
        refresh {
          token
        }
      }`
    },
    { withCredentials: true }
  )

  return res.data.data?.refresh
}

type TokenInfoInput = {
  accessToken: string
}

const tokenInfo = async (input: TokenInfoInput) => {
  const JWKS = jose.createRemoteJWKSet(
    new URL("https://api.auth.seoltab.com/.well-known/jwks")
  )

  const { payload } = await jose.jwtVerify(input.accessToken, JWKS, {
    issuer: "auth.seoltab.com",
  })

  return payload
}

const getAccessToken = () => {
  return store.state.accessToken
}

const getClientId = () => {
  return store.state.clientId
}

const setAccessToken = (accessToken: string) => {
  store.state.accessToken = accessToken
}

export default {
  authorize,
  token,
  tokenInfo,
  getAccessToken,
  getClientId,
  setAccessToken,
}
