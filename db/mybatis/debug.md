# Debug

## Case1
How can use logical operator in Mybatis

### Error
The content of elements must consist of well-formed character data or markup.


### reason
logical operator (<,>,>=)


### solution

1. \>  ( \&gt;)
2. \<   (\&lt;) 
3. \>=  ( \&gt;=)
4. \<=  (\&lt;=) 

~~~ xml
<select id="loadCartList"  parameterType="userInfoVO" resultType="cartVO">
    
    SELECT
        *    
    FROM
        table_name
    
    WHERE
        coulumA &lt; 10
    AND 
        coulumB &gt; 4
    </select>

~~~~