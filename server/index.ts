import express,{Request,Response }from 'express';

const PORT = process.env.PORT?parseInt(process.env.PORT): 3000;

const app = express();


app.get('/', (req: Request, res: Response) => {
    res.send('Server is running');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});