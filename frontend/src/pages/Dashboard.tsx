import {useAuth} from "../context/AuthContext"
import { Link } from "react-router-dom"; 
const Dashboard = () => {
    const {user: User}= useAuth();
  return (
    <div>
    <div>welcome {User?.email}</div>
     <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">FormBuddy</h1>
      <Link to="/login" className="text-blue-600 underline">Login</Link><br />
      <Link to="/register" className="text-green-600 underline">Register</Link> <br />
      <Link to="/create-form" className="text-amber-400 underline">Create Form</Link>
    </div>
    </div>
  )
}

export default Dashboard