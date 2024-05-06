import express from "express";
import mongoose from "mongoose";

const autSchema = new mongoose.Schema(
    {
        username: {
            type: String,
        },
        email: {
            type: String,
        },
        password: {
            type: String,
        },
    }
);

const authModel = mongoose.model("users", autSchema);

export default authModel;

