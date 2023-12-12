import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { userModel } from '../modals/User.js';

const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if the username already exists
        const user = await userModel.findOne({ username });

        if (user) {
            return res.status(400).json({ error: "Username already exists" });
        }

        // Hash the password before saving it to the database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user with the hashed password
        const newUser = new userModel({
            username,
            password: hashedPassword,
        });

        // Save the new user to the database
        await newUser.save();
        res.json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await userModel.findOne({ username });

    if (!user) {
        return res.status(401).json({ message: "User does not exist" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(401).json({ message: "Username or password is incorrect" });
    }

    const token = jwt.sign({ id: user._id }, "secret123");
    res.json({ token, userID: user._id });
});



export { router as userRouter };
