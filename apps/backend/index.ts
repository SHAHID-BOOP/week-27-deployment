import dotenv from "dotenv";
dotenv.config({ path: "../../packages/prisma/db/.env"})
import express from "express";
import { prismaclient } from "db/client";

const app = express();

app.use(express.json());

app.get("/users", (req,res) => {
    prismaclient.user.findMany()
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        })
})

app.post("/user", (req,res) => {
    const { username, password } = req.body

    if(!username || !password) {
        res.status(400).json({ error: "Usernane and password are required"});
        return
    }

    prismaclient.user.create({
        data: {
            username,
            password
        }
    })
        .then(user => {
            res.status(201).json(user);
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
})

app.listen(3001);
