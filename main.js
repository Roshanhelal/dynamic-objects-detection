var img;
var status1="";
var objects=[];
function setup(){ 
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
}

function draw(){
    image (video,0,0,380,380);
    if(status1 != ""){
        document.getElementById("status").innerHTML="status: objects detected"
        document.getElementById("number_of_objects").innerHTML="Number of objects: "+objects.length;
        for (let i = 0; i < objects.length; i++) {
            
        console.log(objects);
        percent=floor(objects[i].confidence*100);
        r=random(255)
        g=random(255)
        b=random(255)
        fill(r,g,b);
        text(objects[i].label+" "+percent+"%",objects[i].x,objects[i].y);
        noFill();
        stroke(r,g,b);
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
    }
    }
}

function modelLoaded(){
    console.log("model is loaded");
    status1=true;
}

function gotresults(error,results){
    if(error){
        console.log(error);
    }
    else{
      
        objects=results;
    }
}

function start(){
    document.getElementById("status").innerHTML="status: detecting object";
    objectDetector.detect(video,gotresults);
}