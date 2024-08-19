const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { body, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');

// Initialize Express app for testing
const app = express();
app.use(bodyParser.json());
app.use(cors());

let inventory = [];
let users = [];
let customers = [];

// Inventory Routes
app.get('/api/inventory', (req, res) => {
  res.json(inventory);
});

app.post('/api/inventory', [
  body('name').isString().notEmpty(),
  body('price').isFloat({ gt: 0 }),
  body('size').isString().notEmpty(),
  body('stock').isInt({ min: 0 })
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, price, size, stock } = req.body;
  const existingItemIndex = inventory.findIndex(item => item.name === name);

  if (existingItemIndex >= 0) {
    inventory[existingItemIndex] = { name, price, size, stock };
  } else {
    inventory.push({ name, price, size, stock });
  }

  res.json(inventory);
});

app.delete('/api/inventory/:name', (req, res) => {
  const { name } = req.params;
  inventory = inventory.filter(item => item.name !== name);
  res.json(inventory);
});

// User Routes
app.get('/api/users', (req, res) => {
  res.json(users);
});

app.post('/api/users', [
  body('username').isString().notEmpty(),
  body('role').isString().notEmpty()
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, role } = req.body;
  const newUser = { username, role };
  users.push(newUser);
  res.json(users);
});

app.put('/api/users/:username', [
  body('role').isString().notEmpty()
], (req, res) => {
  const { username } = req.params;
  const { role } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const userIndex = users.findIndex(user => user.username === username);

  if (userIndex >= 0) {
    users[userIndex].role = role;
    res.json(users);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

app.delete('/api/users/:username', (req, res) => {
  const { username } = req.params;
  users = users.filter(user => user.username !== username);
  res.json(users);
});

// Customer Routes
app.get('/api/customers', (req, res) => {
  res.json(customers);
});

app.post('/api/customers', [
  body('id').isString().notEmpty(),
  body('name').isString().notEmpty(),
  body('email').isEmail(),
  body('phone').isString().optional()
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id, name, email, phone } = req.body;
  const existingCustomerIndex = customers.findIndex(customer => customer.id === id);

  if (existingCustomerIndex >= 0) {
    customers[existingCustomerIndex] = { id, name, email, phone };
  } else {
    customers.push({ id, name, email, phone });
  }

  res.json(customers);
});

app.put('/api/customers/:id', [
  body('name').isString().notEmpty(),
  body('email').isEmail(),
  body('phone').isString().optional()
], (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const customerIndex = customers.findIndex(customer => customer.id === id);

  if (customerIndex >= 0) {
    customers[customerIndex] = { id, name, email, phone };
    res.json(customers);
  } else {
    res.status(404).json({ error: 'Customer not found' });
  }
});

app.delete('/api/customers/:id', (req, res) => {
  const { id } = req.params;
  customers = customers.filter(customer => customer.id !== id);
  res.json(customers);
});

// Tests
describe('POS System API Tests', () => {
  // Inventory Tests
  describe('Inventory Endpoints', () => {
    it('should return all inventory items', async () => {
      const res = await request(app).get('/api/inventory');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeInstanceOf(Array);
    });

    it('should create a new inventory item', async () => {
      const res = await request(app)
        .post('/api/inventory')
        .send({ name: 'Item1', price: 10.0, size: 'M', stock: 100 });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toContainEqual({ name: 'Item1', price: 10.0, size: 'M', stock: 100 });
    });

    it('should update an existing inventory item', async () => {
      await request(app)
        .post('/api/inventory')
        .send({ name: 'Item1', price: 10.0, size: 'M', stock: 100 });
      const res = await request(app)
        .post('/api/inventory')
        .send({ name: 'Item1', price: 12.0, size: 'M', stock: 150 });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toContainEqual({ name: 'Item1', price: 12.0, size: 'M', stock: 150 });
    });

    it('should delete an inventory item', async () => {
      await request(app)
        .post('/api/inventory')
        .send({ name: 'Item2', price: 5.0, size: 'S', stock: 50 });
      const res = await request(app).delete('/api/inventory/Item2');
      expect(res.statusCode).toEqual(200);
      expect(res.body).not.toContainEqual({ name: 'Item2', price: 5.0, size: 'S', stock: 50 });
    });
  });

  // User Tests
  describe('User Endpoints', () => {
    it('should return all users', async () => {
      const res = await request(app).get('/api/users');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeInstanceOf(Array);
    });

    it('should create a new user', async () => {
      const res = await request(app)
        .post('/api/users')
        .send({ username: 'user1', role: 'admin' });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toContainEqual({ username: 'user1', role: 'admin' });
    });

    it('should update a user role', async () => {
      await request(app)
        .post('/api/users')
        .send({ username: 'user2', role: 'user' });
      const res = await request(app)
        .put('/api/users/user2')
        .send({ role: 'admin' });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toContainEqual({ username: 'user2', role: 'admin' });
    });

    it('should delete a user', async () => {
      await request(app)
        .post('/api/users')
        .send({ username: 'user3', role: 'user' });
      const res = await request(app).delete('/api/users/user3');
      expect(res.statusCode).toEqual(200);
      expect(res.body).not.toContainEqual({ username: 'user3', role: 'user' });
    });
  });

  // Customer Tests
  describe('Customer Endpoints', () => {
    it('should return all customers', async () => {
      const res = await request(app).get('/api/customers');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeInstanceOf(Array);
    });

    it('should create a new customer', async () => {
      const res = await request(app)
        .post('/api/customers')
        .send({ id: '1', name: 'Customer1', email: 'customer1@example.com', phone: '1234567890' });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toContainEqual({ id: '1', name: 'Customer1', email: 'customer1@example.com', phone: '1234567890' });
    });

    it('should update a customer', async () => {
      await request(app)
        .post('/api/customers')
        .send({ id: '2', name: 'Customer2', email: 'customer2@example.com' });
      const res = await request(app)
        .put('/api/customers/2')
        .send({ name: 'UpdatedCustomer2', email: 'updatedcustomer2@example.com' });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toContainEqual({ id: '2', name: 'UpdatedCustomer2', email: 'updatedcustomer2@example.com' });
    });

    it('should delete a customer', async () => {
      await request(app)
        .post('/api/customers')
        .send({ id: '3', name: 'Customer3', email: 'customer3@example.com' });
      const res = await request(app).delete('/api/customers/3');
      expect(res.statusCode).toEqual(200);
      expect(res.body).not.toContainEqual({ id: '3', name: 'Customer3', email: 'customer3@example.com' });
    });
  });
});
