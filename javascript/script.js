let users = JSON.parse(localStorage.getItem('users')) || []
while (true) {
  let action = prompt(
    'Welcome! Choose an option:\n1. Sign Up\n2. Login In\n3. Change Password \n4. Exit'
  )
  // ! this function for exit where ever was typed will exit
  function goBack (input) {
    return input === 'exit' || input === 'Exit' || input === 'EXIT'
  }
  //  ! this function to validate the password
  function validPassword (password) {
    if (!password) return 'Password cannot be empty.'
    if (password !== password.trim())
      return 'Password should not contain spaces'
    if (password.length < 7)
      return 'Password must contain at least 7 characters.'
    if (!/[@#\-+*/]/.test(password)) {
      return 'Password must contain at least one special character'
    }
    return password
  }
  // todo sign up case
  switch (action) {
    case '1':
    case 'Sign Up':
    case 'SignUp':
    case 'sign up':
    case 'signup':
      // ! this function to validate the name
      function validName (name) {
        if (!name) return 'Name cannot be empty.'
        name = name.trim().replace(/\s+/g, ' ')
        if (name.length < 5) return 'Name must contain at least 5 characters.'
        if (/[^a-zA-Z ]/.test(name))
          return 'Name can only contain letters and spaces.'
        return name
          .split(' ')
          .map(word => word[0].toUpperCase() + word.slice(1).toLowerCase())
          .join(' ')
      }
      // ! this function to check the email if exist in the storage or not
      function emailExists (email) {
        return users.some(user => user.email === email)
      }
      //  ! this function to validate the email
      function validEmail (email) {
        if (!email) return 'Email cannot be empty.'
        email = email.trim().toLowerCase()
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
          return 'Enter a valid email example like: exemple@gmail.com'
        }
        if (emailExists(email)) return 'Email already used.'
        return email
      }
      //  ! this function to validate the age
      function validAge (age) {
        if (!age) return 'Age cannot be empty.'
        age = age.trim()
        if (!/^\d+$/.test(age)) return 'Age can only contain numbers.'
        if (age.length !== 2) return 'Age must contain exactly 2 digits.'
        if (Number(age) < 16) return 'Age must be at least 16.'
        return Number(age)
      }

      let fullName
      let email
      let age
      let password
      let confirmPassword
      let step = 1
      let signupDone = false
      while (true) {
        // ? step 1 for the fullname loop
        if (step === 1) {
          fullName = prompt('Please enter your full name:')
          if (goBack(fullName)) break
          let result = validName(fullName)
          if (!result.includes('Name')) {
            fullName = result
            step = 2
          } else {
            alert(result)
          }
          // ? step 2 for the email loop
        } else if (step === 2) {
          email = prompt('Please enter your email:')
          if (goBack(email)) break
          let result = validEmail(email)
          if (result.includes('Email') || result.includes('valid email')) {
            alert(result)
          } else {
            email = result
            step = 3
          }
          // ? step 3 for the age loop
        } else if (step === 3) {
          age = prompt('Please enter your age:')
          if (goBack(age)) break
          let result = validAge(age)
          if (typeof result === 'string') {
            alert(result)
          } else {
            age = result
            step = 4
          }
          // ? step 4 for the password loop
        } else if (step === 4) {
          password = prompt('Please enter your password:')
          if (goBack(password)) break
          let result = validPassword(password)
          if (result.includes('Password')) {
            alert(result)
          } else {
            password = result
            step = 5
          }
          // ? step 1 for the password confirmation  loop
        } else if (step === 5) {
          confirmPassword = prompt('Please confirm your password:')
          if (goBack(confirmPassword)) break
          if (confirmPassword !== password) {
            alert("password didn't match")
          } else {
            alert('sign in successful ')
            signupDone = true
            break
          }
        }
      }
      // and this after make sure the sign up made will save the user info in storage local
      if (signupDone) {
        users.push({
          fullName: fullName,
          email: email,
          age: age,
          password: password
        })
        localStorage.setItem('users', JSON.stringify(users))
        console.log('User saved:', users)
      }
      break
    // todo login case
    case '2':
    case 'Login In':
    case 'login in':
    case 'login':
      let cas = 1
      let emailLogin
      let passwordLogin
      while (true) {
        // ? step 1 for the email to login loop
        if (cas === 1) {
          emailLogin = prompt('Please enter your email:')
          if (goBack(emailLogin)) break
          let userExists = users.some(user => user.email === emailLogin)
          if (!userExists) {
            alert("email doesn't exist, try to sign up")
            break
          } else {
            cas = 2
          }
          // ? step 2 for the password to login loop
        } else if (cas === 2) {
          passwordLogin = prompt('Please enter your password:')
          if (goBack(passwordLogin)) break
          let user = users.find(user => user.email === emailLogin)
          if (user.password !== passwordLogin) {
            alert('Password incorrect')
          } else {
            alert('login successful')
            break
          }
        }
      }
      break
      let user
      while (true) {
        let emailToChange = prompt('Enter your email:')
        if (goBack(emailToChange)) break
        user = users.find(u => u.email === emailToChange)
        if (!user) {
          alert('User not found. Try again.')
        } else {
          break
        }
      }
      if (!user) break
      while (true) {
        let oldPassword = prompt('Enter your current password:')
        if (goBack(oldPassword)) break
        if (oldPassword !== user.password) {
          alert('Wrong password. Try again.')
        } else {
          break
        }
      }
      while (true) {
        let newPassword = prompt('Enter new password:')
        if (goBack(newPassword)) break
        let validation = validPassword(newPassword)
        if (validation === newPassword) {
          user.password = validation
          localStorage.setItem('users', JSON.stringify(users))
          alert('Password updated successfully')
          break
        } else {
          alert(validation)
        }
      }
      break
    // todo exit case
    case '4':
    case 'Exit':
    case 'exit':
      alert('Goodbye!')
      break
    default:
      alert('Invalid option! Returning to menu...')
  }
  if (action === '3' || action === 'exit' || action === 'Exit') {
    break
  }
}
