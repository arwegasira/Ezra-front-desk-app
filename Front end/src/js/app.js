import * as dotenv from 'dotenv'
import { userLogin } from './login.js'
import { newClient, backHome } from './registration'
import { dottedLoader, clientCard, searchClients } from './functions'

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
    const queryString = window.location.search
    const params = new URLSearchParams(queryString)
    let clients = params.get('clients')
    clients = decodeURIComponent(clients)
    clients = JSON.parse(clients)
    const clientList = document.querySelector('.client-list-container')
    clientCard(clients, clientList)
  }
  if (window.location.search.includes('clientSearch=true')) {
    const queryString = window.location.search
    const params = new URLSearchParams(queryString)
    clients = params.get('clients')
    clients = decodeURIComponent(clients)
    clients = JSON.parse(clients)
    const clientList = document.querySelector('.client-list-container')
    clientCard(clients, clientList)
  }
  //UI variables
  const searchForm = document.querySelector('.search-form')
  let expandClientDiv = document.querySelectorAll('.expand-collapse')
  const newClientBtn = document.querySelector('.new-client')
  const filterInputs = document.querySelectorAll('.filter')

  // new client btn
  newClientBtn.addEventListener('click', (e) => {
    if (e.target.id === 'new-client') {
      window.location.href = 'client-registration.html'
    }
  })

  // expand client card fx
  expandClientDiv.forEach((el) => {
    el.addEventListener('click', (e) => {
      nextsib = el.parentElement.parentElement.nextElementSibling
      nextsib.classList.toggle('expanded')
      el.classList.toggle('rotate')
    })
  })
  // search client functionality
  searchForm.addEventListener('click', async (e) => {
    e.preventDefault()
    if (e.target.id === 'submit-filters') {
      // get form data with formData API
      const formData = new FormData(e.currentTarget)
      const searchData = Object.fromEntries(formData)
      const clientList = document.querySelector('.client-list-container')
      clientList.innerHTML = ''
      let clients = await searchClients(searchData, searchForm, clientList)
      clients = encodeURIComponent(JSON.stringify(clients))
      window.location.href = `home.html?clientSearch=true&&clients=${clients}`
    }
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

  submitBtn.addEventListener('click', async (e) => {
    e.preventDefault()
    const formData = new FormData(regForm)
    const client = Object.fromEntries(formData)
    await newClient(client, alertObj, loaderObj, regForm)
  })

  backHomebtn.addEventListener('click', (e) => {
    e.preventDefault()
    backHome(alertObj)
  })
}
