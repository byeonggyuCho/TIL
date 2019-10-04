MyBatis 프레임워크의 트랜잭션 제어
==============================

 MyBatis 프레임워크는 관계형 데이터베이스의 레코드와 자바 도메인 객체 사이의 매핑을 자동화 해주는 ORM(Object Relation Mapping) 프레임워크로 데이터베이스의 SQL 문을 거의 그대로 사용할 수 있게 해준다.   
 특히 J2EE의 엔티티 빈(entity bean)이나 하이버네이트(Hibernate) 프레임워크에서는 (견해에 따라) 활용하기 어려운 집계나 조인도 데이터베이스의 SQL을 그대로 사용함으로 쉽게 활용할 수 있게 해준다.  

 MyBatis 프레임워크는 오랫동안 사랑받아 왔던 ORM 프레임워크인 iBatis 프레임워크를 동일한 개발자들이 내부 구조를 재설계하여 새롭게 만든 ORM 프레임워크이다.   
 (그래서 내부적으로는 iBatis라는 패키지 이름이 계속 사용되고 있다. 심지어 버전도 이어 받고 있다.)   
 MyBatis는 iBatis의 기본 골격을 거의 그대로 유지하고 있으므로, iBatis에 익숙한 개발자라면 MyBatis로 적응하는 것이 그렇게 어렵지 않을 것이다. 필자도 MyBatis 사용자 가이드를 보면서 간단한 MyBatis 프로그램을 어렵지 않게 작성할 수 있었다.   
 동작하는 MyBatis 애플리케이션을 작성하는 데 하루 정도 걸린 것 같다.  

## 1. 트랜잭션 관리 

 최근 프레임워크들은 선언적 트랜잭션 관리(DTM, declarative transaction management)라든지 컨테이너 관리 트랜잭션(CMT, Container Managed Transaction)들의 지원에 많은 노력을 기울이고 있다.  
선언적 트랜잭션 관리는 어노테이션 등을 사용하여 메소드나 클래스 단위의 트랜잭션의 흐름을 정의하는 방법이고, 컨테이너 관리 트랜잭션은 컨테이너 서버의 설정으로 컨테이너 내 객체들의 트랜잭션을 관리하는 방법이다.   
그런데 선언적 방법 또는 컨테이너 관리 방법 모두 데이터베이스를 연동하는 애플리케이션 개발자들에게 익숙하지 않다는 점이 문제가 된다.   
그 결과 이 두 방법으로는 개발자가 트랜잭션이 잘 처리 되었는지 안되었는지 확신하기가 어려울 수 있다.   
왜냐면 선언적 방법에서는 어떻게 선언하느냐에 따라 트랜잭션의 범위나 적용 방법이 달라지게 되는데 이것을 개발자가 쉽게 이해하지 못할 수 있고, 컨테이너 기반의 트랜잭션 관리는 J2EE의 엔티티 빈이나 CMT 기반 세션 빈의 실패로 이미 그 개발자들의 적응에 문제가 있음이 증명되었다고 볼 수 있다.   
그래도 여전히 이 두 방법이 추구되는 이유는 세상의 모든 데이터를 객체로 다루고 싶은 사람들의 주장이나 이상의 입김이 계속 업계로 작용하는 것이 아닐지 생각해 보게 된다.  
아무리 좋은 기술이더라도 개발자가 쉽게 이해하고 사용하고 확인할 수 없다면 좋은 기술이라고 볼 수 없는데, 뛰어나거나 위대한 그루(?)들이 개발자들을 이끌려는 방향이 너무 이상적인 것 같다.   어쨌든 DTM이든 CMT이든 개발자들에게는 너무 어렵다는 것이 필자가 가진 일관된 의견이다.  

 그럼 트랜잭션을 프로그램으로 관리하는 것은 어떤가? 트랜잭션을 프로그램을 관리하는 방법은 수십 년 동안 개발자들이 사용해 오던 방법이다.   
 이 방법을 사용하면, 데이터베이스 처리 로직이 중첩 또는 내포 형식의 복잡한 구조를 갖지 않는 일상적인 구조인 경우, 개발자들은 누구든지 쉽게 트랜잭션의 범위를 명시적으로 프로그램으로 지정할 수 있고, 이렇게 명시적으로 지정된 트랜잭션의 범위는 일반적으로 쉽게 파악된다.   
 그리고 데이터베이스와 관련된 비즈니스 로직들은 단순한 구조를 갖는 경우가 대부분이다.   
 더욱이 긴 절차가 필요한 비즈니스에서 일정 절차까지의 진행 상황을 커밋해야 하는 경우엔, 프로그램으로 관리하는 데이터베이스 트랜잭션 방법이 더 적합하다.   
 선언적 방법으로 진행해야 하는 경우 각 메소드마다 트랜잭션의 전파를 고려해야 하는 어려움이 따르고, 컨테이너 관리 방법도 긴 절차의 트랜잭션을 관리하기 위해서는 더욱 복잡하게 각 단계마다 세션 빈과 같은 것들을 만들어야 한다.   
 그렇기 때문에 최신 프레임워크들이 DTM이나 CMT을 제시함에도 불구하고 개발자들에게는 프로그램으로 관리하는 데이터베이스 트랜잭션이 여전히 선호되고 있다.   
 그리고 iBatis 프레임워크는 이런 기본적인 기능에 충실한 프레임워크 중 하나였다.  

