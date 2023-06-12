// alert div
const alertdiv = (width, message, className, parent, child) => {
  const div = document.createElement('div')
  div.classList.add('alert')
  div.classList.add(className)
  div.style.width = width
  div.appendChild(document.createTextNode(message))
  parent.insertBefore(div, child)
}
// remove element
const removeElement = (el, time) => {
  setTimeout(() => {
    el.remove()
  }, time)
}
const dottedLoader = (parent, child) => {
  const container = document.createElement('div')
  container.classList.add('dotted-loader-container')
  container.innerHTML = `
  <span></span>
  <span></span>
  <span></span>
  <span></span>
   <span></span>
  `
  parent.insertBefore(container, child)
}
const spinningLoder = (parent, child, refresh) => {

}
const clientCard = (clients, list) => {
  clients.forEach((client) => {
    const clientInfo = document.createElement('div')
    clientInfo.classList.add('client-info')
    clientInfo.innerHTML = `
                <div class="client-primary-info">
              <div class="avatar">
                <img
                  src=${
                    client.gender === 'Female'
                      ? 'https://avataaars.io/?avatarStyle=Transparent&topType=LongHairStraight&accessoriesType=Prescription02&hairColor=Auburn&facialHairType=Blank&clotheType=CollarSweater&clotheColor=PastelGreen&eyeType=Happy&eyebrowType=SadConcernedNatural&mouthType=Concerned&skinColor=Light'
                      : 'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortWaved&accessoriesType=Blank&hairColor=Black&facialHairType=BeardMedium&facialHairColor=Auburn&clotheType=GraphicShirt&clotheColor=PastelYellow&graphicType=Cumbia&eyeType=EyeRoll&eyebrowType=UnibrowNatural&mouthType=Grimace&skinColor=Brown'
                  }
                  alt="Client"
                />
                <h4>${client.lastName} ${client.firstName}</h4>
              </div>
              <div class="info-details">
                <div class="line-detail">
                  <span class="key">Gender:</span>
                  <span class="value">${client.gender}</span>
                </div>
                <div class="line-detail">
                  <span class="key">PC/ID#:</span>
                  <span class="value">${client.idNumber}</span>
                </div>
                <div class="line-detail">
                  <span class="key">Phone#:</span>
                  <span class="value">${client.phoneNumber}</span>
                </div>
                <button class="expand-collapse">
                  <i class="fa-solid fa-caret-down"></i>
                </button>
              </div>
            </div>
            <div class="expanding-grid">
              <div class="client-secondary-info">
                <div class="info-details">
                  <div class="line-detail">
                    <span class="key">Email:</span>
                    <span class="value">${client.email}</span>
                  </div>
                  <div class="line-detail">
                    <span class="key">City:</span>
                    <span class="value">${client.city}</span>
                  </div>
                  <div class="line-detail">
                    <span class="key">State:</span>
                    <span class="value">${client.state}</span>
                  </div>
                  <div class="line-detail">
                    <span class="key">Country:</span>
                    <span class="value">${client.country}</span>
                  </div>
                  <div class="line-detail">
                    <span class="key">Nationality:</span>
                    <span class="value">${client.nationality}</span>
                  </div>
                </div>
                <div class="info-btns">
                  <button class="btn-n view-services">view Services</button>
                  <button class="btn-n add-service">Add Service</button>
                </div>
              </div>
            </div>
    
    
    `
    list.appendChild(clientInfo)
  })
}
const searchClients = async (inputs) => {
  let search = {}
  inputs.forEach((input) => {
    search[input.name] = input.value
  })
  //API request
  try {
    const { data, headers, status } = await axios({
      method: 'GET',
      url: `${process.env.API_URL_DEV}/client/clients?idNumber=${search.idNumber}&&firstName=${search.firstName}&&lastName=${search.lastName}&&email=${search.email}&&arrivalDate=${search.arrivalDate}&&phoneNumber=${search.phoneNumber}`,
      data: search,
    })
    //rebuild the user list
    const clientList = document.querySelector('.client-list-container')
    clientList.innerHTML = ''
    // clientCard(data.clients, clientList)
    return data.clients
  } catch (error) {
    //rebuild error div
    const clientList = document.querySelector('.client-list-container')
    clientList.innerHTML = ''
    return error
  }
}
export { alertdiv, removeElement, dottedLoader, clientCard, searchClients }
