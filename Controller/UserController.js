import prisma from "../DB/db.config.js";


export const fetchUsers = async (req, res) => {

    const users = await prisma.user.findMany();

    return res.json({status: 200, data: users});
}

// * Create a new user

export const createUser = async (req, res) =>  {
    const {name, email, password} = req.body;

    const findUser = await prisma.user.findUnique({
        where: {
            email: email
        }
    });

    if(findUser) {
        return res.json({status: 400, message: "Email already exists, Please put another email."});
    }


    const newUser = await prisma.user.create({
        data: {
            name: name,
            email: email,
            password: password
        }
    });

    return res.json({status: 200, message: "User created successfully", data: newUser});
}

// *  Show the user based on ID
export const showUser = async (req, res) => {
    const userID = req.params.id;
    const user = await prisma.user.findFirst({
        where: {
            id: Number(userID)

        }
    });

    return res.json({status: 200, data: user});
}


// * Update ethe User

export const updateUser = async (req, res) => {
    const userID = req.params.id; // Corrected from req.param.id to req.params.id
    const {name, email, password} = req.body;

    try {
        // Check if the user exists
        const existingUser = await prisma.user.findUnique({
            where: {
                id: Number(userID)
            }
        });

        if (!existingUser) {
            return res.status(404).json({status: 404, message: "User not found"});
        }

        // Update the user
        await prisma.user.update({
            where: {
                id: Number(userID)
            },
            data: {
                name: name,
                email: email,
                password: password
            }
        });

        return res.json({status: 200, message: "User updated successfully"});
    } catch (error) {
        return res.status(500).json({status: 500, message: "Internal Server Error", error: error.message});
    }
}

// * Delete the user

export const deleteUser = async (req, res) => {
    const userID = req.params.id; 

    try {
        // Check if the user exists
        const existingUser = await prisma.user.findUnique({
            where: {
                id: Number(userID)
            }
        });

        if (!existingUser) {
            return res.status(404).json({status: 404, message: "User not found"});
        }

        // Delete the user
        await prisma.user.delete({
            where: {
                id: Number(userID)
            }
        });

        return res.json({status: 200, message: "User deleted successfully"});
    } catch (error) {
        return res.status(500).json({status: 500, message: "Internal Server Error", error: error.message});
    }
}