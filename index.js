const express = require("express");
const app = express();

app.use(express.json());

let movies = [];
let id = 1;

// CREATE
app.post("/movies", (req, res) => {
    const movie = { id: id++, ...req.body };
    movies.push(movie);

    res.json({
        status: "success",
        message: "Movie added",
        data: movie
    });
});

// READ ALL
app.get("/movies", (req, res) => {
    res.json({
        status: "success",
        data: movies
    });
});

// READ ONE
app.get("/movies/:id", (req, res) => {
    const movie = movies.find(m => m.id == req.params.id);

    if (!movie) {
        return res.json({ status: "error", message: "Movie not found" });
    }

    res.json({
        status: "success",
        data: movie
    });
});

// UPDATE
app.put("/movies/:id", (req, res) => {
    const movie = movies.find(m => m.id == req.params.id);

    if (!movie) {
        return res.json({ status: "error", message: "Movie not found" });
    }

    Object.assign(movie, req.body);

    res.json({
        status: "success",
        message: "Movie updated",
        data: movie
    });
});

// DELETE
app.delete("/movies/:id", (req, res) => {
    const index = movies.findIndex(m => m.id == req.params.id);

    if (index === -1) {
        return res.json({ status: "error", message: "Movie not found" });
    }

    movies.splice(index, 1);

    res.json({
        status: "success",
        message: "Movie deleted"
    });
});

module.exports = app;

if (require.main === module){
    app.listen(3000, () => {
        console.log("server running di port 3000")
    });
}