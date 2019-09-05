# ChainOfResponsibility

## Info
- 이벤트 버블링
- 동작의 수행을 다른 객체에 떠넘기는 패턴.
- 책임연쇄 패턴
- 결정권이 있는 객체가 결정을 내리게 된다.


## 예제
구직자가 회사에 지원하고 합격제안을 받은 구직자가 입사여부를 결정하는 시뮬레이션을 구현했다.


```js

var Applicant = (function() {
    function Applicant(name, income) {
        this.name = name;
        this.salaryRequirement = income;
    }


    // 결정권 여부를 검증하는 로직
    Applicant.prototype.canMakeDecision = function(income) {

            var condition = this.salaryRequirement<=income;

            if(!condition){
                console.log(`${this.name}: ${income}이라고? 흐음..`);
            }
        
        return condition;
    }

    //결정을 한다.
    Applicant.prototype.makeDecision = function() {
        console.log(`${this.name}: 백수 탈출~!`)
    }

    return Applicant;
})();





var Company = (function() {
    function Company(name) {
        this.standard = 3000;
        this.applicants = [];
        this.name = name;
    }

    Company.prototype.apply = function(applicant) {
         this.applicants.push(applicant);
    }

         
    Company.prototype.makeDecision = function() {

        var result;
        var that = this;
        this.applicants.some(function(app){

            if(app.canMakeDecision(that.standard)){
                console.log(`${that.name}: ${app.name}을 채용하였습니다.`)
                result = app.makeDecision();
                return true;
            }
        })

        return result;
    };
    return Company;
})()

var company = new Company('kakao');


var app1 = new Applicant("박보영",4000);
app1.canMakeDecision = function(){
    console.log(`${this.name}: 여기 안다녀!`)
    return false;
}


var app2 = new Applicant("강미나",2400);
var app3 = new Applicant("손나은",2900);

company.apply(app1);
company.apply(app2);
company.apply(app3);

company.makeDecision();


```