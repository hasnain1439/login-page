import express from "express";
import { findData, insertQuery } from "../controler/web/signup.js";

let rountingPath = express.Router();
rountingPath.post("/insert-data",insertQuery );
rountingPath.post("/find",findData );

export default rountingPath