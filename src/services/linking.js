import { SERVER_URL, BASE_URL } from "./axios";

const config = {
    screens: {
        RecipeItem: {
            path: "/recipe/:id",
            parse: {
                id: (id) => `${id}`
            }
        },
    }
};

const linking = {
    prefixes: ['https://cheftastic-2', 'https://cheftastic-2.el.r.appspot'],
    config
};

export default linking;