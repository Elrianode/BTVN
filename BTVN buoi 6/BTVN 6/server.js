const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/public/answer.html');
});

app.get('/ask', (req, res) => {
	res.sendFile(__dirname + '/public/ask.html');
});

app.get('/answer', (req, res) => {
	res.sendFile(__dirname + '/public/answer.html');
});
app.get('/show', (req, res) => {
    res.sendFile(__dirname + '/public/show.html')
});

app.post('/createquestion', (req, res) => {
	let questionList = JSON.parse(fs.readFileSync('./questions.json'));

	const newQuestion = {
		id: questionList.length,
		questionContent: req.body.questionContent,
		yes: 0,
		no: 0
	};

	questionList.push(newQuestion);

	fs.writeFileSync('./questions.json', JSON.stringify(questionList));

	res.redirect('/answer');
});

app.get('/randomquestion', (req, res) => {
	let questionList = JSON.parse(fs.readFileSync('./questions.json'));

	if (questionList.length > 0) {
		let randomIndex = Math.floor(Math.random() * questionList.length);
		let questionRandom = questionList[randomIndex];
		res.send(questionRandom);
	}
});

app.post('/answer', (req, res) => {
	const { questionid, answer } = req.body;
	// const questionid = req.body.questionid;
	// const answer = req.body.answer;
	let questionList = JSON.parse(fs.readFileSync('./questions.json'));
	questionList[questionid][answer] += 1;
	fs.writeFileSync('./questions.json', JSON.stringify(questionList));
	res.send({ success: 1 });
});
app.get('/showQuesttion', (req, res) => {
	if (questionList.length > 0) {
		let showQuesttion = questionRandom;
		res.send(showQuesttion);
	}
});

app.use(express.static('public'));

app.listen(3000, (err) => {
	if (err) console.log(err)
	else console.log('Server is listening at port 3000');
});