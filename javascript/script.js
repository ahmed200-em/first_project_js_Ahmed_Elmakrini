let users = []
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
    let fullName
    let step = 1
    while (true) {
      // ?this step 1 for name 
      if (step === 1) {
        fullName = prompt('Please enter your full name:')
        let result = validName(fullName)

        if (!result.includes('Name')) {
          fullName = result
          step = 2
        } else {
          alert(result)
        }
      }
    }
    break
  case '2':
  case 'Exit':
  case 'exit':
    break
}
