const neo4j = require('neo4j-driver');
// const dotenv = require("dotenv")

// dotenv.config();

const uri = 'neo4j+s://1e911c9d.databases.neo4j.io';
const user = 'neo4j';
const password = '006-PF_YAuBQAr2RuRUNSI30xv0CUe_e3eZOmesyJhM';

// const uri = process.env.NEO4J_URI;
// const user = process.env.NEO4J_user;
// const password = process.env.NEO4J_password;

var driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
export default driver;
