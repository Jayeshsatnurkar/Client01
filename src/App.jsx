import React, { useState } from "react"
import Header from './components/includes/Header';
import Footar from './components/includes/Footar';
import CreateData from "./components/CreateData";
import ReadData from "./components/ReadData";

import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'


const App = () => {

    const [isLoad, setIsLaod] = useState(false);
    const [isDelete, setisDelete] = useState(false)

    const liveReload = () => {
        setIsLaod(!isLoad);
    }

    const deletePopUp=()=>{
    <div className='delete-popup m-2  bg-dark p-2 w-50 position-absolute start-50 top-0 z-3 translate-middle-x bg-light text-center  text-dark  shadow-lg '>
    <div className='mb-2 text-light'>
        <h3>Are you want to delete this data </h3>
        <button className='btn btn-success' onClick={''} >Delete</button>
        <button className='btn btn-danger' onClick={''} >Cancle</button>
    </div>
    </div>
    }

    return (
        <>
            <Header />
            <CreateData liveReload={liveReload} />
            <ReadData isLoad={isLoad} liveReload={liveReload} DeleteData={isDelete}   />
            <Footar />
        </>

    );

}



export default App;
