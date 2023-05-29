import * as dotenv from 'dotenv'
import { userLogin } from './login.js'
import { newClient } from './registration'

dotenv.config()
// Window location
const locationWin = window.location.href

//======  LOGIN FORM =============================
if (locationWin.includes('login.html')) {
  //UI Variables
  const email = document.querySelector('.login-form .email')
  const password = document.querySelector('.login-form .password')
  const loginBtn = document.querySelector('#loginBtn')

  loginBtn.addEventListener('click', (e) => {
    e.preventDefault()
    userLogin(email, password)
  })
}

// ============================= HOME PAGE====================================
if (locationWin.includes('home.html')) {
  //UI variables
  const expandClientDiv = document.querySelectorAll('.expand-collapse')

  expandClientDiv.forEach((el) => {
    el.addEventListener('click', (e) => {
      nextsib = el.parentElement.parentElement.nextElementSibling
      nextsib.classList.toggle('expanded')
      el.classList.toggle('rotate')
    })
  })
}

// ========================REGISTRATION PAGE ==================================
if (locationWin.includes('client-registration.html')) {
  //UI variables
  const inputs = document.querySelectorAll('.input')
  const submitBtn = document.querySelector('#submit')

  submitBtn.addEventListener('click', (e) => {
    e.preventDefault()
    newClient(inputs)
  })
}
