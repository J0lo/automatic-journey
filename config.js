var config = {
    email: {
        service: 'gmail',
        address: '',
        password: '',
        dateOptions: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    },
    db: {
        host: '',
        port: 3307,
        dialect: 'mariadb',
        database: 'invest', 
        username: 'investScraper', 
        password: ''
    }
}

module.exports = config;