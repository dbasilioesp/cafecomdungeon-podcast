const ENV = {
    development: {
        api: 'http://localhost:3000',
    },
    production: {
        api: 'https://cafe-com-dungeon-api.onrender.com',
    }
};

export default ENV[process.env.NODE_ENV];