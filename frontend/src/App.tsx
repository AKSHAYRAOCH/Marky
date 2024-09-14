import { BrowserRouter, Routes, Route } from "react-router-dom"


function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Homepage} />
        <Route path="/dashboard" Component={Dashboard} />
        <Route path="/login" Component={Login} />
        <Route path="/register" Component={Register} />
      </Routes>
    </BrowserRouter>
  )
}

export default App


function Homepage() {
  return (
    <h1>this is home page</h1>
  )
}

function Dashboard() {
  return (
    <h1>this is the dashboard</h1>
  )
}

function Login() {
  return (
    <h1>this is login page</h1>
  )
}

function Register() {
  return (
    <h1>this is register page</h1>
  )
}