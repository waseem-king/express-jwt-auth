// this is the module to handle post made by users
const Post = require("../model/post.model");
const imageQueue = require("../queues/image.queue");
const createPost = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "Image file is required"
            });
        }

        const { title, caption } = req.body;

        const savePost = await Post.create({
            title,
            caption,
            image: req.file.path
        });

        await imageQueue.add({
            postId: savePost._id,
            imagePath: req.file.path
        },
            {
                attempts:3,
                backoff:{
                    type:"fixed",
                    delay:3000
                }
            })

        res.status(201).json({
            message: "Post created successfully",
            data: savePost
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

module.exports = { createPost }