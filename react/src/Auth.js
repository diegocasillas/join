import decode from 'jwt-decode'

class Auth {
  getToken () {
    return localStorage.getItem('accessToken')
  }

  getDecodedToken () {
    return decode(this.getToken())
  }

  setToken (token) {
    if (token) {
      localStorage.setItem('accessToken', token)
    }
  }

  register (name, email, password) {
    const data = new FormData()

    data.append('name', name)
    data.append('email', email)
    data.append('password', password)

    return fetch('http://www.students.oamk.fi/~c8blos00/index.php/api/register', {
      method: 'POST',
      body: data
    }).then(response => response.json())
      .then(json => {
        console.log(json)
        this.setToken(json.access_token)
      })
  }

  login (name, password) {
    const data = new FormData()

    data.append('name', name)
    data.append('password', password)

    return fetch('http://www.students.oamk.fi/~c8blos00/index.php/api/login', {
      method: 'POST',
      body: data
    }).then(response => response.json())
      .then(json => this.setToken(json.access_token))
  }

  logout () {
    localStorage.removeItem('accessToken')
  }

  loggedIn () {
    return !!this.getToken()
  }
}

export default Auth
