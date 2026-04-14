import app from './app.js';

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
    console.log(`Server está rodando na porta ${PORT} => http://localhost:${PORT}`);
});