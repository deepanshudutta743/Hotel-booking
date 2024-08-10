import React, { useEffect, useState } from 'react';
import { deleteRoom, getAllRooms } from '../utils/ApiFunctions';
import { Col, Row } from "react-bootstrap";
import RoomFilter from '../common/RoomFilter';
import RoomPaginator from '../common/RoomPaginator';
import { MdDelete } from "react-icons/md";
import {FaEye,FaEdit} from "react-icons/fa"
import {Link} from "react-router-dom"
function ExistingRooms() {
  const [rooms, setRooms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [roomsPerPage] = useState(8); // constant
  const [isLoading, setIsLoading] = useState(false);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [selectedRoomType, setSelectedRoomType] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState("");  

  // Fetch rooms when the component mounts
  useEffect(() => {
    fetchRooms();
  }, []);

  // Function to get all the rooms from the database
  const fetchRooms = async () => {
    setIsLoading(true);
    try {
      const allRooms = await getAllRooms();
      setRooms(allRooms);
      setIsLoading(false);
    } catch (error) {
      setErrorMessage(error.message); 
      setIsLoading(false); // Ensure loading state is reset even on error
    }
  };

  // Update filtered rooms when rooms or selectedRoomType changes
  useEffect(() => {
    if (selectedRoomType === "") {
      // If no type is selected, display all rooms
      setFilteredRooms(rooms);
    } else {
      const filtered = rooms.filter((room) => room.roomType === selectedRoomType);
      setFilteredRooms(filtered);
    }
    setCurrentPage(1);
  }, [rooms, selectedRoomType]);

  // Pagination calculations
  const calculateTotalNoOfPages = (filteredRooms, roomsPerPage, rooms) => {
    const noOfRooms = filteredRooms.length > 0 ? filteredRooms.length : rooms.length;
    return Math.ceil(noOfRooms / roomsPerPage);
  };

  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);

  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDelete= async(roomId)=>{
    try{
    const result=await deleteRoom(roomId);
    if(result==="") // means the the item is deleted
    {
      setSuccessMessage(`Room no ${roomId} was deleted`)
      fetchRooms()
    }else{
      console.error(`Error deleting room : ${result.message}`)
    }

    }catch(error)
    {
       setErrorMessage(error.message)
    }

    setTimeout(()=>{
     setSuccessMessage("")
     setErrorMessage("")

    },3000)
  }
  return (
    <>
      {isLoading ? (
        <p>Loading Existing Rooms...</p>
      ) : (
        <>
          <section className='mt-5 mb-5 container'>
            <div className='d-flex justify-content-center mb-3 mt-5'>
              <h2>Existing Rooms</h2>
            </div>
            <Col md={6} className='mb-3 mb-md-0'>
              <RoomFilter data={rooms} setFilteredData={setFilteredRooms} />
            </Col>
            <table className='table table-bordered table-hover'>
              <thead>
                <tr className='text-center'>
                  <th>ID</th>
                  <th>Room Type</th>
                  <th>Room Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentRooms.map((room) => (
                  <tr key={room.id} className='text-center'>
                    <td>{room.id}</td>
                    <td>{room.roomType}</td>
                    <td>{room.roomPrice}</td>
                    <td className='gap-2'>
                      <Link to={`/edit-room/${room.id}`}>
                      <span className='btn btn-info btn-sm'><FaEye/></span>
                      <span className='btn btn-warning btn-sm'><FaEdit/></span>
                      </Link>
                      <button
                      className='btn btn-danger btn-sm'
                      onClick={()=>handleDelete(room.id)}
                      ><MdDelete /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <RoomPaginator 
              currentPage={currentPage} 
              totalPages={calculateTotalNoOfPages(filteredRooms, roomsPerPage, rooms)}
              onPageChange={handlePaginationClick}
            />
          </section>
        </>
      )} 
    </>
  );
}

export default ExistingRooms;
