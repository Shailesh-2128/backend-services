const express = require("express")
const mongoose = require("mongoose")
const {createClient} = require("redis")
const app = express()


app.use((req, res, next) => {
    const start = process.hrtime();

    res.on("finish", () => {
        const diff = process.hrtime(start);
        const timeInMs = diff[0] * 1000 + diff[1] / 1e6;
        console.log(`${req.method} ${req.originalUrl} - ${timeInMs.toFixed(2)} ms`);
    });

    next();
});



const client = createClient();

client.on("error", (err) => {
    console.error("Redis Client Error:", err);
});

async function connectRedis() {
    await client.connect();
    console.log("Redis connected");
} 
connectRedis();



mongoose.connect("mongodb://localhost:27017/drive").then(()=>console.log("mongodb connected"));

const productSchema = new mongoose.Schema({
     name : String,
     description : String,
     price : Number,
     category : String,
     specs : Object
})

const product = mongoose.model("product",productSchema);

app.get("/api/products", async (req, res) => {

    const key = generateCacheKey(req);

    const start = process.hrtime();

    const cachedProducts = await client.get(key);

    if (cachedProducts) {
        const diff = process.hrtime(start);
        const timeInMs = diff[0] * 1000 + diff[1] / 1e6;

        console.log(`✅ CACHE HIT - ${timeInMs.toFixed(2)} ms`);
        return res.json(JSON.parse(cachedProducts));
    }

    console.log("❌ CACHE MISS");

    const products = await product.find();

    await client.set(key, JSON.stringify(products));

    const diff = process.hrtime(start);
    const timeInMs = diff[0] * 1000 + diff[1] / 1e6;

    console.log(`🗄️ DB HIT - ${timeInMs.toFixed(2)} ms`);

    return res.json(products);
});


function generateCacheKey(req) {
    const baseUrl = req.path
        .replace(/^\/+|\/+$/g, '')
        .replace(/\//g, ':');

    const params = req.query || {};

    const sortedParams = Object.keys(params)
        .sort()
        .map(key => `${key}=${params[key]}`)
        .join('&');

    return sortedParams
        ? `${baseUrl}?${sortedParams}`
        : baseUrl;
}


app.listen(7101,()=>{
    console.log("server running on 7101")
})

