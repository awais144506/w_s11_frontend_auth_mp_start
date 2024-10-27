import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const naviagete = useNavigate()
  const toggleFormMode = () => {
    setIsLogin(!isLogin)
    setError('')
    setMessage('')
  }
  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }
  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }
  const handleSubmit = async(e) =>{
    e.preventDefault()
    setError("")
    setMessage("")
    try{
     const {data} =await axios.post(
      `/api/auth/${isLogin ? "login" : "register"}`
      ,{username,password}
     )
     if(isLogin) {
      localStorage.setItem("token",data.token)
      naviagete("/stars")
     }
     else{
      setMessage(data.message)
     }
    }
    catch(error)
    {
      setError(error?.response?.data?.message || "An Error Occured")
    }
   
   
  }

  return (
    <div className="container">
      <div aria-live="polite">{message}</div>
      <div aria-live="assertive" style={{ color: 'red' }}>{error}</div>
      <h3>{isLogin ? 'Login' : 'Register'}
        <button onClick={toggleFormMode}>
          Switch to {isLogin ? 'Register' : 'Login'}
        </button>
      </h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
      </form>
    </div>
  )
}
