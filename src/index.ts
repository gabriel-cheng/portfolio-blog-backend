import app from "./app";
const port = process.env.PORT || 5000;

function main() {
    app.listen(port, () => {
        console.log(`Server ir running on port ${port}!`);
    });
}

main();
