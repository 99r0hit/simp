import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const [user, setUser] = useState(null)
  const [text, setText] = useState('')
  const [feedback, setFeedback] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) navigate('/')
      else setUser(user)
    })

    fetch("https://your-backend.onrender.com/semiconductor-info")
      .then(res => res.json())
      .then(data => setText(data.text))
  }, [])

  const logout = async () => {
    await supabase.auth.signOut()
    navigate('/')
  }

  const submitFeedback = async () => {
    const res = await fetch("https://simp-bk.onrender.com/semiconductor-info", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_email: user.email,
        message: feedback
      })
    })

    const data = await res.json()
    if (data.status === "success") {
      alert("Thanks for your feedback! 🎉")
      setFeedback('')
    } else {
      alert("Something went wrong 😢")
    }
  }

  return (
    <div>
      <h2>Welcome, {user?.email}</h2>
      <p>{text}</p>

      <h3>📝 Leave Feedback</h3>
      <textarea
        placeholder="Your thoughts on semiconductors..."
        value={feedback}
        onChange={e => setFeedback(e.target.value)}
      ></textarea>
      <br />
      <button onClick={submitFeedback}>Submit Feedback</button>

      <br /><br />
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default Dashboard
