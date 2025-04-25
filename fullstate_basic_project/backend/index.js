import app from "./express.js"

console.log('Hellow Basic Backend Js');

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Home Url the app is lessning on port = http://localhost:${port}`);
    console.log(`Port Url is lessning on port = http://localhost:${port}/port`);
})


export default app;