// the purpose of the file to create all the functions that will help to interect the backend
import axios from "axios"

export const api= axios.create({

    baseURL:"http://localhost:9192"
})

// This function add a new room to the database
export async function addRoom(photo,roomType,roomPrice) {
    
    const fromDate = new FormData()
    fromDate.append("photo",photo)
    fromDate.append("roomType",roomType)
    fromDate.append("roomPrice",roomPrice)

    const reponse=await api.post("/rooms/add/new-room",fromDate)
    if(reponse.status===201)
    {
        return true;
    }
    else{
        return false;
    }

}

// This function will get all room types from the database
export async function getRoomTypes() {
    try{
       const reponse=await api.get("/rooms/room/types")
    //    console.log(reponse.data)
       return reponse.data
    }catch(error)
    {
        throw new Error("Error fetching room types");
    }

}

// this function get all rooms from the database
export async function getAllRooms() {
    try{
     const result=await api.get("/rooms/all-rooms")
     console.log(result.data)
     return result.data;
    }catch(error)
    {
       throw new Error("Error in fetching rooms");
    }
    
}

// function delete room by id
export async function deleteRoom(roomId) {
    
    try{
       const result = await api.delete(`/rooms/delete/room/${roomId}`) 
       return result.data
    }catch(error)
    {
      throw new Error(`Error deleting romm ${error.message}`)
    }
}

// first fetch the data and then it will update
export async function updateRoom(roomId,roomData)
{
   const formdata=new FormData()
   formdata.append("roomType",roomData.roomType);
   formdata.append("roomPrice",roomData.roomPrice);
   formdata.append("photo",roomData.photo);
   const response = await api.put(`/rooms/update/${roomId}`)
   return response;
}

// function to single room update, get the room by id
export async function getRoomById(params) {
    try{

        const result=await api.get(`/rooms/room/${roomId}`)
        return result;
    }catch(error)
    {
        throw new Error(`Error fetching room ${error.message}`);
    }

}