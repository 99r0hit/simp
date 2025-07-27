import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) navigate('/')
      else setUser(user)
    })
  }, [])

  const logout = async () => {
    await supabase.auth.signOut()
    navigate('/')
  }

  return (
    <div>
      <h2>Welcome, {user?.email}</h2>
      <p>
        📡 Semiconductors are the heart of modern electronics. They power your phones,
        laptops, and the entire digital universe.
      </p>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default Dashboard
