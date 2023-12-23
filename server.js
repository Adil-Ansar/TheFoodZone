const app = require("./app");
const { dbConnect } = require("./helper/dbConnect");

const PORT = process.env.PORT || 3000; // Define the port

dbConnect(); // Connect to the database

app.listen(PORT, () => {
    console.log(`Server is working on http://localhost:${PORT}`);
});
