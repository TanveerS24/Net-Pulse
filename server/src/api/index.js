export default function handler(req, res) {
  if (req.method === 'GET') {
    // Access query parameters: req.query.paramName
    const name = req.query.name || 'World';
    res.status(200).send(`Hello ${name}! This is a GET request response.`);
  } else {
    res.status(405).send('Method Not Allowed');
  }
}
