import React, {useEffect, useState} from "react";
import axios from "axios";
import ReactDOM from 'react-dom';


export default function AllStudents() {

    const [firstname,setFirstname] = useState(" ");
    const [lastname,setLastName] = useState(" ");
    const [place,setPlace] = useState(" ");

    const [students,setStudents] = useState([]);
useEffect(()=>{

    function getStudents(){
        axios.get("http://localhost:8070/student").then((res)=>{
            //console.log(res)
            setStudents(res.data)
        }).catch((err)=>{
            alert(err.message)
        })
    }

    getStudents();

})


    const deletest=(id)=>{
        console.log(id);
        axios.delete(`http://localhost:8070/student/delete/${id}`).then(res=>{
            console.log(res);
            alert("deleted")
            //window.location="/"
        })

    }

    const changeState = () => {

    };



    return(

        <div>
            {
                students.map(students=>(
                    <div key={students._id} class="card" style={{borderRadius:'10px',padding:'15px',backgroundColor:"whitesmoke",display:"inline-block",marginLeft:'15px',marginTop:'10px'}}>

                        <div className="card-body">
                            <h2>First Name : {students.firstname}</h2>
                            <h2>Last Name : {students.lastname}</h2>
                            <h2>Place : {students.place}</h2>

                                <button  type="submit"  style={{marginLeft:'20px'}} className="btn btn-warning" ><a  href="/add" onClick={()=>changeState({
                                    setFirstname:students.firstname,
                                    setLastName:students.lastname,
                                    setPlace:students.place
                                })
                                }>Update</a></button>
                                <button  type="submit"  style={{marginLeft:'20px'}} className="btn btn-danger" onClick={()=>deletest(students._id)}>Delete</button>

                        </div>
                    </div>

                ))
            }

        </div>
    )
}