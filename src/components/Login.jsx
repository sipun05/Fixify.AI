import React from 'react'
import { SignIn } from '@clerk/clerk-react'
function login() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen text-blue-800'>
      <h1 className='text-3xl font-bold mb-6'>Welcome to Our Platform</h1>
      <SignIn />
    </div>
  )
}

export default login