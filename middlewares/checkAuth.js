
import poll from '../config/db.js';

const checkAuth = async (req, res, next) => {
  const sessionid = req.headers.authorization?.split(' ')[1] || '';
  try {
    if (!sessionid) {
      return res.status(401).json({ message: 'Auth failed! Please try to Login' });
    }
    const sql = 'SELECT role.role AS user_role, sessions.userid AS sessionid FROM role JOIN special_table ON role.roleid = special_table.roleid JOIN sessions ON special_table.userid = sessions.userid WHERE sessions.sessionid = ?'
    const [rows, fields] = await poll.query(sql, sessionid);
    if (rows.length > 0 && rows[0].user_role === 'Admin') {
      next();
    } else {
      return res.status(403).json({ message: 'Unauthorized Access Please Login' });
    }
  } catch (error) {
    console.error('Error in checkAuth:', error);
    res.status(500).json({ error: error.message });
  }
}

export default checkAuth;