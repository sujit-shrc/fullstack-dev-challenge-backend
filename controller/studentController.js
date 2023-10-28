import poll from '../config/db.js'

const getStudents = async (req, res) => {
    try {
        const sql = 'SELECT * FROM students';
        const [rows, fields] = await poll.query(sql);
        if(rows.length > 0) {
          res.status(200).json({ students: rows });
        } else { 
          res.status(404).json({ message: 'No Data found' });
        }
      }
      catch (error) {
        console.error('Error in GetStudents:', error);
        res.status(500).json({ error: error.message });
    }
}

export default getStudents;