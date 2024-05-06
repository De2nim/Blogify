import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddCat = () => {

    const navigate = useNavigate();
    const [input, setInput] = useState(
        {
            title: "",
        }
    );

    const HandladdCat = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:9000/api/v1/add/categories", input,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    }
                });

            alert(res.data.message);
            navigate("/");
        } catch (error) {
            alert(error.response.data.message);
        }
    }

    return (
        <>
            <div className="container shadow">
                <h2 className="text-center my-3">Add New Category</h2>
                <div className="col-md-12 my-3 d-flex items-center justify-content-center">
                    <div className="row">
                        <form onSubmit={HandladdCat}>
                            <div className="mb-3">
                                <label htmlFor="formGrpexinput" className="form-label">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={input.title}
                                    className="form-control"
                                    onChange={
                                        (e) => setInput({
                                            ...input, [e.target.name]: e.target.value
                                        })
                                    }
                                    id="formGrpexinput"
                                    placeholder="Enter Title"
                                />
                            </div>
                            <div className="mb-3">
                                <button type="submit" className="btn btn-primary btn-block">
                                    Add Category
                                </button>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddCat;
