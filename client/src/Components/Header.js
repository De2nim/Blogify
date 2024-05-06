import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Header = () => {

    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    const Handlelogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        alert("Sucessfully logged out");
        navigate("/login");
    };


    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-primary">
                <Link className="navbar-brand text-white mx-3" to="/">
                    BLOGIFY
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <Link className="nav-link text-white" to="/">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/add-blog">
                                Add Blog
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/add-category">
                                Add Category
                            </Link>
                        </li>
                    </ul>
                    <div className="div-inline mx-auto my-2 my-lg-0">
                        {token && token !== null ? (
                            <>
                                <button className="btn btn-primary">Welcome : {username}</button>
                                <button onClick={Handlelogout} className="btn btn-primary">Logout</button>
                            </>

                        ) : (
                            <>
                                <Link to="/login" >
                                    <button className="btn btn-primary mr-2">Login</button>
                                </Link>
                                <Link to="/register" >
                                    <button className="btn btn-primary">Register</button>
                                </Link>
                            </>
                        )
                        }
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Header;