## 2. iBatis의 장점 

 iBatis 프레임워크는 데이터베이스 트랜잭션에 있어서 질의 메소드 단위의 자동 커밋과 필요한 경우 언제든지 프로그램으로 트랜잭션의 범위를 지정하게 해주는 유연성을 동시에 제공한다.   그리고 데이터베이스 처리와 관련된 자원도 자동으로 해제한다.   
 다시 말해 iBatis 프레임워크를 사용면 JDBC API를 다루는 경우 발생하는 connection 객체나 statement 객체들을 해제하기 위해 호출해야 하는 close() 메소드들을 호출하지 않아도 된다.  
자원 해제 문제는 애플리케이션의 안정성과 가용성에 아주 중요한 문제를 야기할 수 있다.   
제대로 해제 되지 않는 자원 객체들은 자원의 고갈이나 메모리 부족의 문제를 야기시키고 결과적으로 애플리케이션의 다운 문제로 확대될 수 있기 때문이다.   
iBatis를 사용하면 데이터베이스 연동에서 발생하는 이런 자원 샘 현상도 방지할 수 있다.  

 iBatis 프레임워크를 사용하면 데이터베이스를 연동하는 코드를 다음과 같이 간단하게 작성할 수 있다.  
~~~ java
…
try {
      sqlMapClient.startTransaction();
      sqlMapClient.update("insertAccountViaParameterMap", account);
      sqlMapClient.commitTransaction();
    } finally {
      sqlMapClient.endTransaction();
    }
…
~~~
 위 코드처럼 iBatis를 사용하면 자원 해제를 위해 close() 메소드들을 직접 호출하지 않아도 되며, 필요한 곳에서 언제든지 데이터베이스 트랜잭션을 시작하고 종료할 수 있다.   단 finally 블록 안에 트랜잭션을 종료하는 로직을 반드시 추가하여 트랜잭션이 닫히지 않는 것을 방지해야 한다.   이 코드에서 볼 수 있듯이 iBatis는 데이터베이스 연동에 필요한 코드를 상당히 줄여 줄 뿐만 아니라, 데이터베이스 트랜잭션도 자유롭게 지정할 수 있게 하고, 소스와 SQL 쿼리를 분리함으로 이기종 데이터베이스의 이식성도 좋게 한다.   결과적으로 데이터베이스 비즈니스 개발의 생산성을 향상시킨다.   그리고 이런 장점들이 MyBatis로 이어져 발전하고 있다.   또 위 코드에서 트랜잭션 관련 코드들을 제거하더라도 iBatis가 메소드 단위의 커밋을 지원하게 설정된 경우 메소드가 성공적으로 호출되면 자동으로 커밋까지 실행된다.   그러므로 이 경우 데이터베이스 처리 로직이 단 하나의 갱신이나 추가 메소드를 호출하는 경우 트랜잭션 과련 로직을 굳이 추가하지 않아도 된다.   즉 테이블에 입력할 정보가 준비된 경우, 아래와 같이 단 한 줄로 데이터베이스에 레코드를 추가할 수 있게 된다.  
~~~ java
…
sqlMapClient.update("insertAccountViaParameterMap", account);
…
~~~

