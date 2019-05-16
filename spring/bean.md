

# 빈을 인스턴스화 하는 방법.
1) 인자없는 생성자를 호출해서 인스턴스를 생성한다.
    <bean id="myBean" class="mypackage.MyBean"/>
        매개변수가 없는 Bean타입을 선언하는방식

2) 인자있는 생성자를 호출해서 인스턴스 생성.
    <bean id="myBean" class="mypackage.MyBean">
        <constructor-arg index="0" value="값"/> 		//첫번째 인자의 값
        <constructor-arg index="1" ref="객체의 주소값"/>	//두번째 인자값
    </bean>

3) 정적 팩토리 메서드를 이용한 인스턴스 생성
    <bean id="myBean" class="mypackage.Mybean"
        factorye-method="..."/>

4) 인스턴스 팩토리 메서드를 이용한 인스턴스 생성.
    <bean id="myBean" factory-bean="..." factory-method="..."/>
    
