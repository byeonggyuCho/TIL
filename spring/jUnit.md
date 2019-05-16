# Junit
- 자바용 단위 테스트 작성을 위한 표준 프레임워크
- junit을 이용해 동적 쿼리를 테스트해보자.


1) Junit3
    - 규칙
    - TestCase를 상속받는다.
    - 테스트 메서드의 이름은 반드시 접두사를 test로 시작한다.
    

    - **구성요소
        - 테스트 픽스처 메서드(공통적으로 사용하는 메서드)
        - setup(), tearDown()
    ~~~ java
        class TestXXX extends TestCase{
            public void testA(){	...  }
            public void testB(){ ... }
            protected void setUp(){
                초기화작업
            }

            protected void tearDown(){
                마무리작업
            }
        }
    ~~~

        setUp() - testA() - tearDown()- setUp()-  tearDown()

        - 단정문(Assertion)
            - 딱 잘라서 정해버리는 문장!!
        assertEquals([message], expected, actual)	
        //같은지 비교한다.
        assertTrue([message], expected)		
        //참인
        assertNull([message], expected)		
        //널인지?
        assertNotNull([message], expected)		
        //not Null인지?
        assertSame([message], expected, acual)	
        	//같은지 비교한다.(주로 주소값을 비교한다)
        assertNotSame([message], expected, actual)	
        //같지 않은지 비교한다.
        fail([message])				//

        
                    
        }
2) JUnit4
    - test라는 접두사로 메서드명을 만들어야한다는 제약 해소
    - 대신 테스 메서드는 @Test를 붙인다.
    - 픽스쳐 메서드
        @BoforeClass
        @AfterCalss
        @Before	- settup
        @Atfer	- TearDown
        
        @BeforeClass
        @Before -  TestA- @After
        @Before -  TestB- @After
        -  @AtferClass
        
    - 예외 테스트
    @Test(expected=NumberFormatException.class)
    
    -  시간 제한 테스트
    @Test(timout=1000)	//1초가 넘어가면 실패!!!
    
    -  테스트 무시
    @Ignore([message])
    
    ....
    
        
        
        
            
    
        
        



### Testing기능!!
-  스프링에서 전폭적인 지지를 해준다.
-  테스트를 전문으로 하는 프로그램~~
-  J_unit이 클래스를 테스트 할 수 있도록 표시를 해주는데 @Test 어노테이션을 달면된다.


