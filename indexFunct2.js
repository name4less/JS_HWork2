/* # Домашнее задание. Функции 2, ES6

## ES6
Переделайте предыдущее ДЗ используя максимум возможностей **ES6**. Отметьте облегчение (или утяжеление) синтаксиса.

## sort
Сделайте обобщенную функцию сортировки массива

```javascript
var persons = [
    {name: "Иван", age: 17},
    {name: "Мария", age: 35},
    {name: "Алексей", age: 73},
    {name: "Яков", age: 12},
]

sort(persons, "age"); //сортирует по возрасту по возрастанию
sort(persons, "name", false); //сортирует по имени по убыванию
```

Функция позволяет отсортировать *любой набор* данных по имени поля (второй параметр). Третьим параметром идет необязательный `Boolean`, который в случае `true` делает сортировку по возрастанию, в случае `false` - по убыванию. По умолчанию (без третьего параметра) 
происходит сортировка по возрастанию.

## array map DONE
Используя `Array.map` приведите все строки в массиве к числу. Элементы других типов оставьте как есть:

```javascript
["1", {}, null, undefined, "500", 700]
```
должно превратиться в 
```javascript
[1, {}, null, undefined, 500, 700]
```

## array reduce 
Получите произведение всех чисел в массиве, используя `Array.reduce`. Не обрабатывайте типы данных, не являющиеся числом.

```javascript
["0", 5, 3, "string", null]
```

результат должен быть 15


## object filter
Напишите свою реализацию `Array.filter` для **объектов**:

```javascript
var phone = {
    brand: "meizu",
    model: "m2",
    ram: 2,
    color: "black",
};

filter(phone,(key,value) => key == "color" || value == 2);
```

должно вернуть 
```javascript
{
    ram: 2,
    color: "black",
}
```

Для удаления пары ключ-значение используйте `delete`. Или сделайте *копию* объекта.

## object map
Напишите свою реализацию `Array.map` для **объектов**:

```javascript
map({name: "Иван", age: 17},function(key,value){
    var result = {};
    result[key+"_"] = value + "$";
    return result;
}) //должен вернуть {name_: "Иван$", age_: "17$"}
```*/

//## array map
var arrayOrigin = ["1", {}, null, undefined, "500", 700];
var arrayToNumber = arrayOrigin.map(function(key){
    if((typeof key) =='string'){
        return +key;
    }
    else{
        return key;
    }
});

//rider array
arrayToNumber.forEach(function(item, i, arrayToNumber){
    alert(i+":"+item+"(array:"+arrayToNumber+")");
});

//## array reduce 
var composition = arrayOrigin.reduce(function(comp, key){
    if((typeof key)=='number'){ //problem with type data
        return comp*key;
    };
}, 1);
alert(composition);

//##sort

//## object filter

//## object map
var objOrigin = {name: "Иван", age: 17};
var objMap = map(objOrigin, function(key,value){
    var result = {};
    result[key+"_"] = value + "$";
    return result;
});
for(let key in objMap){
    alert( "Ключ: " + key + " значение: " + objMap[key] );
};