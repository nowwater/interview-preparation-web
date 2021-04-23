var correct = "정답입니다!";
var inCorrect = "틀렸습니다!";


var java_ans = ["5", "1", "3", "4"];
var java_desc = ["자바는 전체 소스 코드를 컴파일한 후 바이트코드로 변환하는 컴파일러 언어이다. 그리고 인터프리터에 의해 바이트 코드 명령어를 해석하고 실행한다.",
                 ".java -> .class -> 클래스 로더에 의해 JVM 메모리에 탑재 -> Execution Engine 에 의해 해석",
                 "Weak Generational Hypothesis 에 의하면 새로 생성된 객체는 금방 사용되지 않는 상태가 되고, 오래된 객체에서 새로 생성된 객체로의 참조는 거의 일어나지 않는다. <br> Heap 메모리에서 생성된 후 참조되지 않는 객체를 찾아 제거하고 참조되는 객체들을 묶어 메모리를 효율적으로 관리한다.",
                 "Checked Exception 은 예외 처리가 필수이며, 처리하지 않으면 컴파일되지 않는다. <br> ex) JVM 이 외부와 통신할 때(네트워크, 파일 시스템)"]

var web_ans = ["4", "5", "3", "2"];
var web_desc = ["4번은 하이브리드 앱에 대한 설명이다.",
                "HTML 파서가 HTML 구문과 어휘를 분석하여 DOM 트리 생성하고, CSS 파서가 Style 규칙을 생성한다. 이후 이 둘을 어테치먼트하여 렌더 트리를 생성하고, 렌더 트리를 배치하여 UI백엔드가 렌더 트리의 노드들을 돌며 형상을 그린다", 
                "SSR 방식은 모든 요청에 대해 서버가 리소스를 전달받아 해석하여 화면에 렌더링해주기 때문에 요청 데이터가 많을수록 성능 문제(자원 낭비, 불필요한 트래픽)가 발생한다. <br/>\
                 반면, CSR 방식은 사용자의 행동에 따라 필요한 부분만 다시 읽어오므로 빠른 인터랙션이 가능하다.", 
                "MVC 패턴은 코드의 재사용에 유용하며, 사용자 인터페이스와 응용 프로그램 개발에 소요되는 시간을 줄여주는 효과적인 설계 방식이다."]

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

    console.log(received + " " + expected);

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