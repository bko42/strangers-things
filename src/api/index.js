const baseURL = 'https://strangers-things.herokuapp.com/api/2206-FTB-ET-WEB-PT'

export const getPosts = async(token) => {
    try {
        const response = await fetch(`${baseURL}/posts`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        const results = await response.json();
    
        return(results)
    } catch(error) {
        console.log('error getting all posts')
    }
}


export const registerUser = async(username, password) => {
    try {
        const response = await fetch(`${baseURL}/users/register`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              user: {
                username: username,
                password: password
              }
            })
          })
          const result = await response.json();
          return result;
    } catch(error) {
        console.log ('error registering user')
    }
}

export const loginUser = async (username, password) => {
    try {
        const response = await fetch (`${baseURL}/users/login`, {
    method: "POST",
    headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    user: {
      username,
      password
    }
  })
})
    const result = await response.json();
    return result;
    } catch(ex) {
        console.log('error logging in user')
    }
}

export const getUserDetails = async (token) => {
    try {
        const response = await fetch (`${baseURL}/users/me`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
        const result = await response.json()
        return result;
    } catch(ex) {
        console.log('error getting user details')
    }
}


export const createPost = async (token, {title, description, price, location, willDeliver}) => {
    try {
        const response = await fetch (`${baseURL}/posts`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          post: {
            title,
            description,
            price,
            location,
            willDeliver
          }
        })
    })
    
    const result = await response.json();
    return result;

    } catch(ex) {
    console.log('error creating a new post')
 }
}