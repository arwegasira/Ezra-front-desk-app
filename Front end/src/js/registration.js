// make sure all required fields are not empty -- Done
//get all fields values -- Done
//clear fields
//hit the api
//save client
//return success or failure
//give user message
import { alertdiv, removeElement, dottedLoader } from './functions'
let client = {}
export const newClient = async (inputs, alertObj, loaderObj) => {
  inputs.forEach((input) => {
    client[input.name] = input.value
  })
  console.log(client)
  try {
    //add loader
    dottedLoader(loaderObj.parentDiv, loaderObj.childDiv)

    const { data, status, headers } = await axios({
      method: 'POST',
      url: `${process.env.API_URL_DEV}/client/addclient`,
      data: client,
    })
    //remove loader
    if (status) {
      if (document.querySelector('.dotted-loader-container')) {
        document.querySelector('.dotted-loader-container').remove()
      }
    }
    //clear inputs
    inputs.forEach((input) => {
      input.value = ''
    })
    //Build success message
    alertdiv(
      alertObj.width,
      data.msg,
      alertObj.sucessClass,
      alertObj.parentDiv,
      alertObj.childDiv
    )
  } catch (error) {
    //remove loader
    if (document.querySelector('.dotted-loader-container')) {
      document.querySelector('.dotted-loader-container').remove()
    }
    //Build failure message
    alertdiv(
      alertObj.width,
      error.response.data,
      alertObj.failClass,
      alertObj.parentDiv,
      alertObj.childDiv
    )
  }
  //remove alert div
  if (document.querySelector('.alert')) {
    removeElement(document.querySelector('.alert'), 5000)
  }
}
