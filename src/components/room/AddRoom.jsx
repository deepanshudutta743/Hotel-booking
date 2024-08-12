import React, { useState } from 'react'
import { addRoom } from '../utils/ApiFunctions';
import RoomTypeSelector from '../common/RoomTypeSelector';
import { Link } from 'react-router-dom';
function AddRoom() {

    const [newRoom, setNewRoom] = useState({
        photo: null,
        roomType: "",
        roomPrice: ""
    })

    // for image preview
    const [imagePreview, setImagePreview] = useState("")
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // function to handle input change in our form
    const handleRoomInputChange = (e) => {
        const name = e.target.name
        let value = e.target.value
        if (name === "roomPrice") {
            if (!isNaN(value)) {
                value = parseInt(value)
            }
            else {
                value = ""
            }
        }
        setNewRoom({ ...newRoom, [name]: value })
    }

    // if any change in the image field
    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0]
        setNewRoom({ ...newRoom, photo: selectedImage })
        setImagePreview(URL.createObjectURL(selectedImage))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const success = await addRoom(newRoom.photo, newRoom.roomType, newRoom.roomPrice)
            if (success !== undefined) {
                setSuccessMessage("A new room was added to the database")
                setNewRoom({ photo: null, roomType: "", roomPrice: "" })
                setImagePreview("")
                setErrorMessage("")
            }
            else {
                setErrorMessage("Error adding room")
            }
        } catch (error) {
            setErrorMessage(error.message)
        }
        setTimeout(()=>{
            setSuccessMessage("")
            setErrorMessage("")
        })
    }


    
    return (
        <>
            <section className='container mt-5'>
                <div className='row justify-content-center'>
                    <div className='col-md-8 col-lg-6'>
                        <h2 className='mt-5 mb-2'>Add a new Room</h2>
                        <form onSubmit={handleSubmit}>
                            <div className='mb-3'>
                                <label className='form-label' htmlFor='roomType'>Room Type</label>
                                <div>
                                    <RoomTypeSelector handleRoomInputChange={handleRoomInputChange} newRoom={newRoom} />
                                </div>
                            </div>

                            <div className='mb-3'>
                                <label className='form-label' htmlFor='roomPrice'>Room Price</label>
                                <input className='form-control' required id="roomPrice" name="roomPrice" value={newRoom.roomPrice}
                                    type='number'
                                    onChange={handleRoomInputChange}
                                />
                            </div>

                            <div className='mb-3'>
                                <label className='form-label' htmlFor='photo'>Room Photo</label>
                                <input 
                                    id="photo" name="photo" type='file'
                                    className='form-control'
                                    onChange={handleImageChange}
                                />
                                {imagePreview && (
                                    <img src={imagePreview} alt='Preview Room Photo' style={{ maxWidth: "400px", maxHeight: "400px" }}
                                        className='mb-3'
                                    />
                                )}
                            </div>
                            
                            <div className='d-grid d-md-flex mt-2'>
                                <Link to={"/existing-rooms"} className='btn btn-outline-info'>
                                Back
                                </Link>
                                <button className='btn btn-outline-primary ml-5'>
                                    Save Room
                                </button>
                            </div>
                        </form>
                        {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
                        {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
                    </div>
                </div>
            </section>
        </>
    )
}

export default AddRoom;
