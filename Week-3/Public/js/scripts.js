const express = require('express');
const app = express();
app.use(express.static('public')); // Ensures public is served correctly
app.listen(3000, () => console.log('Server running on port 3000'));
