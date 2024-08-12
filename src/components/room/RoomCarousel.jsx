import React, { useEffect, useState } from 'react'
import { getAllRooms } from '../utils/ApiFunctions';

function RoomCarousel() {
    const[rooms,setRooms]=useState([])
    const [errorMessage, SetErrorMessage]=useState("")
    const [isLoading,setIsLoading]=useState(false);
    useEffect(()=>{
        setIsLoading(true)
        getAllRooms().then((data)=>{
            setRooms(data)
            setIsLoading(false)
        }).catch((error)=>{
            SetErrorMessage(error.message)
            setIsLoading(false)
        })
    },[])
    if(isLoading)
    {
        return <div className='mt-5'>Loading rooms....</div>
    }
    if(errorMessage)
        {
            return <div className='tsxt-danger mt-5'>Error: {errorMessage}</div>
        }

  return (
    <div></div>
  )
}

export default RoomCarousel