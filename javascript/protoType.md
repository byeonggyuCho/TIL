# 프로토타입 property
- 객체가 생성될 당시 만들어지는 객체 자신의 원형이될 프로토타입 Object 를 가리킨다.
- 함수객체만 이 속성을 가진다.
- 즉 함수객체로 부터 생성된 인스턴스는 프로토타입 property가 없다.


2. 프로토타입 객체

3. 프로토타입 링크


4.  함수 객체(host Function Object)
	- 객체를 정의한것에 해당한다.
	- 프로토타입 property를 갖는다.
	- 프로토타입 property는 함수 객체를 정의할때 생성된 프로토타입 Object를 참조한다.
	- 다른 언어의 class 개념이다.
	ex) function a(){};
	ex) var a = new Function();

5. 프로토타입 Object
	- 함수객체가 생성되는 시점의 정보를 가지는 객체다
	- 원형 함수객체로 부터 만들어질 다른객체가 참조할 프로토타입이다.
	- 즉 원형 함수객체로 만들어낸 인스턴스들은 원형 함수객체의 프로토타입 object를 참조한다.
	- 원형 함수객체 정의 시점에 최초정의 시점의 정보를 가진 객체이다.(말그대로 프로토타입 객체)
	- 원형 함수객체의 프로토타입 property는 이 프로토타입 Object를 참조한다.
	- 원형 함수객체의 생성자 함수를 가진다.
	- 생성자 함수가 있어야 new 생성자를 이용해 객체를 생성할 수 있다.



1. constructor는 생성자 함수 그 제체를 가리킨다.
2. prototype은 생성자 함수에 정의한 모든 객체가 공유하는 원형이다.
3. _proto_는 생성자 함수를 new로 호출할 때, 정의해두었던 prototype을 참조한 객체다.
4. prototype은 생성자 함수에 사용자가 직접 넣고, _proto_는 new를 호출할 때 prototype을 참조하여 자동으로 생성된다.
5. 생성자에서는 prototype, 생성자로부터 만들어진 객체는 _proto_
6. 따라서 사용자는 prototype만 신경쓰면된다. _proto는 prototype이 제대로 구현되었는지 확인용으로 사용된다.
7. prototype과 constuctor는 부모 자식 관게라 볼 수 있다.

```js
Person.prototype.constructor === Person
Person.prototype === (Person생성자로 만들어진 객체).__proto__;
(Person생성자로 만들어진 객체).__proto__.constructor === Person;

```



### REF
https://www.zerocho.com/category/JavaScript/post/573c2acf91575c17008ad2fc