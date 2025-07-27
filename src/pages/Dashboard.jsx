import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const [user, setUser] = useState(null)
  const [text, setText] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    // Check logged in user
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) navigate('/')
      else setUser(user)
    })

    // Fetch text from backend
    fetch("https://simp-bk.onrender.com/semiconductor-info")
      .then(res => res.json())
      .then(data => {
        setText(data.text)
      })
      .catch(err => {
        console.error("Backend error:", err)
        setText("Could not fetch semiconductor info 😢")
      })
  }, [])

  const logout = async () => {
    await supabase.auth.signOut()
    navigate('/')
  }

  return (
    <div>
      <h2>Welcome, {user?.email}</h2>
      <p>{text}</p>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default Dashboard
