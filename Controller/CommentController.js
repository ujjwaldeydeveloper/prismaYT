import prisma from "../DB/db.config.js";


export const fetchCommments = async (req, res) => {

    const comments = await prisma.comment.findMany({
        include: {
            user: {
                select: {
                    name: true
                }
            },
            post: {
                select: {
                    title: true,
                    description: true
                }
            }
        }
    });

    return res.json({status: 200, data: comments});
}

// * Create a new Comment
export const createComment = async (req, res) => {
    const { user_id, post_id, comment } = req.body;

    // increment the comment count

    await prisma.post.update({
        where: {
            id: Number(post_id)
        },
        data: {
            comment_count: {
                increment: 1 // Increment the comment count by 1
            }
        }
    });

    try {
        const newComment = await prisma.comment.create({
            data: {
                user_id: Number(user_id),
                post_id: Number(user_id),
                comment: comment
            }
        });

        return res.json({ status: 200, message: "Comment created successfully", data: newComment });
    } catch (error) {
        return res.status(500).json({ status: 500, message: "Internal Server Error", error: error.message });
    }
}

// *  Show the Comment based on ID
export const showUserComment = async (req, res) => {
    const commentID = req.params.id;
    const post = await prisma.comment.findFirst({
        where: {
            id: Number(commentID)

        }
    });

    return res.json({status: 200, data: post});
}


// * Update ethe User

export const updateComment = async (req, res) => {
    const commentID = req.params.id; // Corrected from req.param.id to req.params.id
    const {userID, postID, comment} = req.body;

    try {

        // Update the user
        await prisma.comment.update({
            where: {
                id: Number(commentID)
            },
            data: {
                user_id: Number(userID),
                post_id: Number(postID),
                comment: comment
            }
        });

        return res.json({status: 200, message: "Comment updated successfully"});
    } catch (error) {
        return res.status(500).json({status: 500, message: "Internal Server Error", error: error.message});
    }
}

// * Delete the user

export const deleteComment = async (req, res) => {
    const commentID = req.params.id; 

    await prisma.post.update({
        where: {
            id: Number(post_id)
        },
        data: {
            comment_count: {
                decrement: 1 // Decrement the comment count by 1
            }
        }
    });

    try {

        // Delete the user
        await prisma.comment.delete({
            where: {
                id: Number(commentID)
            }
        });

        return res.json({status: 200, message: "Comment deleted successfully"});
    } catch (error) {
        return res.status(500).json({status: 500, message: "Internal Server Error", error: error.message});
    }
}