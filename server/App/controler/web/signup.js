import signUpModel from "../../Model/signupModel.js";

export let insertQuery = async (req, res) => {
    try {
        let { name, fatherName, age, phoneNo, email, password } = req.body;
        let insertData = new signUpModel({
            name,
            fatherName,
            age,
            phoneNo,
            email,
            password
        })
        const savedUser = await insertData.save()
        res.send({
            status: "201",
            message: "your data sucessfully inserted",
            savedUser
        })
    }
    catch (err) {
        res.send({
            status: "failure",
            message: "somethimg is wrong",
            error: err.message
        })
    }
}

export let findData = async (req, res) => {
    try {
        const { email, password } = req.body;

        const findData = await signUpModel.findOne({ email });
        if (!findData) {
            return res.status(404).send({
                status: "failure",
                message: "Email not found",
            });
        }

        if (findData.password !== password) {
            return res.status(401).send({
                status: "failure",
                message: "Invalid password",
            });
        }

        res.send({
            status: 201,
            message: "You are successfully logged in",
            findData,
        });
    } catch (err) {
        res.status(500).send({
            status: "failure",
            message: "Something went wrong",
            error: err.message,
        });
    }
};

export let viewData = async (req, res) => {
    let viewAllUser = await signUpModel.find();
    res.send({
        status: 201,
        message: "Your data is sucessfully showing",
        viewAllUser
    })
}
export let deleteData = async (req, res) => {
    try {
        let deleteId = req.params.id;
        let deleteCommand = await signUpModel.deleteOne({ _id: deleteId })
        if (!deleteId) {
            res.send({
                status: 404,
                message: "Delete id is not found"
            })
        }
        res.send({
            status: 201,
            message: "your entry is successfully deleted",
            deleteCommand
        })

    }
    catch (err) {
        res.send({
            status: 201,
            message: "Something is wrong"
        })
    }
}
export let updateData = async (req, res) => {
    try {
        let updataId = req.params.id;
        let { name, fatherName, age, phoneNo, email, password } = req.body;
        let updatedData = ({
            name,
            fatherName,
            age,
            phoneNo,
            email,
            password
        })
        let finalData = await signUpModel.updateOne({ _id: updataId }, updatedData)
        res.send({
            statue: 201,
            message: " your data is successfully update",
            finalData
        })
    }
    catch (err) {
        res.send({
            statue: 201,
            message: " your data is successfully update",
            error: err.message
        })
    }
}