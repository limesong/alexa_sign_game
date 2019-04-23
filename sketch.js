let video;
let mobileNet;
let label = '';
let classifier;
let loss;
let happyButton;
let sadButton;
let trainButton;



function modelReady() {
	console.log('Model is Ready');
	//mobileNet.predict(getResults);
}

function videoReady() {
	console.log('Video is Ready');
	//mobileNet.predict(getResults);

}


function whileTraining(loss) {

	if (loss==null){
		console.log('Training Complete')
		classifier.classify(getResults);
	} else {
		console.log(loss);
	}

}


function getResults(error, results) {

	if(error) {

		console.error(error);

	} else {

		console.log(results);
		label = results[0].className;
		classifier.classify(getResults);
	}

}



function setup() {
	createCanvas(320,270);
	background(0);
	video = createCapture(VIDEO);
	video.hide();
	background(0);
	mobileNet = ml5.featureExtractor('MobileNet',modelReady);
	classifier = mobileNet.classification(video, videoReady);

	happyButton = createButton('Hey Alexa');
	happyButton.mousePressed(function() {
		classifier.addImage('happy');
	})


	sadButton = createButton('Stop Alexa');
	sadButton.mousePressed(function() {
		classifier.addImage('sad');
	})


	trainButton = createButton('train');
	trainButton.mousePressed(function() {
		classifier.train(whileTraining(loss));
	})
}



function draw() {
	background(0);
	image(video,0,0,320,240);
	fill(255);
	textSize(32);
	createP(label, 10, height-20);
}
