import React from 'react'
import { useSelector } from 'react-redux'

const Home = () => {
  // const {user}=useSelector((state)=>state.user.data)
  // console.log(user)
  // const userData=localStorage.getItem("userData")
  // console.log(selector)
  return (<>
  <p>Welcome to the Home Page</p> 
  </>
    // <div>
    //   {selector? (
    //     <h1 className="text-3xl font-bold underline">
    //       Welcome, {user?.name}!
    //     </h1>
    //   ) : (
    //     <h1 className="text-3xl font-bold underline">Welcome, Guest!</h1>
    //   )}
    // </div>
  )
} 

export default Home