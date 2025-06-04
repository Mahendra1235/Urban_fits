const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

// CORS setup with Access-Control-Allow-Private-Network support
const corsOptions = {
  origin: 'http://localhost:3000', // adjust this if your frontend is served from a different origin
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: true
};

app.use(cors(corsOptions));

// Manually add Access-Control-Allow-Private-Network header for PNA compliance
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Private-Network', 'true');
  next();
});

app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root@123',
  database: 'fashion_store'
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

// Handle preflight (OPTIONS) requests
app.options('*', (req, res) => {
  res.setHeader('Access-Control-Allow-Private-Network', 'true');
  res.sendStatus(204);
});

// GET all products
app.get('/products', (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Database error' });
    } else {
      res.json(results);
    }
  });
});

// POST order submission
app.post('/submit-order', (req, res) => {
  const { address, items, total } = req.body;

  const orderQuery = `
    INSERT INTO orders (name, street, city, state, zip, phone, total_amount)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  const orderValues = [
    address.name,
    address.street,
    address.city,
    address.state,
    address.zip,
    address.phone,
    total
  ];

  db.query(orderQuery, orderValues, (err, result) => {
    if (err) {
      console.error('Order insert error:', err);
      return res.status(500).json({ error: 'Failed to insert order' });
    }

    const orderId = result.insertId;
    const itemsQuery = `
      INSERT INTO order_items (order_id, product_id, title, quantity, price)
      VALUES ?
    `;

    const itemValues = items.map(item => [
      orderId,
      item.id,
      item.title,
      item.quantity,
      item.price
    ]);

    db.query(itemsQuery, [itemValues], (err2) => {
      if (err2) {
        console.error('Items insert error:', err2);
        return res.status(500).json({ error: 'Failed to insert order items' });
      }

      res.status(200).json({ message: 'Order placed successfully', orderId });
    });
  });
});

// Start the server
app.listen(8081, () => {
  console.log(`Server running on http://localhost:8081`);
});