## 3. MyBatis의 변화 

 그런데 MyBatis에 와서 이상한 변화가 생겼다.   
 첫째, 그동안 스레드 안전한 SqlMapClient 클래스가 사라졌다.  
SqlMapClient 객체 대신 스레드 안전하지 않는 SqlSesssion 객체를 사용하여 질의를 수행한다.  
(SqlSesssion 객체가 스레드 안전하지 않은 이유는 요청(request) 또는 메소드(method) 범위의 객체이기 때문이다.)  
또 SqlSession 객체는 자원 해제를 위해 반드시 close() 메소드를 호출해야 한다.   
나아진 점도 있다. 데이터베이스의 트랜잭션을 시작하는 메소드가 없어도 트랜잭션을 처리할 수 있다.   
(즉 openSession 메소드의 호출과 더불어 필요에 따라 자동으로 트랜잭션이 시작된다.)   
그 결과 MyBatis API를 사용한 데이터베이스를 연동하는 코드가 다음과 같이 작성된다.  

~~~ java
...
SqlSession session = sqlSessionFactory.openSession();
try {
// following 3 lines pseudocod for "doing some work"
    session.insert(…);
    session.update(…);
    session.delete(…);
    session.commit();
} finally {
    session.close();
}
...
~~~ 

위 코드에서 볼 수 있듯이 MyBatis 프레임워크를 사용하는 경우 사용을 마친 SqlSession 객체는 반드시 닫아 주어야 한다.   
즉 finally 블록 등에서 반드시 session.close()를 호출해야 한다.   
iBatis에서는 없던 호출을 MyBatis에서는 넣어 주어야 한다.   
의아한 것은 왜 자원 해제의 누락으로 애플리케이션의 안정성을 해칠 수도 있는 로직을 개발자에게 떠 넘겼냐 하는 것이다.  
또 close()를 호출하지 않는 방법을 전혀 제공하지 않는 것도 아니다.  
MyBatis 프레임워크를 Spring 프레임워크와 결합하여 SqlSessionTemplate 클래스 객체를 사용하면 자원 해제에 대한 문제가 사라진다.  

MyBatis 프레임워크는 Spring 프레임워크에서 MyBatis를 통합하여 사용할 수 있게 MyBatis-Spring를 제공한다.   
MyBatis-Spring를 통해 만들어진 SqlSessionTemplate 객체는 SqlSession 객체와 달리 내부적으로 인터셉터를 통해 자동으로 close()를 호출하여 자원 해제 문제를 해결한다.   
개발자는 SqlSessionTemplate 객체를 사용하는 경우 더 이상 MyBatis의 자원 해제 문제를 신경 쓰지 않아도 된다.   
그런데 대신 MyBatis-Spring은 다른 문제를 야기한다.   
데이터베이스 트랜잭션의 문제이다.   
MyBatis-Spring을 사용하는 경우, MyBatis의 SqlSessionTemplate 객체는 commit(), rollback() 메소드를 사용할 수 없다.   
즉 SqlSessionTemplate 객체를 이용하여 프로그램적으로는 트랜잭션을 관리할 수 없게 한다.   
억지로 SqlSessionTemplate 객체의 commit() 메소드를 호출하면 다음과 같은 예외를 발생한다.  

 ~~~
