import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddCat = () => {
    const navigate = useNavigate();
    const [input, setInput] = useState({ title: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const HandladdCat = async (e) => {
        e.preventDefault();
        if (!input.title) {
            setError("Title is required");
            return;
        }
        setError("");
        setLoading(true);
        try {
            const res = await axios.post(
                "http://localhost:9000/api/v1/add/categories",
                input,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            alert(res.data.message);
            setLoading(false);
            navigate("/");
        } catch (error) {
            alert(error.response.data.message);
            setLoading(false);
        }
    };

    return (
        <>
            <div className="container shadow p-4 mt-5">
                <h2 className="text-center my-3">Add New Category</h2>
                <div className="row d-flex justify-content-center">
                    <form onSubmit={HandladdCat} className="col-md-6">
                        <div className="mb-3">
                            <label htmlFor="formGrpexinput" className="form-label">
                                Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={input.title}
                                className={`form-control ${error ? "is-invalid" : ""}`}
                                onChange={(e) =>
                                    setInput({ ...input, [e.target.name]: e.target.value })
                                }
                                id="formGrpexinput"
                                placeholder="Enter Title"
                            />
                            {error && <small className="text-danger">{error}</small>}
                        </div>
                        <div className="mb-3 d-grid">
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={loading}
                            >
                                {loading ? (
                                    <span
                                        className="spinner-border spinner-border-sm"
                                        role="status"
                                        aria-hidden="true"
                                    ></span>
                                ) : (
                                    "Add Category"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddCat;
