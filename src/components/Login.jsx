

import React from 'react'
import { SignIn } from '@clerk/clerk-react'

function login() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-600 via-purple-500 to-teal-400 flex flex-col items-center justify-center p-6'>
   
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
      </div>
      
      
      <div className="relative z-10 flex flex-col items-center">
        <h1 className='text-4xl font-bold mb-8 text-white drop-shadow-lg text-center'>
          Welcome to MizuGuna
        </h1>
        
     
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 w-full max-w-md">
          <SignIn />
        </div>
        
        {/* Footer */}
        <div className='mt-8 text-center'>
          <p className='text-white/80 text-sm'>
            IoT Infrastructure for Inland Fresh Water Fish Farming
          </p>
        </div>
      </div>
    </div>
  )
}

export default login