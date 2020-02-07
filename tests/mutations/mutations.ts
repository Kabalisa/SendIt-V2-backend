export const REGISTER_USER = `
mutation {
  register(input: {email: "ikabalisa20@gmail.com", password: "password"}){
    ... on UserRegistration{
      registrationType
      token
    }
    ... on RequestError{
      errorType
      errorMessage
    }
  }
}`;

export const DELETE_USER = `
mutation {
  deleteUser(input: {email: "ikabalisa20@gmail.com"}) {
    ... on EmailType{
      email
    }
    ... on RequestError{
      errorType
      errorMessage
    }
  }
}`;

export const LOGIN_USER = `
mutation LoginUser($Email: String, $Password: String) {
  logIn(input:{email: $Email, password: $Password}){
    ... on UserRegistration{
      registrationType
      token
    }
    ... on RequestError{
      errorType
      errorMessage
    }
  }
}
`;