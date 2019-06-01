# List

자주 사용하는 기본문법을 정리해보는 차원에서 포스팅한다.



### List Collection 반복문 5가지

1. For Loop
2. Advanced For Loop
3. Iterator
4. Whild Loop
5. Collection's Stream



### For Loop
~~~ java
List<Map<String,Object>> members = new ArrayList();
String memCtn = members.size();

Map<String,Object> member = null;
for(int i=0; i<memCtn;i++){
    member = (Map) members.get(i);

    System.out.println(member.toString());
}
~~~

### Advanced For Loop
~~~ java
List<Map<String,Object>> members = new ArrayList();

for(Map<String,Object> member : members){
    System.out.println(member.toString());
}
~~~


### Iterator

~~~ java
List<Map<String,Object>> members = new ArrayList();

Iterator<Map> memIterator = members.iterator();

while(memIterator.hasNext()){
 System.out.println(memIterator.next());
}

~~~



### While loop

~~~ java

int i = 0;
List<Map<String,Object>> members = new ArrayList();

while(i<member.size()){
 System.out.println(memIterator.get(i));
 i++;
}

~~~

### Collection stream

~~~ java

List<Map<String,Object>> members = new ArrayList();


members.forEach((member)->{
   System.out.println(member.toString());
});

~~~