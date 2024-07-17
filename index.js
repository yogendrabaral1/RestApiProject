import express from 'express';
import uuid from 'uniqid';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

const users = [
    {
        id: uuid(),
        name: 'John Doe',
        email: 'abc@123',
        age: 30
    },
    {
        id: uuid(),
        name: 'Doe Jack',
        email: 'abc@123',
        age: 28
    }
]

app.all('/', (req, res) => {
    res.send('I am up and running');
});

// CREATE
app.post('/users', (req, res) => {
    const user = {
        id: uuid(),
        ...req.body
    }
    console.log(req.body);
    users.push(user);
    res.status(201).json(user);
});

// READ
app.get('/users', (req, res) => {
    res.json(users);
});

// UPDATE
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name, email, age } = req.body;
    const user = users.find(user => user.id === id);
    if(!user){
        res.status(400).json({ message: 'User not found' });
    }else {
        if (name) user.name = name;
        if (email) user.email = email;
        if (age) user.age = age;
    }
    res.json(user);
});

// DELETE
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const index = users.findIndex(user => user.id === id);
    users.splice(index, 1);
    res.json({ message: 'User deleted' });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});