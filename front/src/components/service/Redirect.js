import React from 'react'
import  { Redirect } from 'react-router-dom'

const ProtectedComponent = ({authFails = true}) => {
  if (authFails){
    return <Redirect to='/login'  />
  }
  return <div> My Protected Component </div>
}