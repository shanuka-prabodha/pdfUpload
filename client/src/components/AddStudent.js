import React,{useState} from "react";
import axios from "axios";

export  default function AddStudent(){

    const [firstname,setFirstname] = useState(" ");
    const [lastname,setLastName] = useState(" ");
    const [place,setPlace] = useState(" ");


    function sendData(e){
        e.preventDefault();
        //alert(" Inserted");

        const newStudent = {
            firstname,
            lastname,
            place
        }

        axios.post("http://localhost:8270/student/add",newStudent).then(()=>{
            alert("Student Added")


        }).catch((err)=>{
            alert(err)
        })

    }


    return(



        <div className="container">
            <form onSubmit={sendData}>
                <div className="form-group">
                    <label htmlFor="name" className="form-label">Student Name</label>
                    <input type="text" className="form-control" id="name" placeholder="Enter Student Name"
                           onChange={(event)=>{
                               setFirstname(event.target.value)
                           }}/>

                </div>

                <div className="form-group">
                    <label htmlFor="age" className="form-label">Student Age</label>
                    <input type="text" className="form-control" id="age" placeholder="Enter Student Age"
                           onChange={(event)=>{
                               setLastName(event.target.value)
                           }}/>

                </div>

                <div className="form-group">
                    <label htmlFor="age" className="form-label">Student Gender</label>
                    <input type="text" className="form-control" id="gender" placeholder="Enter Student Gender"
                           onChange={(event)=>{
                               setPlace(event.target.value)
                           }}/>

                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

        </div>

    )


}