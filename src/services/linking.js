import { SERVER_URL } from "./axios";

const config = {
    screens: {
        RecipeItem: {
            path: "/api/post/get/:id",
            parse: {
                id: (id) => `${id}`
            }
        },
    }
};

const linking = {
    prefixes: [SERVER_URL, "https://cheftastic2.herokuapp", "cheftastic2", "cheftastic2.herokuapp"],
    config
};

export default linking;