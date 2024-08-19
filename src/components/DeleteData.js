import axios from "axios"
import React from "react"


let deleteData = async (name, id) => {

    

    try {
        // alert(`you are tryinng to delete ${name} !`)

        let result = await axios({
            method: 'delete',
            url: `http://localhost:8800/delete/${id}`,
        })

        if (result.status === 200) {
            console.log("data have been successfuly  deleted")

        } else {
            throw ("kuch to gadbad hai")



        }
    } catch (err) {
        alert("unable to delete data !")
    }

    return (
        <>


        </>
    );


}

export { deleteData }