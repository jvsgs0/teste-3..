S = "";
Objects = [];

function setup()
{
    canvas = createCanvas(480, 380);
    canvas.center();
    video.hide();
}

function start()
{
    ObjectDetector = ml5.ObjectDetector('cocossd', modelLoaded);
    document.getElementById("SH").innerHTML = "Status: Detectando objetos.";
    document.getElementById("QO").value;
}

function modelLoaded()
{
    console.log("Modelo Carregado! ");
    S = true;
}
function gotResult()
{
    if(error)
    {
        console.log(error);
    }
    console.log(results);
    Objects = results;

}

function draw()
{
    image(video, 0, 0, 480, 380);

    if (status != "")
    {
        for (i = 0; i < Objects; i++)
        {
            C = floor(Objects[i].confidence * 100);
            L = Objects[i].label;
            X = Objects[i].x;
            Y = Objects[i].y;
            text(L + " " + C + "%", X + 15, Y + 15);
            W = Objects[i].width;
            H = Objects[i].height;
            rect(X, Y, W, H);

            if (L == document.getElementById("QO").value)
            {
               video.stop();
               ObjectDetector.detect(gotResult);
               document.getElementById("SH").innerHTML = "Objeto encontrado";
               synth = window.speechSynthesis;
             utterThis = SpeechSynthesisUtterance("Objeto encontrado");
             synth.speak(utterThis)
            }
            else
            {
                document.getElementById("SH").innerHTML = "Objeto não encontrado";
            }
        }
    }
}