java.lang.UnsupportedOperationException: Manual commit is not allowed over a Spring managed SqlSession
 at org.mybatis.spring.SqlSessionTemplate.commit(SqlSessionTemplate.java:278)
 at com.brm.mybatis.MybatisSupportTest.testProgramacTraction(MybatisSupportTest.java:28)
 at sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method)
 at sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:57)
 at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
 at java.lang.reflect.Method.invoke(Method.java:601)
 at org.junit.runners.model.FrameworkMethod$1.runReflectiveCall(FrameworkMethod.java:44)
 at org.junit.internal.runners.model.ReflectiveCallable.run(ReflectiveCallable.java:15)
 at org.junit.runners.model.FrameworkMethod.invokeExplosively(FrameworkMethod.java:41)
 at org.junit.internal.runners.statements.InvokeMethod.evaluate(InvokeMethod.java:20)
 at org.springframework.test.context.junit4.statements.RunBeforeTestMethodCallbacks.evaluate(RunBeforeTestMethodCallbacks.java:74)
 at org.springframework.test.context.junit4.statements.RunAfterTestMethodCallbacks.evaluate(RunAfterTestMethodCallbacks.java:82)
 at org.springframework.test.context.junit4.statements.SpringRepeat.evaluate(SpringRepeat.java:72)
 at org.springframework.test.context.junit4.SpringJUnit4ClassRunner.runChild(SpringJUnit4ClassRunner.java:240)
 at org.junit.runners.BlockJUnit4ClassRunner.runChild(BlockJUnit4ClassRunner.java:49)
 at org.junit.runners.ParentRunner$3.run(ParentRunner.java:193)
 at org.junit.runners.ParentRunner$1.schedule(ParentRunner.java:52)
 at org.junit.runners.ParentRunner.runChildren(ParentRunner.java:191)
 at org.junit.runners.ParentRunner.access$000(ParentRunner.java:42)
 at org.junit.runners.ParentRunner$2.evaluate(ParentRunner.java:184)
 at org.springframework.test.context.junit4.statements.RunBeforeTestClassCallbacks.evaluate(RunBeforeTestClassCallbacks.java:61)
 at org.springframework.test.context.junit4.statements.RunAfterTestClassCallbacks.evaluate(RunAfterTestClassCallbacks.java:70)
 at org.junit.runners.ParentRunner.run(ParentRunner.java:236)
 at org.springframework.test.context.junit4.SpringJUnit4ClassRunner.run(SpringJUnit4ClassRunner.java:180)
 at org.eclipse.jdt.internal.junit4.runner.JUnit4TestReference.run(JUnit4TestReference.java:50)
 at org.eclipse.jdt.internal.junit.runner.TestExecution.run(TestExecution.java:38)
 at org.eclipse.jdt.internal.junit.runner.RemoteTestRunner.runTests(RemoteTestRunner.java:467)
 at org.eclipse.jdt.internal.junit.runner.RemoteTestRunner.runTests(RemoteTestRunner.java:683)
 at org.eclipse.jdt.internal.junit.runner.RemoteTestRunner.run(RemoteTestRunner.java:390)
 at org.eclipse.jdt.internal.junit.runner.RemoteTestRunner.main(RemoteTestRunner.java:197)
~~~

## 4. Spring 프레임워크의 트랜잭션 관리 

SqlSessionTemplate 객체를 이용하여 MyBatis의 자원 해제 문제를 해결하고 나니, 프로그램 방법의 데이터베이스 트랜잭션 관리가 불가능해지는 새로운 문제가 등장했다.  
이 문제에 대해 MyBatis 문서는 Spring 프레임워크의 프로그램적 트랜잭션 관리 방법을 사용할 수 있다고 언급한다.   
한 가지는 TransactionTemplate을 이용한 프로그램 방법이고 다른 가지는 PlatformTransactionManager를 사용한 프로그램 방법이 있다고 언급한다.  
프로그램으로 데이터베이스 트랜잭션을 관리하려고 했더니, Spring 프레임워크를 이용하라고 한다.  
이 부분이 참 의아한 부분이다.   
이전에 iBatis에서 제공하는 SqlMapClient 객체는 이런 번거로운 작업 없이도 자원 해제와 트랜잭션을 모두 자체적으로 처리를 해 주었는데, 왜 MyBatis에서는 이렇게 바뀌었는지 굳이 Spring 프레임워크에 의존해야 했는지,   
그런 경우라도 기본 구현을 내부에 포함하면 될 일인데, 굳이 MyBatis를 사용하는 개발자들에게 Spring 프레임워크를 사용하여 직접 구현하게 할 필요가 있었는지. 어쨌든 현실은 적응해야 한다.

필자는 Spring 프레임워크의 데이터베이스 관련 Template 시리즈 클래스 객체들을 아주 싫어한다.  
 그 이유는 콜백처리 때문이다.   
 질의 하나를 호출하려고 해도 콜백 방식을 사용해야 한다.   
 (필자가 데이터베이스 처리에 있어서 Spring 프레임워크보다 iBatis 프레임워크를 더 선호했던 이유가 바로 iBatis에서는 일반적인 질의에 콜백을 사용하지 않기 때문이기도 했다.)   
 Spring의 TransactionTemplate도 예외는 아니다.   
 TransactionTemplate를 사용하려면 반드시 콜백 방식을 사용해야 한다.   
 다음은 TransactionTemplate를 사용하는 Spring 문서의 코드에 TransactionTemplate 객체를 사용하는 코드 부분을 추가한 예이다.  

 ~~~ java
