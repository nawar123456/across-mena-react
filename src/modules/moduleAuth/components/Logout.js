import React from 'react'
import { useAuth } from './Auth';

function Logout() {
    const auth=useAuth();
     return (
      auth.logout()
  )
}

export default Logout
