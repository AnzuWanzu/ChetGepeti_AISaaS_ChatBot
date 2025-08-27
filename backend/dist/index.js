import app from "./app.js";
import { connectDB } from "./db/connection.js";
const PORT = process.env.PORT;
//Connections and Listener
connectDB()
    .then(() => {
    app.listen(PORT, () => console.log(`Connected to Server and Database |
         Listening on port: ${PORT}`));
})
    .catch((error) => {
    console.log(error);
});
//# sourceMappingURL=index.js.map