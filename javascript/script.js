let users = JSON.parse(localStorage.getItem('users')) || []
let action = prompt('Welcome! Choose an option:\n1. Sign Up\n2. Exit')
switch (action) {
  case '1':
  case 'Sign Up':
  case 'SignUp':
  case 'sign up':
  case 'signup':
    // ! this function for valid name verification
    function validName (name) {
      if (!name) return 'Name cannot be empty.'
      name = name.trim().replace(/\s+/g, ' ')
      if (name.length < 5) return 'Name must contain at least 5 characters.'
      if (/[^a-zA-Z ]/.test(name))
        return 'Name can only contain letters and spaces.'
      let correctedName = name
      .split(' ')
      .map(word => word[0].toUpperCase() + word.slice(1).toLowerCase())
      .join(' ')
      return correctedName
    }
    // ! this function for valid email verification
    function emailExists (email) {
      return users.some(user => user.email === email)
    }
    function validEmail (email) {
      if (!email) return 'Email cannot be empty.'
      email = email.trim().toLowerCase()
      if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
        return 'Enter a valid email example \n like: exemple@gmail.com'
      }
      if (emailExists(email)) return 'Email already used.'
      return email
    }
    let fullName
    let email
    let step = 1
    while (true) {
      // ? this step 1 for loop fullname validation 
      if (step === 1) {
        fullName = prompt('Please enter your full name:')
        let result = validName(fullName)
        if (!result.includes('Name')) {
          fullName = result
          step = 2
        } else {
          alert(result)
        }
        // ? this step 2 for loop email validation 
      } else if (step === 2) {
        email = prompt('Please enter your email:')
        let result = validEmail(email)
        if (result.includes('Email') || result.includes('valid email')) {
          alert(result)
        } else {
          email = result
          break
        }
      }
    }
    // todo this to save the user information
    users.push({
      fullName: fullName,
      email: email
    })
    localStorage.setItem('users', JSON.stringify(users))
    console.log('User saved:', users)
    break
  case '2':
  case 'Exit':
  case 'exit':
    break
}