public class SimpleService implements Service {
    
    private final TransactionTemplate transactionTemplate;
    
    public SimpleService(PlatformTransactionManager transactionManager) {
        Assert.notNull(transactionManager, "The 'transactionManager' argument must not be null.");
        this.transactionTemplate = new TransactionTemplate(transactionManager);
        
        // the transaction settings can be set here explicitly if so desired
        this.transactionTemplate.setIsolationLevel(TransactionDefinition.ISOLATION_READ_UNCOMMITTED);
        this.transactionTemplate.setTimeout(30); // 30 seconds
    }
    ...

    public int insertUser(final User user) {
        //use TransactionCallback handler if some result is returned
        return    transactionTemplate.execute(new TransactionCallback<Integer>() {
            public Integer doInTransaction(TransactionStatus paramTransactionStatus) {
                String inserQuery = "insert into users (username, password, enabled , id) values (?, ?, ?, ?) ";
                Object[] params = new Object[]{user.getUserName(), user.getPassword(),user.isEnabled(),user.getId()};
                int[] types = new int[]{Types.VARCHAR,Types.VARCHAR,Types.BIT,Types.INTEGER};
                return jdbcTemplate.update(inserQuery,params,types);
            }
        });
    }
}
~~~
프로그램적으로 데이터베이스 트랜잭션을 처리하기 위해 이렇게 복잡하게 일을 해야 하다니, MyBatis 프레임워크는 프로그램 방법의 데이터베이스 트랜잭션을 Spring에 떠 넘기고 Spring 프레임워크는 여전히 자신들의 콜백 방식을 고집한다.    
콜백이 없는 두 번째 방법으로 PlatformTransactionManager를 사용하는 방법이 있다.   
다음은 PlatformTransactionManager를 사용하는 Spring 문서의 코드 예이다.  

 ~~~ java
DefaultTransactionDefinition def = new DefaultTransactionDefinition();
// explicitly setting the transaction name is something that can only be done programmatically
def.setName("SomeTxName");
def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);

TransactionStatus status = txManager.getTransaction(def);
try {
  // execute your business logic here
}
catch (MyException ex) {
  txManager.rollback(status);
  throw ex;
}
txManager.commit(status);
~~~
위 코드도 여전히 복잡하다.  
iBatis에서는 프로그램에서 데이터베이스 트랜잭션을 사용할 때 startTransaction(), commitTransaction(), rollbackTransaction(), endTransaction() 메소드들만 호출하면 됐었는데.  
위 코드에서 보다시피 데이터베이스 트랜잭션이 필요한 경우 몇 개의 객체들을 추가로 생성하고 관련 메소드들을 호출해야 한다.

## 5.문제 해결 

어떻게 하면 MyBatis도 자원 해제에 대해 자유로워 지고, 편리하게 프로그램으로 데이터 트랜잭션을 관리할 수 있을까?   
구글링을 해보고 관련 문서들을 다 찾아 보았지만 원론적인 설명 밖에는 찾을 수 없었다. 그래서 직접 이 문제를 해결하기로 했다.  

 필자도 MyBatis 프레임워크와 Spring 프레임워크를 결합하여 사용하는 것을 권장한다.   
 이 경우 일차적으로 자원 해제 문제가 해결된다.   
 남은 문제는 프로그램으로 관리할 수 있는 편리한 데이터베이스 트랜잭션 방법을 찾아 내는 것이다.   
 필자는 소스 코드의 흐름의 방해하는 콜백 방식을 사용하지 않는 PlatformTransactionManager을 사용하여 이 문제를 해결했다.  

 문제 해결 전략은 DefaultTransactionDefinition, PlatformTransactionManager, TransactionStatus 클래스를 묶어 내부적으로 처리하는 새로운 클래스를 정의하고, iBatis의 SqlMapClient 클래스 객체에서 호출하는 트랜잭션 절차 메소드들을 이 새로운 클래스에서 노출시키고, 이 과정에서 Spring 프레임워크의 빈 자동 주입, 프로토타입 빈 등을 사용하고, 위임(delegation)과 상속(inheritance)를 적절히 이용하여 추가되는 코드 량을 최소화 하는 것이었다.   
 이런 전략을 바탕으로 MyBatisTransactionManager 클래스와 지원 클래스인 MyBatisSupport 클래스를 다음과 개발했다.  

