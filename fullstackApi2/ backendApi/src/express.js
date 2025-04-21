import express from "express";
// const app = require('/src/express.js')
import cors from "cors";

const app = express();

app.use(cors());

// app.use(cors({
//     origin: 'http://localhost:5000'
// }));



app.use(cors());

app.get('/', (request, response) => {
    response.send("The Server is ready");
})

// create a semple API and use frontend

app.get('/travel', (request, response) => {
    const travels = [

        {
            id: 1,
            title: 'United State',
            requirement: 'Posport, Teket, Time,',
            instruction: 'You neet to have Pasport and Teket come in sugested time. Thanks',
        },

        {
            id: 2,
            title: 'United Kengdom',
            requirement: 'Posport, Teket, Time,',
            instruction: 'You neet to have Pasport and Teket come in sugested time. Thanks',
        },

        {
            id: 3,
            title: 'United Arabemarat',
            requirement: 'Posport, Teket, Time,',
            instruction: 'You neet to have Pasport and Teket come in sugested time. Thanks',
        },

        {
            id: 4,
            title: 'Pakistan',
            requirement: 'Posport, Teket, Time,',
            instruction: 'You neet to have Pasport and Teket come in sugested time. Thanks',
        },

        {
            id: 5,
            title: 'Japan',
            requirement: 'Posport, Teket, Time,',
            instruction: 'You neet to have Pasport and Teket come in sugested time. Thanks',
        },

        {
            id: 6,
            title: 'Spain',
            requirement: 'Posport, Teket, Time,',
            instruction: 'You neet to have Pasport and Teket come in sugested time. Thanks',
        },

        {
            id: 7,
            title: 'Itley',
            requirement: 'Posport, Teket, Time,',
            instruction: 'You neet to have Pasport and Teket come in sugested time. Thanks',
        },

        {
            id: 8,
            title: 'Apganestan',
            requirement: 'Posport, Teket, Time,',
            instruction: 'You neet to have Pasport and Teket come in sugested time. Thanks',
        },

        {
            id: 9,
            title: 'France',
            requirement: 'Posport, Teket, Time,',
            instruction: 'You neet to have Pasport and Teket come in sugested time. Thanks',
        },

        {
            id: 10,
            title: 'Newslaind',
            requirement: 'Posport, Teket, Time,',
            instruction: 'You neet to have Pasport and Teket come in sugested time. Thanks',
        },

    ];

    response.send(travels)
});

const port = 5000;

app.listen(port, () => {
    console.log(`Server run in http://localhost:${port}`),
        console.log(`Server run in http://localhost:${port}/travel`)
})

export default app;