import mysql from 'serverless-mysql';
import { SQLStatement } from 'sql-template-strings';
require('dotenv-extended').load();

const db = mysql({
    config: {
        host: process.env.MYSQL_HOST,
        database: process.env.MYSQL_DATABASE,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD
    }
});

const query = async (query: SQLStatement) => 
{
    try 
    {
        // TODO : add protection against injections ?
        const results = await db.query(query);
        await db.end();
        return results;
    }
    catch (error) 
    {
        console.error(error);
        return { error };
    }
};

export default query;
