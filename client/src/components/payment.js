import React,{useState} from "react";
import axios from "axios";
import master from "../Master.png"
import visa from "../visa.png"
import Payment_success from "./Payment_success";




export default function Payment(){


    const [type,setType] = useState(" ");
    const [number,setNumber] = useState();
    const [year,setYear] = useState();
    const [date,setDate] = useState();
    const [cvc,setCvc] = useState();
    const [payable,setPayable] = useState();


   // setPayable(600);

    function sendData(e){
        e.preventDefault();
        //alert(" Inserted");

        setPayable(600);

        const newuser = {
            type,
            number,
            year,
            date,
            cvc,
            payable

        }

        axios.post("http://localhost:8070/atm/",newuser).then((res)=>{
            alert(res.data);
            return <Payment_success to={"http://localhost:3000/success/"}/>

        }).catch((err)=>{
            alert(err)
        })

    }


    return (


                <div className="container" >

                    <br/>
                <div class="card" style={{borderRadius:'10px',padding:'25px',backgroundColor:"whitesmoke",display:"inline-block",marginLeft:'15px',marginTop:'10px'}}>
                        <form onSubmit={sendData}  >

                            <h4>Payment Details</h4>

                            <hr/>
                            <label className="font-weight-bold">Card Type *</label>
                            <div className="form-check form-check-inline"  >
                                <input  type="radio" name="type"  value="visa"
                                        onChange={(event)=>{
                                            setType(event.target.value)
                                        }}/>
                                <label  >Visa </label>
                                <img src={visa}  className="fullElipse"/>
                            </div>
                            <div className="form-check form-check-inline">

                                <input  type="radio" name="type"  value="master"
                                        onChange={(event)=>{
                                            setType(event.target.value)
                                        }}/>
                                <label >Mastercard</label>
                                <img src={master}  className="fullElipse"/>
                            </div>


                            <div className="form-group">
                                <label htmlFor="cardnumber" className="form-label">Card Number *</label>
                                <input type="text" className="form-control" id="cardnumber" placeholder="Enter Card Number"
                                       onChange={(event)=>{
                                           setNumber(event.target.value)
                                       }}/>

                            </div>

                            <div className="form-group">
                                <label htmlFor="year" className="form-label">Expiration Year *</label>
                                <select one className="form-control" id="exampleSelect2" onChange={(event)=>{
                                    setYear(event.target.value)
                                }}>
                                    <option></option>
                                    <option>2022</option>
                                    <option>2023</option>
                                    <option>2024</option>
                                    <option>2025</option>
                                    <option>2026</option>
                                    <option>2027</option>
                                    <option>2028</option>
                                    <option>2029</option>
                                    <option>2030</option>

                                </select>

                            </div>

                            <div className="form-group">
                                <label htmlFor="date" className="form-label">Expiration Month *</label>
                                <select one className="form-control" id="exampleSelect2" onChange={(event)=>{
                                    setDate(event.target.value)
                                }}>
                                    <option></option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    <option>6</option>
                                    <option>7</option>
                                    <option>8</option>
                                    <option>9</option>
                                    <option>10</option>
                                    <option>11</option>
                                    <option>12</option>

                                </select>

                            </div>

                            <div className="form-group">
                                <label htmlFor="cvv" className="form-label">CVV *</label>
                                <input type="text" className="form-control" id="cvv" placeholder="Enter CVV Number"
                                       onChange={(event)=>{
                                           setCvc(event.target.value)
                                           setPayable(200);
                                       }}/>



                            </div>


                            <br/>
                            <button type="submit" className="btn btn-warning" style={{marginLeft:'20px'}}>Cancel</button>
                            <button type="submit" className="btn btn-danger" style={{marginLeft:'20px'}}>Pay</button>

                        </form>

                    </div>


                    <div class="card" style={{borderRadius:'10px',padding:'25px',backgroundColor:"whitesmoke",display:"inline-block",marginLeft:'15px',marginTop:'10px'}}>


                        <h5>Your Order</h5>
                        <hr/>


                        Total Amount :  600.00 Rs

                        <hr/>



                    </div>

                </div>

            )

}




