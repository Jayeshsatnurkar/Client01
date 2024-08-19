
import axios from "axios"
import React, { useState, useEffect } from "react"

import ReadData from "./ReadData"
//import { response } from "express"

const CreateData = (props) => {

    let [formData, setformData] = useState({

        name: "",
        phone: '',
        email: "",
        city: "",
        age: '',
        address: "",
        pincode: "",
        dob: ""

    })

    let [status, setStatus] = useState(false);

    let [message, setMessage] = useState("");

    let [messageColor, setMessageColor] = useState("");

    //  Handle for input change
    let handleChange = (e) => {
        let { name, value } = e.target
        setformData((prev) => {
            return { ...prev, [name]: value };
            
        })
    };

    const calculateAge =(dob) =>{

        const birthDate=new Date(dob);
        const currentDate= new Date();
        let age =currentDate.getFullYear()-birthDate.getFullYear();
        let month =currentDate.getMonth()-birthDate.getMonth();
        if(month<0 || (month === 0 && currentDate.getDate()<birthDate.getDate())){
              age--;
        }

        setformData((prev)=>{
            return{...prev,age:age};
        })

         console.log("my age is ",age)
    }

    

    const isFormVaild = () => {
        return formData.name && formData.address && formData.age && formData.city &&
            formData.phone && formData.pincode && formData.email && formData.dob;

    }

    let handleSubmit = async (e) => {
        e.preventDefault()
        try {
            let result = await axios({
                method: "post",
                url: "http://localhost:8800/acceptform",
                data: formData
            })

            if (result.status === 200) {
                console.log('form submitted successfully')
                resetForm()
                setStatus(true)
                closePopUp()
                setMessage("Data has been submitted successfully !")
                setMessageColor("success")
                props.liveReload();
            } else {
                resetForm()
                setStatus(true)
                closePopUp()
                setMessage("unable to submit data")
                setMessageColor("danger")
                props.liveReload();
            }

        } catch (err) {
            console.log("unable to send data !", err)
        }
    }

    let resetForm = () => {

        setformData(
            {
                name: "",
                email: "",
                phone: "",
                city: "",
                age: "",
                address: "",
                pincode: "",
                dob: ""
            }

        )
    }

    let closePopUp = () => {

        setTimeout(() => {
            setStatus(false)
        }, 5000)
    }

    return (
        <>

            <div className="container shadow-lg my-5  p-5 ">
                <h1 className="mb-4 text-center">Registration Form</h1>

                <form onSubmit={handleSubmit}>
                    <div className="d-flex flex-column  gap-3">

                        <div className="row gap-3">
                            <div className="row col-lg">
                                <input required onChange={handleChange} className="form-control" placeholder="Enter Name" type='text' name='name' value={formData.name} />
                            </div>
                            <div className="row col-lg">
                                <input minLength={10} maxLength={10} required onChange={handleChange} className="form-control" placeholder="Enter Phone" type='tel' name='phone' value={formData.phone} />
                            </div>
                            <div className="row col-lg">
                                <input required onChange={handleChange} className="form-control" placeholder="Enter E-mail" type='email' name="email" value={formData.email} />
                            </div>
                        </div>

                        <div className="row gap-3">
                            <div className=" row col-lg">
                                <input required onChange={handleChange} className="form-control" placeholder="Enter City" type="text" name="city" value={formData.city} />
                            </div>
                            <div className=" row col-lg-8">
                                <input required onChange={handleChange} className="form-control" placeholder="Enter Address" type="text" name="address" value={formData.address} />
                            </div>
                            <div className=" row col-lg">
                                <input required onChange={handleChange} className="form-control" placeholder="Enter pincode" type="number" name="pincode" value={formData.pincode} />
                            </div>
                        </div>


                        <div className="row  gap-3 ">
                            <div className="col">
                                <input required onChange={(e)=>{handleChange(e);calculateAge(e.target.value)}} className="form-control" type="date" name="dob" value={formData.dob} />
                            </div>
                            <div className="col">
                          <input required onChange={handleChange} className="form-control " id="birthDate" placeholder="Enter Age" type="number" value={formData.age}  name="age" readOnly/>
                            </div>
                        </div>



                        <div className="d-flex justify-content-center gap-4 mt-2">
                            <button type="submit" className="btn btn-success" id="submitBtn" disabled={!isFormVaild()}>Submit</button>
                            <button type="reset" onClick={resetForm} className="btn btn-danger">Reset</button>
                        </div>

                    </div>

                </form>

            </div>

            {/* pop up */}

            {

                status ?
                    <div className="mt-3 p-2 w-50 position-absolute start-50 top-0 z-3 translate-middle-x bg-light text-center  text-dark  shadow-lg">
                        <h4 className={`text-${messageColor}`}>{message}</h4>
                    </div> : null
            }

        </>
    );


}

export default CreateData