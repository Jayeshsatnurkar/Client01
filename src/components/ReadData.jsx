import axios from 'axios'
 import React, { useEffect, useState } from 'react'
import { deleteData } from './DeleteData.js'

const ReadData = (props) => {

    const [fetchData, setFetchData] = useState(null)

    const [isEdit, setisEdit] = useState(false)

    const [propsdata, setpropsData] = useState()

    const [isDelete,setisDelete]=useState(false)


    let fetchDataFromDatabase = async () => {
        try {
            let result = await axios({
                method: "get",
                url: "http://localhost:8800/fetchData"
            })
            setFetchData(result.data.database)

        } catch (err) {
            console.log("unable to  fetch data from database !")

        }
    }

    useEffect(() => {
        fetchDataFromDatabase();
    }, [props.isLoad])

    let DisplayDataRow = (props) => {
        return (
            <tr className='' key={props._id}>
                <td>{props.name}</td>
                <td>{props.phone}</td>
                <td>{props.email}</td>
                <td>{props.city}</td>
                <td>{props.pincode}</td>
                <td>{props.address}</td>
                <td>{props.dob}</td>
                <td>{props.age}</td>
                <td>
                    <button className='btn btn-danger me-2 ' onClick={() => {
                        deleteData(props.name, props._id)
                        setisDelete(true)
                    }}>Delete</button>
                    <button className='btn btn-primary' onClick={() => { setisEdit(true); setpropsData(props);props.DeleteData(true) }}>Edit</button>
                </td>
            </tr>
        )
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setpropsData((prev) => {
            return { ...prev, [name]: value }
        })
        
    }

    const data = () => {
        return props.name && props.address && props.age && props.city &&
            props.phone && props.pincode && props.email && props.dob;

    } 
    console.log(data)

    let isFormVaild=()=>{
        if(DisplayDataRow===''){
            alert("data is empty")
        }
    }

    const handleSave = async () => {
        await axios({
            method: "PUT",
            url: "http://localhost:8800/updateData",
            data: propsdata
        })
        fetchDataFromDatabase()
        console.log(propsdata)
        setisEdit(false);
        
    }

    return (
        <>
            <div style={{ maxHeight: '300px', maxWidth: '1300px' }} className="container  overflow-scroll ">
                {
                    fetchData ?
                        <table style={{ maxHeight: '200px' }} className='table table-border  text-center'>
                            <thead className=' position-relative'>
                                <tr className='table table-dark'>
                                    <th>Name</th>
                                    <th>Contact</th>
                                    <th>Email</th>
                                    <th>City</th>
                                    <th>Pincode</th>
                                    <th>Address</th>
                                    <th>Date-Of-Birth</th>
                                    <th>Age</th>
                                    <th>Action</th>

                                </tr>
                            </thead>

                            <tbody>
                                {fetchData.map(DisplayDataRow)}
                            </tbody>
                        </table>
                        : <h1>Unable to get data !</h1>
                }
            </div>

            {isEdit ?

                < div className="m-2 bg-dark p-2 w-50 position-absolute start-50 top-50 z-3 translate-middle-x bg-light text-center  text-dark  shadow-lg" >

                    <h2 className="text-center text-light">Edit Form</h2>
                    <div className="p-3 gap-2 m-2">

                        <div className="row gap-2">
                            <div className="col-12">
                                <input required onChange={handleChange} className="form-control" placeholder="Enter Name" type='text' name='name' value={propsdata.name} />
                            </div>
                            <div className="col-12">
                                <input required  maxLength={10} minLength={10} onChange={handleChange} className="form-control" placeholder="Enter Phone" type='tel' name='phone' value={propsdata.phone} />
                            </div>
                            <div className=" col-12">
                                <input required onChange={handleChange} className="form-control" placeholder="Enter E-mail" type='email' name="email" value={propsdata.email} />
                            </div>



                            <div className="  col-12">
                                <input required onChange={handleChange} className="form-control" placeholder="Enter City" type="text" name="city" value={propsdata.city} />
                            </div>
                            <div className="  col-12">
                                <input required onChange={handleChange} className="form-control" placeholder="Enter Address" type="text" name="address" value={propsdata.address} />
                            </div>
                            <div className=" col-12">
                                <input required onChange={handleChange} className="form-control" placeholder="Enter pincode" type="number" name="pincode" value={propsdata.pincode} />
                            </div>


                            <div className="col-12">
                                <input required onChange={handleChange} className="form-control" type="date" name="dob" value={propsdata.dob} />
                            </div>
                            <div className="col-12">
                                <input required onChange={handleChange} className="form-control " id="birthDate" placeholder="Enter Age" type="number" value={propsdata.age} name="age" />
                            </div>
                        </div>


                    </div>
                    <div className="d-flex justify-content-center m-2 gap-3">
                        <button className="btn btn-success" onClick={()=>{handleSave();isFormVaild()}}>save</button>
                        <button className="btn btn-danger" onClick={() => { setisEdit(false) }} >cancel</button>
                    </div>
                </div > : null


            }

            { isDelete ?
                <div className='delete-popup m-2  bg-dark p-2 w-50 position-absolute start-50 top-0 z-3 translate-middle-x bg-light text-center  text-dark  shadow-lg '>
                     <div className='mb-2 text-light'>
                        <h3>Are you want to delete this data </h3>
                        <button className='btn btn-success' >Delete</button>
                        <button className='btn btn-danger' onClick={setisDelete(false)} >Cancle</button>
                     </div>
                </div>:null
            }
        </>
    );

}
export default ReadData
