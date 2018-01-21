const express = require("express");

const PORT = process.env.PORT || 3000;
// create app
const app = express();
// static file location
app.use(express.static("dist"));

app.listen(PORT, () => {
    console.log(`server is up in ${PORT}`);
});
