import prisma from "../DB/db.config.js";


export const fetchPosts = async (req, res) => {

    const users = await prisma.post.findMany();

    return res.json({status: 200, data: users});
}

// * Create a new Post
export const createPost = async (req, res) => {
    const { user_id, title, description } = req.body;

    // Validate input
    if (!title || !description) {
        return res.status(400).json({ status: 400, message: "Missing required fields" });
    }

    const userIDNumber = Number(user_id);
    if (isNaN(userIDNumber)) {
        return res.status(400).json({ status: 400, message: "Invalid userID" });
    }

    // Check if user exists
    const userExists = await prisma.user.findUnique({
        where: { id: userIDNumber }
    });

    if (!userExists) {
        return res.status(404).json({ status: 404, message: "User not found" });
    }

    try {
        const newPost = await prisma.post.create({
            data: {
                user_id: userIDNumber,
                title: title,
                description: description
            }
        });

        return res.json({ status: 200, message: "Post created successfully", data: newPost });
    } catch (error) {
        return res.status(500).json({ status: 500, message: "Internal Server Error", error: error.message });
    }
}

// * Create a new Post
// export const createPost = async (req, res) =>  {
//     const { userID, title, description } = req.body;

//     // Validate input
//     if (!title || !description) {
//         return res.status(400).json({ status: 400, message: "Missing required fields" });
//     }

//     const userIDNumber = Number(userID);    
//     if (isNaN(userIDNumber)) {
//         return res.status(400).json({ status: 400, message: "Invalid userID" });
//     }

//     try {
//         const newPost = await prisma.post.create({
//             data: {
//                 userID: userIDNumber,
//                 title: title,
//                 description: description
//             }
//         });

//         return res.json({ status: 200, message: "Post created successfully", data: newPost });
//     } catch (error) {
//         return res.status(500).json({ status: 500, message: "Internal Server Error", error: error.message });
//     }
// }

// // * Create a new Post

// export const createPost = async (req, res) =>  {
//     const {userID, title, description} = req.body;

//     const newPost = await prisma.post.create({
//         data: {
//             userID: Number(userID),
//             title: title,
//             description: description
//         }
//     });

//     return res.json({status: 200, message: "Post created successfully", data: newUser});
// }

// *  Show the Post based on ID
export const showUserPost = async (req, res) => {
    const postID = req.params.id;
    const post = await prisma.post.findFirst({
        where: {
            id: Number(postID)

        }
    });

    return res.json({status: 200, data: post});
}


// * Update ethe User

export const updatePost = async (req, res) => {
    const postID = req.params.id; // Corrected from req.param.id to req.params.id
    const {userID, title, description} = req.body;

    try {
        // Check if the user exists
        const existingUser = await prisma.post.findUnique({
            where: {
                id: Number(userID)
            }
        });

        if (!existingUser) {
            return res.status(404).json({status: 404, message: "User not found"});
        }

        // Update the user
        await prisma.post.update({
            where: {
                id: Number(userID)
            },
            data: {
                userID: Number(userID),
                title: title,
                description: description
            }
        });

        return res.json({status: 200, message: "Post updated successfully"});
    } catch (error) {
        return res.status(500).json({status: 500, message: "Internal Server Error", error: error.message});
    }
}

// * Delete the user

export const deletePost = async (req, res) => {
    const postID = req.params.id; 

    try {
        // Check if the user exists
        const existingPost = await prisma.post.findUnique({
            where: {
                id: Number(postID)
            }
        });

        if (!existingPost) {
            return res.status(404).json({status: 404, message: "Post not found"});
        }

        // Delete the user
        await prisma.post.delete({
            where: {
                id: Number(postID)
            }
        });

        return res.json({status: 200, message: "Post deleted successfully"});
    } catch (error) {
        return res.status(500).json({status: 500, message: "Internal Server Error", error: error.message});
    }
}