### MyBatisTransactionManager.java 
~~~ java
package com.brm.mybatis.transaction;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionException;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;

@Service
@Scope("prototype")
public class MyBatisTransactionManager extends DefaultTransactionDefinition {

 private static final long serialVersionUID = -1375151959664915520L;

 @Autowired
 PlatformTransactionManager transactionManager;

 TransactionStatus status;

 public void start() throws TransactionException {
  status = transactionManager.getTransaction(this);
 }

 public void commit() throws TransactionException {
  if (!status.isCompleted()) {
   transactionManager.commit(status);
  }
 }

 public void rollback() throws TransactionException {
  if (!status.isCompleted()) {
   transactionManager.rollback(status);
  }
 }

 public void end() throws TransactionException {
  rollback();
 }
}
위 코드에서 MyBatisTransactionManager 클래스는 DefaultTransactionDefinition를 상속하여 DefaultTransactionDefinition를 위임할 경우 발생하는 수많은 위임 메소드들을 정의하지 않게 했고,   
MyBatisTransactionManager가 프로토타입 빈으로 정의되는 것을 감안하여 자유롭게 멤버 변수를 선언했고, transactionManager 멤버 변수는 Spring의 어노테이션 주입 기능을 이용하여 불필요한 설정자(setter) 메소드를 정의하지 않았다.

MyBatisSupport.java 
package com.brm.mybatis;

import com.brm.mybatis.transaction.MyBatisTransactionManager;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Service;

@Service("myBatisSupport")
public class MyBatisSupport {

 @Autowired(required = false)
 @Qualifier("sqlSession")
 protected SqlSessionTemplate sqlSession;

 @Autowired
 ApplicationContext applicationContext;

 public MyBatisTransactionManager getTransactionManager() {
  return applicationContext.getBean(MyBatisTransactionManager.class);
 }
}
~~~
 MyBatisSupport 클래스는 간단하지만 MyBatis를 이용하려는 애플리케이션 클래스들이 간단한 상속이나 주입만으로 언제든지 데이터베이스를 연동할 수 있는 SqlSessionTemplate 객체와 데이터베이스 트랜잭션을 프로그램적으로 지원하는 MyBatisTransactionManager 객체를 이용할 수 있게 해준다. 단 MyBatisSupport 클래스가 Spring 프레임워크의 어노테이션과 컨텍스트를 사용함으로 MyBatisSupport를 상속하는 애플리케이션 클래스들도 Spring 프레임워크 내에서 동작하게 해야 한다.   애플리케이션 클래스들을 Spring 프레임워크 내에서 동작하게 하는 방법은 Spring 프레임워크의 문서를 참조하기 바란다.  
  필자는 프로그램적 데이터베이스 트랜잭션을 데트스하는 JUnit MybatisSupportTest 클래스에 Spring-Test의 @RunWith와 @ContextConfiguration 어노테이션을 사용하여 Spring 프레임워크가 MybatisSupportTest 클래스의 Spring 어노테이션들을 자동으로 조사하여 객체를 주입하게 했다.   
  
 다음은 MyBatisTransactionManager를 테스트하는 MybatisSupportTest 클래스 소스이다. MybatisSupportTest 클래스는 MyBatisSupport 클래스를 상속한다.  

### MybatisSupportTest.java 

~~~ java
package com.brm.mybatis;

import com.brm.mybatis.transaction.MyBatisTransactionManager;

import java.sql.SQLException;
import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "/mybatis.xml" })
public class MybatisSupportTest extends MyBatisSupport {

