import decode from 'jwt-decode'

class Auth {
  getToken () {
    return localStorage.getItem('accessToken')
  }

  getDecodedToken () {
    return decode(this.getToken())
  }

  setToken (token) {
    localStorage.setItem('accessToken', token)
  }

  login (name, password) {
    const data = new FormData()

    data.append('name', name)
    data.append('password', password)

    return fetch('http://localhost/index.php/api/login', {
      method: 'POST',
      body: data
    }).then(response => response.json())
      .then(json => this.setToken(json.access_token))
  }

  loggedIn () {
    return !!this.getToken()
  }
}

export default Auth
