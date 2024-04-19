import { Ability } from '@casl/ability'

//  Read ability from localStorage
// * Handles auto fetching previous abilities if already logged in user
// ? You can update this if you store user abilities to more secure place
// ! Anyone can update localStorage so be careful and please update this
const authData = JSON.parse(localStorage.getItem('persist:aftsJune2022'))?.auth
const userData = JSON.parse(authData ? authData : "{}")?.userData

const permissions = userData?.permissions?.map(o =>  {
    const permission = o.split('tracktrace.')[1]?.split('_')
    return permission ? {
      action: permission[0],
      subject: permission[1]
    } : {}
})
const existingAbility = userData ? permissions : []

export default new Ability(existingAbility)
