"use strict";

// import AuthModel...


const login = async (req,res) => {
};

const logout = (req, res) => {
    res.status(200).send({ token: null });
};


export default {
    login,
    logout
};