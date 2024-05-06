import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Register = () => {
    const navigate = useNavigate();
    const [input, setInput] = useState(
        {
            username: "",
            email: "",
            password: "",
        }
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("Sending registration request...");
            const res = await axios.post("http://localhost:9000/api/v1/user/register", input);
            console.log("res");
            alert(res.data.message);
            navigate("/login");

        } catch (error) {
            alert(error.response.data.message);
        }
    };

    return (
        <>
            <div className="container shadow">
                <h2 className="text-center my-3">Sign Up</h2>
                <div className="col-md-12 my-3 d-flex items-center justify-content-center">
                    <div className="row">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="formGrpexinput" className="form-label">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="username"
                                    value={input.username}
                                    onChange={
                                        (e) => setInput({ ...input, [e.target.name]: e.target.value })
                                    }
                                    className="form-control"
                                    id="formGrpexinput"
                                    placeholder="Enter Name"
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="formrpexinput" className="form-label">
                                    Email
                                </label>
                                <input
                                    type="text"
                                    name="email"
                                    value={input.email}
                                    onChange={
                                        (e) => setInput({ ...input, [e.target.name]: e.target.value })
                                    }
                                    id="formrpexinput"
                                    className="form-control"
                                    placeholder="Enter Email"
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="formGrpexinpu" className="form-label">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={input.password}
                                    className="form-control"
                                    onChange={
                                        (e) => setInput({ ...input, [e.target.name]: e.target.value })
                                    }
                                    id="formGrpexinpu"
                                    placeholder="Enter Password"
                                />
                            </div>
                            <div className="mb-3">
                                <button type="submit" className="btn btn-primary btn-block">
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </>
    );
};

export default Register;
