import * as dotenv from 'dotenv'
import { userLogin } from './login.js'
import { newClient, backHome } from './registration'
import { dottedLoader, clientCard } from './functions'

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
  if (window.location.search.includes('redirected=true')) {
    const querString = window.location.search
    const params = new URLSearchParams(querString)
    let clients = params.get('clients')
    clients = decodeURIComponent(clients)
    clients = JSON.parse(clients)
    const clientList = document.querySelector('.client-list-container')
    clientCard(clients, clientList)
  }
  //UI variables
  const expandClientDiv = document.querySelectorAll('.expand-collapse')
  const newClientBtn = document.querySelector('.new-client')
  newClientBtn.addEventListener('click', (e) => {
    window.location.href = 'client-registration.html'
  })

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
  const alertBoxParent = document.querySelector('.page-content')
  const alertBoxChild = document.querySelector('.form-container')
  const btnSection = document.querySelector('.reg-btn')
  const regForm = document.querySelector('.reg-form')
  const backHomebtn = document.querySelector('#back-home')

  const alertObj = {
    with: '100%',
    sucessClass: 'success',
    failClass: 'danger',
    parentDiv: alertBoxParent,
    childDiv: alertBoxChild,
  }

  const loaderObj = {
    parentDiv: regForm,
    childDiv: btnSection,
  }

  submitBtn.addEventListener('click', (e) => {
    e.preventDefault()
    newClient(inputs, alertObj, loaderObj)
  })

  backHomebtn.addEventListener('click', (e) => {
    e.preventDefault()
    backHome(alertObj)
  })
}
