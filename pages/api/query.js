import mysql from 'mysql2/promise'

export default async function handler (req, res) {

  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: 'root',
    database: 'jamul'
  });

  try {
    const query = req.body.q;
    const [results] = await connection.execute(query);
    connection.end();
    res.status(200).json({got: results});
  }
  catch (error) {
    res.status(500).json({got: [error]});
  }

}