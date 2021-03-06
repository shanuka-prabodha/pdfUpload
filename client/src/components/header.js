import React from "react";
import {Link} from 'react-router-dom';

function Header() {
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" style={{color:"red"}} href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">

                            <Link to="/" className="nav-link active" > Home</Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/UploadFile">Upload file</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/FileList">filelist</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link disabled" href="#" tabIndex="-1" aria-disabled="true">Disabled</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Header;

