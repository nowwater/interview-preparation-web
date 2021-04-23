var correct = "정답입니다!";
var inCorrect = "틀렸습니다!";
var progress = [0, 0, 0, 0, 0];

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

var cs_ans = [["deadlock", "교착상태", "데드락"],
              ["lru", "lru알고리즘"],
              ["roundrobin", "라운드로빈"], 
              ["transaction", "트랜잭션"]];
var cs_desc = ["멀티 프로그래밍 환경에서 한정된 자원을 얻기 위해 서로 경쟁하는 상황인 데드락에 대한 설명이다.",
               "Least-Recently-Used, 즉 LRU 알고리즘에 대한 설명이다.",
               "선점 스케줄링 중 하나인 Round-Robin 알고리즘에 대한 설명이다.", 
               "하나의 트랜잭션이 성공적으로 끝나면 Commit을 통해 DB에 반영하고, 트랜잭션이 비정상적으로 종료되면 트랜잭션 이전의 상태로 rollback 한다."]

var ps_ans = [["다익스트라", "다익스트라알고리즘"],
              ["elogv"], 
              ["위상정렬","topologysort"], 
              ["v+e", "e+v"]];
var ps_desc = ["다익스트라는 특정 노드에서 다른 노드로 가는 최단 경로를 구하는 알고리즘이다.", 
               "E개의 간선을 모두 PQ에 넣고 빼는 과정을 수행한다 -> ELog(E) 이지만, E <= V^2 이므로, ELog(V^2) = 2ELog(V) = O(ELogV)", 
               "위상정렬은 그래프 노드간 순서를 고려하여 탐색하는 알고리즘이다.", 
               "차례대로 모든 노드를 확인하면서, 해당 노드에서 출발하는 간선을 차례대로 제거해나가기 때문에 O(V + E) 이다."]

function descriptiveAnswer(category, num){
    var selector = '#' + category + num;
    var wrapSelector = category + "Wrap" + num;
    var resultSelector = category + "Res" + num;
    var descSelector = category + "Desc" + num;

    // 소문자로 바꾸고 정규식을 사용하여 중간에 공백들을 모두 제거
    var received = $(selector).val().toLowerCase().replace(/(\s*)/g, '');
    
    var question = category + num;
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

    if(expected.includes(received)){
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