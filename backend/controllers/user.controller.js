import { User } from "../models/user.model.js";

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        // Validation
        if (!username || !password || !email) {
            return res.status(400).json({ message: 'All fields are Required' })
        }
        //checks if user exists already

        const exixting = await User.findOne({ email: email.toLowerCase() });
        if (exixting) {
            return res.status(400).json({ message: 'User already Exists' })
        }

        // Create user
        const user = await User.create({
            username,
            email: email.toLowerCase(),
            password,
            loggedIn: false,
        });

        res.status(200).json({
            message: 'User Registered',
            User: { id: user.id, email: user.email, username: user.username }
        });

    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message })

    }
};

const loginUser = async (req, res) => {
    try {

        // check if users already exixt

        const { email, password } = req.body;

        const user = await User.findOne({
            email: email.toLowerCase()
        });

        if (!user)
            return res.status(400).json({
                message: "User not found"
            });


        //compare password

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({
            message: "Invalid credentials"
        })

        res.status(200).json({
            message: "User logged in",
            user: {
                id: user._id,
                email: user.email,
                username: user.username
            }
        })

    } catch (error) {
        res.status(500).json({
            message: " internal server error"
        })
    }
}

const logoutUser = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({
            email
        });

        if (!user) return res.status(404).json({
            message: "User Not Found"
        });
        res.status(200).json({
            message: "Logout Successful"
        });
    } catch (error) {
        res.status(500).json({
            message: " internal server error"
        });
    }
}

export {
    registerUser,
    loginUser,
    logoutUser
}