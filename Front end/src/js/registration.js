// make sure all required fields are not empty -- Done
//get all fields values -- Done
//clear fields
//hit the api
//save client
//return success or failure
//give user message
import { alertdiv, removeElement } from './functions'
let client = {}
export const newClient = async (inputs, alertObj) => {
  inputs.forEach((input) => {
    client[input.name] = input.value
  })

  try {
    const { data, status, headers } = await axios({
      method: 'POST',
      url: `${process.env.API_URL_DEV}/client/addclient`,
      data: client,
    })

    //Build success message
    alertdiv(
      alertObj.width,
      data.msg,
      alertObj.sucessClass,
      alertObj.parentDiv,
      alertObj.childDiv
    )
    //clear inputs
  } catch (error) {
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
