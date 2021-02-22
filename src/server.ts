import express from 'express';

const app = express();


app.get("/", (req, res) => {
    res.json({message: "Olá"})
})

app.post("/", (req, res) => {
    res.json({message: "Olá"})
})


app.listen(5000, () => {
    console.log("Server rodando...");
})