import { SERVER_URL, BASE_URL } from "./axios";

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
    prefixes: [`${SERVER_URL}/${BASE_URL}`],
    config
};

export default linking;