import express from "express";
import { deleteData, findData, insertQuery, updateData, viewData } from "../controler/web/signup.js";

let rountingPath = express.Router();
rountingPath.post("/insert-data",insertQuery );
rountingPath.post("/find",findData );
rountingPath.get("/view", viewData)
rountingPath.delete("/delete/:id", deleteData)
rountingPath.put("/edit/:id", updateData )

export default rountingPath