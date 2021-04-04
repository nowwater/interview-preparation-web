var correct = "정답입니다!";
var inCorrect = "틀렸습니다!";


var java_ans = ["5", "1", "3", "4"];
var java_desc = ["자바는 전체 소스 코드를 컴파일한 후 바이트코드로 변환하는 컴파일러 언어이다. 그리고 인터프리터에 의해 바이트 코드 명령어를 해석하고 실행한다.",
                 ".java -> .class -> 클래스 로더에 의해 JVM 메모리에 탑재 -> Execution Engine 에 의해 해석",
                 "Weak Generational Hypothesis 에 의하면 새로 생성된 객체는 금방 사용되지 않는 상태가 되고, 오래된 객체에서 새로 생성된 객체로의 참조는 거의 일어나지 않는다. <br> Heap 메모리에서 생성된 후 참조되지 않는 객체를 찾아 제거하고 참조되는 객체들을 묶어 메모리를 효율적으로 관리한다.",
                 "Checked Exception 은 예외 처리가 필수이며, 처리하지 않으면 컴파일되지 않는다. <br> ex) JVM 이 외부와 통신할 때(네트워크, 파일 시스템)"]

var web_ans = ["interpret", "", "", ""];
var web_desc = ["자바는 전체 소스 코드를 컴파일한 후 바이트코드로 변환하는 컴파일러 언어이다.", "", "", ""]

var cs_ans = ["interpret", "", "", ""];
var cs_desc = ["자바는 전체 소스 코드를 컴파일한 후 바이트코드로 변환하는 컴파일러 언어이다.", "", "", ""]

var ps_ans = ["interpret", "", "", ""];
var ps_desc = ["자바는 전체 소스 코드를 컴파일한 후 바이트코드로 변환하는 컴파일러 언어이다.", "", "", ""]


function showAnswer(category, num){
    var wrapSelector = category + "Wrap" + num;
    var resultSelector = category + "Res" + num;
    var descSelector = category + "Desc" + num;
    var question = category + num;

    var comm = 'input[name="' + question + '"]:checked';

    var received = $(comm).val();
    var expected;
    var returnDesc;

    if(category == "java"){
        expected = java_ans[num -1];
        returnDesc = java_desc[num - 1];
    } else if(category == "web"){
        expected = web_ans[num - 1];
        returnDesc = web_desc[num - 1];
    } else if(category == "cs"){
        expected = cs_ans[num - 1];
        returnDesc = cs_desc[num - 1];
    } else if(category == "ps"){
        expected = ps_ans[num - 1];
        returnDesc = ps_desc[num - 1];
    }

    
    var wrapper = document.getElementById(wrapSelector);
    wrapper.style.visibility="visible";
    wrapper.style.background="#C4FCD4";

    document.getElementById(resultSelector).style.display="inline";
    document.getElementById(descSelector).style.display="inline";

    if(received === expected){
        document.getElementById(resultSelector).style.color="blue";
        document.getElementById(resultSelector).innerHTML=correct;
        document.getElementById(descSelector).style.color="blue";
        document.getElementById(descSelector).innerHTML=returnDesc;
    } else{
        document.getElementById(resultSelector).style.color="red";
        document.getElementById(resultSelector).innerHTML=inCorrect
        document.getElementById(descSelector).style.color="red";
        document.getElementById(descSelector).innerHTML="다시 한번 생각해보세요.";
    }
    var button = question + "_show";
    var toggle = question + "_hide";
    
    document.getElementById(button).style.display="none";
    document.getElementById(toggle).style.display="block";
}

function hideAnswer(category, num){
    var question = category + num;
    var button = question + "_hide";
    var toggle = question + "_show";

    var wrapSelector = category + "Wrap" + num;
    var resultSelector = category + "Res" + num;
    var descSelector = category + "Desc" + num;


    document.getElementById(wrapSelector).style.visibility="hidden";
    document.getElementById(resultSelector).style.display="none";
    document.getElementById(descSelector).style.display="none";

    document.getElementById(button).style.display="none";
    document.getElementById(toggle).style.display="block";
}