 @Test
 public void testProgramacTraction() throws SQLException {

  MyBatisTransactionManager transaction = getTransactionManager();
  try {
   
   transaction.start();

   List results = sqlSession.selectList("test.select");
   System.out.println("selected = " + results);
   int cnt = sqlSession.update("test.insert", results.get(0));
   System.out.println("inserted = " + cnt);

   transaction.commit();

  } finally {
   transaction.end();
  }
 }
}
~~~
 위 코드를 보면 SqlSessionTemplate 객체를 주입하는 부분도, 자원 해제를 위한 close() 메소드의 호출도 없다.   
 스레드에 안전한 SqlSessionTemplate 객체는 MyBatisSupport 지원 클래스에서 자동으로 주입되고, 자원 해제는 MyBatis-Spring 내부에서 인터셉터를 통해 자동으로 처리된다.   
 트랜잭션 매니저 객체인 MyBatisTransactionManager 객체는 MyBatisSupport 클래스의 getTransactionManager() 메소드 호출을 통해 Spring 프레임워크의 애플리케이션 컨테이너로부터 반환 받는다. 
   
 MyBatisTransactionManager 객체는 iBatis SqlMapClient 객체의 데이터베이스 트랜잭션 처리 메소드들과 거의 유사한 메소드들을 애플리케이션에게 노출한다.  
  차이점은 iBatis SqlMapClient 객체는 내부적으로 트랜잭션 관련 인스턴스들을 생성하고 관리하는 반면 MyBatisTransactionManager 객체는 getTransactionManager() 메소드를 통해 획득된다는 점이다.
  
 다음은 MyBatis 프레임워크를 Spring 프레임워크와 함께 사용하기 위한 Spring 프레임워크의 빈 정의 XML인 mybatis.xml이다.   
 이곳에 MyBatisTransactionManager 클래스가 빈으로 등록된다.   
 (어노테이션 스캔을 활용하는 경우, 이런 정의조차 없앨 수 있다.)   
 나머지 부분은 데이터 소스와 트랜잭션 관리자 SqlSessionTemplate과 관련된 빈들의 등록이다.  

### mybatis.xml 
~~~ xml
<?xml version="1.0" encoding="utf-8"?>
<beans xmlns="http://www.springframework.org/schema/beans" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
 xmlns:tx="http://www.springframework.org/schema/tx" xmlns:jdbc="http://www.springframework.org/schema/jdbc"
 xmlns:context="http://www.springframework.org/schema/context" xmlns:aop="http://www.springframework.org/schema/aop"
 xsi:schemaLocation="
 http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context-3.0.xsd
 http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans-3.0.xsd
 http://www.springframework.org/schema/jdbc http://www.springframework.org/schema/jdbc/spring-jdbc-3.0.xsd
 http://www.springframework.org/schema/tx http://www.springframework.org/schema/tx/spring-tx-3.0.xsd
 http://www.springframework.org/schema/aop http://www.springframework.org/schema/aop/spring-aop-3.0.xsd">

 <context:property-placeholder location="classpath:app.properties" />

 <!-- Data Source -->
 <bean id="dataSource" class="org.apache.commons.dbcp.BasicDataSource">
  <property name="driverClassName" value="${datasource.driver}" />
  <property name="url" value="${datasource.url}" />
  <property name="username" value="${datasource.username}" />
  <property name="password" value="${datasource.password}" />

 </bean>

 <!-- Transaction Manager -->
 <bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
  <property name="dataSource" ref="dataSource" />
 </bean>

 <bean class="com.brm.mybatis.transaction.MyBatisTransactionManager" scope="prototype" />

 <!-- MyBatis Sql Session Template -->
 <bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
  <property name="dataSource" ref="dataSource" />
  <property name="mapperLocations">
   <list>
    <value>classpath*:${mybatis.query.locations}</value>
   </list>
  </property>
 </bean>

 <bean id="sqlSession" class="org.mybatis.spring.SqlSessionTemplate">
  <constructor-arg index="0" ref="sqlSessionFactory" />
 </bean>
</beans>

~~~
 위 XML에서 MyBatisTransactionManager 빈은 스코프가 prototype이다. 그러므로 애플리케이션이 데이터베이스의 트랜잭션을 위해 MyBatisSupport 클래스의 getTransactionManager 메소드를 호출하면 Spring 프레임워크는 새로운 MyBatisTransactionManager 객체를 생성하여 반환한다.  

 mybatis.xml에서 참조하는 설정 속성 파일인 app.properties는 다음과 같다. 테스트 데이터베이스는 오라클 데이터베이스를 사용했다.    
