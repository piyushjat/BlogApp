const express=require('express');
const app=express();

require("dotenv").config();
const PORT=process.env.PORT || 6000;

app.use(express.json());


const blog=require("./routes/blog");

app.use("/api/v1",blog);

const dbConnect=require("./config/database");
dbConnect();


app.listen(PORT, () => {
    console.log('Server initiated Successfully');
});

app.get('/', (req,res) => {
    res.send("<h1>Lets Post Something.....</h1>")
})