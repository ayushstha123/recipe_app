import React from 'react'

const userGetId = () => {
return window.localStorage.getItem("userID");
}

export default userGetId