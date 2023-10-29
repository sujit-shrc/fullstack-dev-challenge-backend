import poll from '../config/db.js';
import randomstring from 'randomstring';

const login = async (req, res) => {
    // checking if session exist on request
    const sessionid = req.headers.authorization?.split(' ')[1] || '';
    try {
      if (sessionid && sessionid !== 'null' && sessionid !== 'undefined') {
        const sql = 'SELECT * FROM sessions WHERE sessionid = ?';
        const [rows, fields] = await poll.query(sql, sessionid);
        if (rows[0] && rows[0].length === 0) {
          return res.status(401).json({ message: 'Auth failed' });
        }
        res.status(200).json({ message: 'Auth successful', user: rows[0] });

      } else {
        
        // if user provides email and password
        const { email, password } = req.body;
        console.log("body")
        console.log(req.body)
        const sql = 'SELECT * FROM user WHERE email = ?';
        const [rows, fields] = await poll.query(sql, email);
        if (rows[0].length === 0) {
          return res.status(401).json({ message: 'Auth failed' });
        }
        // Matching passwords
        const isPasswordValid = password === rows[0].password
        if (!isPasswordValid) {
          return res.status(401).json({ message: 'Auth failed' });
        }
        const token = randomstring.generate({
          length: 12,
          charset: 'alphanumeric',
        });
        await poll.query('INSERT INTO sessions (sessionid, userid) VALUES (?, ?)', [
          token,
          rows[0].id,
        ]);
        res.status(200).json({ message: 'Auth successful', token });
      }
    } catch (error) {
      console.error('Error in login:', error);
      res.status(500).json({ error: error.message });
    }
  };  

export default login;
