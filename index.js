const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req,res) => {
    res.json({message: "API Movie watchlist running"});
});

app.listen(3000, () =>{
    console.log("server running di port 3000");
});