~~~
app.properties 
datasource.driver = oracle.jdbc.driver.OracleDriver
datasource.url = jdbc:oracle:thin:@192.168.1.50:1521:ORACLE
datasource.username = ******
datasource.password = ******
mybatis.query.locations =  com/brm/**/sql/*.xml
~~~
 MyBatis 프레임워크를 사용하여 데이터베이스 연동 로직을 개발 할 때, 위에 설명한 MyBatisTransactionManager 클래스와 MyBatisSupport 클래스를 추가하면, iBatis를 사용할 때와 유사한 방법으로 자원 해제와 데이터베이스 트랜잭션을 처리할 수 있게 된다.   
 또한 위 테스트 코드에서 MyBatisTransactionManager의 데이터베이스 트랜잭션 호출들을 제거하는 경우, MyBatis의 SqlSessionTemplate 객체는 내부에서 인터셉터를 통해 세션을 닫을 때 자동으로 커밋을 호출해 준다.   
 즉 데이터베이스 트랜잭션 처리 로직을 제거하면, SqlSessionTemplate의 메소스 호출 단위로 처리 성공 시 자동 커밋이 진행된다.   
 그러므로 데이터베이스 처리를 트랜잭션으로 묶을 경우 MyBatisTransactionManager 객체를 사용하고, 메소드 단위로 트랜잭션을 사용하는 경우 SqlSessionTemplate의 메소드를 단독으로 호출하면 된다.  

 다음은 MyBatis를 테스트하기 위해 사용한 Maven의 pom.xml 파일이다. 사용된 jar 들을 아래 pom.xml을 통해 다운받을 수 있다.  

## pom.xml 
~~~ xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
 xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
 <modelVersion>4.0.0</modelVersion>

 <groupId>com.brm</groupId>
 <artifactId>mybatis-practice</artifactId>
 <version>0.0.1-SNAPSHOT</version>
 <packaging>jar</packaging>

 <name>mybatis-practice</name>
 <url>https://github.com/hinunbi/mybatis-practice</url>

 <properties>
  <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
 </properties>
 <repositories>
  <repository>
   <id>mesir-repo</id>
   <url>http://mesir.googlecode.com/svn/trunk/mavenrepo</url>
  </repository>
 </repositories>
 <dependencies>
  <dependency>
   <groupId>org.springframework</groupId>
   <artifactId>spring-beans</artifactId>
   <version>3.0.5.RELEASE</version>
   <type>jar</type>
   <scope>compile</scope>
  </dependency>
  <dependency>
   <groupId>org.springframework</groupId>
   <artifactId>spring-context</artifactId>
   <version>3.0.5.RELEASE</version>
   <type>jar</type>
   <scope>compile</scope>
  </dependency>
  <dependency>
   <groupId>org.springframework</groupId>
   <artifactId>spring-orm</artifactId>
   <version>3.0.5.RELEASE</version>
   <type>jar</type>
   <scope>compile</scope>
  </dependency>
  <dependency>
   <groupId>org.springframework</groupId>
   <artifactId>spring-test</artifactId>
   <version>3.0.5.RELEASE</version>
   <type>jar</type>
   <scope>compile</scope>
  </dependency>
  <dependency>
   <groupId>commons-dbcp</groupId>
   <artifactId>commons-dbcp</artifactId>
   <version>1.4</version>
   <type>jar</type>
   <scope>compile</scope>
  </dependency>
  <dependency>
   <groupId>junit</groupId>
   <artifactId>junit</artifactId>
   <version>4.8.2</version>
   <type>jar</type>
   <scope>compile</scope>
  </dependency>
  <dependency>
   <groupId>org.mybatis</groupId>
   <artifactId>mybatis-spring</artifactId>
   <version>1.2.0</version>
  </dependency>
  <dependency>
   <groupId>org.mybatis</groupId>
   <artifactId>mybatis</artifactId>
   <version>3.2.2</version>
   <type>jar</type>
   <scope>compile</scope>
  </dependency>
  <dependency>
   <groupId>com.oracle</groupId>
   <artifactId>ojdbc14</artifactId>
   <version>10.2.0.4.0</version>
  </dependency>
  <dependency>
   <groupId>org.slf4j</groupId>
   <artifactId>slf4j-api</artifactId>
   <version>1.6.1</version>
   <type>jar</type>
   <scope>compile</scope>
  </dependency>
  <dependency>
   <groupId>org.slf4j</groupId>
   <artifactId>slf4j-log4j12</artifactId>
   <version>1.6.1</version>
   <type>jar</type>
   <scope>compile</scope>
  </dependency>
 </dependencies>
</project>

~~~



### 출처 
- https://barunmo.blogspot.com/2013/06/mybatis.html