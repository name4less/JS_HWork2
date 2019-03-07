/*# Домашнее задание: ООП в функциональном стиле.

## ООП: база.
### Initialize DONE
Напишите конструктор класса `Person` со следующими параметрами:
   `name`, `surname`, `age`, `sex`, `salary`, `married`, сохраняемыми в полях объекта.

### Closure getters and setters
Напишите конструктор класса `Person` с теми же параметрами, что и в предыдущей задаче. Поля должны хранится в *замыкании*. Для задания и
 чтения параметров напишите набор *геттеров и сеттеров*: `getName`, `setName`, `getSurname`, `setSurname`,  `getAge`, 
   `setAge`, `getSex`, `setSex`, `getSalary`, `setSalary`, `getMarried`, `setMarried`. Каждый из сеттер должен проверять данные.
   Если данные некорректны, данные внутри замыкания не изменяются. 
   **Сеттер** всегда возвращает *текущее* значение переменной. См. [пример]
   (http://gitlab.a-level.com.ua/gitgod/FrontendLectures/src/master/07ObjectsFunctionalStyle.md#--)

### setFather
Добавьте возможность задавать родительский объект с помощью метода `setFather`
### getFatherName
Добавьте к предыдущем заданию метод `getFatherName`, которое создает строку с отчеством, добавляя к **имени отца** суффикс "-ович" для 
мужчин и "-овна" для женщин
.

```javascript
var father   = new Person("Ivan", "Petrov", 50, "male", 100500, true)
var daughter = new Person("Maria", "Petrova", 25, "female", 500, false)


var father2  = new Person("iPhone", "Sedmoy", 45, "male", 500, true)
var son      = new Person("Ivan", "Sedmoy", 20, "male", 200, false)

daughter.setFather(father)
daughter.getFatherName() // => "Ivanovna"

son.setFather(father2)
son.getFatherName() // => "iPhoneovich"

```

### addChild
Добавьте к предыдущем заданию метод `addChild`, который добавляет ребенка в массив в замыкании и возвращает количество детей. При добавлении
 проверяйте разницу в возрасте, она должна быть хотя бы лет 15.
  Так же не позволяйте дублировать детей в массиве. 

```javascript
father.addChild(daughter)
```

## Замыкания
### makeCounter
Напишите функцию `makeCounter`, которая определяет переменную `counter` и возвращает другую функцию, увеличивающую `counter` каждый вызов и 
возвращающую её значение:

```javascript
   var counter   = makeCounter()
   var otherCntr = makeCounter()

   counter() // 1
   counter() // 2

   otherCntr() // 1
   otherCntr() // 2
   otherCntr() // 3

   counter() // 3
```


### makeProfileTimer
Напишите функцию `makeProfileTimer`, которая служит для замера времени выполнения другого кода и работает следующим образом:

```javascript 
   var timer = makeProfileTimer()
   doSomething();  //некий код, время выполнения которого мы хотим измерить с высокой точностью
   alert(timer()); //alert должен вывести время в микросекундах от выполнения makeProfileTimer до момента вызова timer(), 
                   // т. е. измерить время выполнения doSomething
```
Используйте `performance.now()` 

### makeSaver
Напишите функцию `makeSaver`, которая:

```javascript
    var saver = makeSaver(Math.random) //создает функцию-хранилище результата переданной в качестве параметра функции (Math.random 
                                      // в примере). На этом этапе Math.random НЕ вызывается
    var value1 = saver()              //saver вызывает переданную в makeSaver функцию, запоминает результат и возвращает его
    var value2 = saver()              //saver в дальнейшем просто хранит результат функции, и более НЕ вызывает переданную 
                                      //в makeSaver функцию;
    value1 === value2                 // всегда true

    var saver2 = makeSaver(() => console.log('saved function called') || [null, undefined, false, '', 0, Math.random()]
    [Math.ceil(Math.random()*6)])
    var value3 = saver2()
    var value4 = saver2()

    value3 === value4 // тоже должно быть true
```

Таким образом `makeSaver` решает две задачи:
0. Навсегда сохраняет результат функции. Это актуально, например, для `Math.random`.
1. Действует *лениво*, то есть вызывает `Math.random` только тогда, когда результат *действительно* нужен. Если же по каким-то причинам 
значение не понадобится, то `Math.random` даже не будет вызван

### Final Countdown
Напишите код, который будет делать обратный ежесекундный отсчёт в консоли, используя `console.log`. Используйте **Self Invoked Function** 
для создания замыкания и 
   `setTimeout` для задержки вывода. Результатом должно быть:

```javascript
   5 //пауза 1 секунда
   4 //пауза 1 секунда
   3 //пауза 1 секунда
   2 //пауза 1 секунда
   1 //пауза 1 секунда
   "поехали!"
```

### myBind
Изучите встроенную функцию `bind`, и сделайте свою версию, которая позволит определить "значение по умолчанию" не только для первых 
параметров, но для любых других, например для *степени* в Math.pow:

```javascript
var pow5 = myBind(Math.pow, Math, [undefined, 5]) // первый параметр - функция для биндинга значений по умолчанию, 
                                                  // второй - this для этой функции, третий - массив, в котором undefined означает
                                                  // параметры, которые должны передаваться при вызове,
                                                  // а другие значения являются значениями по умолчанию:
var cube = myBind(Math.pow, Math, [undefined, 3]) // cube возводит число в куб

pow5(2) // => 32, вызывает Math.pow(2,5), соотнесите с [undefined, 5]
cube(3) // => 27


var chessMin = myBind(Math.min, Math, [undefined, 4, undefined, 5,undefined, 8,undefined, 9])
chessMin(-1,-5,3,15) // вызывает Math.min(-1, 4, -5, 5, 3, 8, 15, 9), результат -5



var zeroPrompt = myBind(prompt, window, [undefined, "0"]) // аналогично, только теперь задается "0" как текст по умолчанию в prompt, 
                                                          // а текст приглашения пользователя задается при вызове zeroPrompt
var someNumber = zeroPrompt("Введите число")              // вызывает prompt("Введите число","0")
```

Массив, который идет третьим параметром определяет, какие поля должны подменяться значением по умолчанию, а какие - задаваться в последствии
 (`undefined`).  

## Рекурсия

### Sum
Напишите функцию, который будет считать сумму арифметической прогрессии рекурсивно.
### HTML Tree
Сделать [задание на синий пояс](http://gitlab.a-level.com.ua/gitgod/FrontendLectures/src/master/04AssociativeArraysHomeWork.md#----1), 
используя рекурсию, без ограничения вложенности.*/

//## Initialize
function PersonSimple(name, surname, age, sex, salary, married)
{
    this.name = name;
    this.surname = surname;
    this.age = age;
    this.sex = sex;
    this.salary = salary;
    this.married = married;
};

//## Closure getters and setters
function Person(name, /*surname, age, sex, salary, married*/){
   this.name = undefined;
   this.surname = undefined;
   this.age = 0;
   this.salary = 0;
   this.married = undefined;

   this.setName = function(name){
      if(isNaN(+name)){
         this.name = name;
      };
   };
   this.getName = function(){
      return this.name
   };
};