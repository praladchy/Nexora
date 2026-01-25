import React from 'react'
import { useSelector } from 'react-redux'

const Home = () => {
  const selector=useSelector((state)=>state.userStore.data)
  console.log(selector)
  return (
    <div>
      {selector? (
        <h1 className="text-3xl font-bold underline">
          Welcome, {selector.name}!
        </h1>
      ) : (
        <h1 className="text-3xl font-bold underline">Welcome, Guest!</h1>
      )}
    </div>
  )
}

export default Home