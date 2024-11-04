//Member Visibility:-

//1.public:- A public member can be accessed anywhere, It is default

class Greeter {
    public greet() {
        console.log("hi")
    }
}
const greeter2=new Greeter
greeter2.greet()


//2.Protected:- protected members are only visible to subclasses of the class they’re declared in

class Greeter3 {

    public greet() {
        console.log("Hello, " + this.getName());

    }
    protected getName() {
        return "Hi"
    }
}
class SpecialGreeter extends Greeter {
    public howdy() {
        console.log("Howdy, " + this.getName());
    }
    protected getName() {
        return "Hello sir"
    }

}
const g=new SpecialGreeter();
g.greet()


//3.Making Protected members public
class Base {
    protected m=10;

}
class Derived extends Base {
    m=15;
    static getGreeting: any;

}
const d=new Derived()
console.log(d.m)



//4.Private:- Private is like protected, but doesn't allow access to the member even from subclasses
class Base1 {
    private x=0;
}
const b=new Base1()
console.log(b.x)


//5.TypeScript allows cross instance private access
class A {
    private x=10;
public sameAs(other:A) {
    return other.x===this.x;
}
}



//5.Caveats
"use strict";
class Dog {
    #barkAmount = 0;
    personality = "happy";
    constructor() { }
}

//or will use WeakMaps in place of #

"use strict";
var _Dog_barkAmount;
class Dog1 {
    personality: string;
    constructor() {
        _Dog_barkAmount.set(this, 0);
        this.personality = "happy";
    }
}
_Dog_barkAmount = new WeakMap();
 


//Static Members:-  Classes may have static members. They can be accessed through the class constructor itself
class MyClass {
    static a: any;
    getName: any;
    name: any;
    static s(s: any) {
        throw new Error("Method not implemented.");
    }
    static x=0;
    static printX() {
        console.log(MyClass.x)
    }
}
console.log(MyClass.x);
MyClass.printX()

//1.Static members can also use the same public,protected and private visibility modifiers
class MyClass1 {
    private static t=0;
}
console.log(MyClass1.t)


//Static members are also inherited

class Base3 {
    static getGreeting() {
      return "Hello world";
    }
  }
  class Derived3 extends Base {
    static getGreeting() {
        throw new Error("Method not implemented.");
    }
    myGreeting = Derived3.getGreeting();
  }


//Static blocks in classes:- Static blocks allow you to write a sequence of statements with their own scope that can access private fields within the containing class
class Foo {
    static #count = 0;
 
    get count() {
        return Foo.#count;
    }
 
    static {
        try {
            const lastInstances = loadLastInstances();
            Foo.#count += lastInstances.length;
        }
        catch {}
    }
}



//3.Generic Classes:- Classes can use generic constraints and defaults the same way as interfaces.
class Box<Type> {
    contents:Type;
    constructor(value:Type) {
        this.contents=value;
    }
}
const v=new Box("Hello");


//4.This Parameter
class MyClass7 {
    name = "MyClass";
    getName() {
      return this.name;
    }
  }
  const c = new MyClass();
  const obj = {
    name: "obj",
    getName: c.getName,
  };
  console.log(obj.getName());

//Arrow functions
class MyClass8 {
    name = "MyClass";
    getName = () => {
      return this.name;
    };
  }
  const y = new MyClass();
  const p = c.getName;
  console.log(p());


//TypeScript checks that calling a function with a this parameter is done so with a correct context. Instead of using an arrow function, we can add a this parameter to method definitions 
class MyClass6 {
    name = "MyClass";
    getName(this: MyClass) {
      return this.name;
    }
  }
  const w = new MyClass();
  c.getName();
  const r = c.getName;
  console.log(r());

//This Types
class Boxe {
    contents: string = "";
    set(value: string) {
      this.contents = value;
      return this;
    }
  }
  class ClearableBox extends Boxe {
    clear() {
      this.contents = "";
    }
  }
  const a = new ClearableBox();
  const t = a.set("hello");


//You can also use this in a parameter type annotation
class Box3 {
    content: string = "";
    sameAs(other: this) {
      return other.content === this.content;
    }
  }


//this-based type guards:- You can use this is Type in the return position for methods in classes and interfaces
class FileSystemObject {
    isFile(): this is FileRep {
      return this instanceof FileRep;
    }
    isDirectory(): this is Directory {
      return this instanceof Directory;
    }
    isNetworked(): this is Networked & this {
      return this.networked;
    }
    constructor(public path: string, private networked: boolean) {}
  }
   
  class FileRep extends FileSystemObject {
    constructor(path: string, public content: string) {
      super(path, false);
    }
  }
   
  class Directory extends FileSystemObject {
    children: FileSystemObject[];
  }
   
  interface Networked {
    host: string;
  }
   
const fso: FileSystemObject = new FileRep("foo/bar.txt", "foo");
   
  if (fso.isFile()) {
    fso.content;
  } else if (fso.isDirectory()) {
    fso.children;
  } else if (fso.isNetworked()) {
    fso.host;
}



//Parameter Properties
class Params {
    constructor(
      public readonly x: number,
      protected y: number,
      private z: number
    ) {
    }
  }
  const ab = new Params(1, 2, 3);
  console.log(ab.x);


//Class Expressions:- Class expressions are very similar to class declarations. The only real difference is that class expressions don’t need a name, though we can refer to them via whatever identifier they ended up bound to
const someClass = class<Type> {
    content: Type;
    constructor(value: Type) {
      this.content = value;
    }
  };
   
  const m = new someClass("Hello, world");


//Constructor Signatures:- JavaScript classes are instantiated with the new operator. Given the type of a class itself, the InstanceType utility type models this operation.
class Point {
    createdAt: number;
    x: number;
    y: number
    constructor(x: number, y: number) {
      this.createdAt = Date.now()
      this.x = x;
      this.y = y;
    }
  }
  type PointInstance = InstanceType<typeof Point>
   
  function moveRight(point: PointInstance) {
    point.x += 5;
  }
   
  const point = new Point(3, 4);
  moveRight(point);
  point.x;



/*abstract classes and members:-
                                 -> An abstract method or abstract field is one that hasn’t had an implementation provided. 
                                 -> Abstract class members cannot be instantiated 
                                 ->The role of abstract classes is to serve as a base class for subclasses which do implement all the abstract members. When a class doesn’t have any abstract members, it is said to be concrete.
*/
abstract class Base6 {
    abstract getName(): string;
   
    printName() {
      console.log("Hello, " + this.getName());
    }
  }
   
  const b6 = new Base();



//Relationship between classes
//two classes can be used in place of each other because they’re identical
class Point1 {
    x = 0;
    y = 0;
  }
   
  class Point2 {
    x = 0;
    y = 0;
  }
   
  // OK
  const p1: Point1 = new Point2();

//subtype relationships between classes exist even if there’s no explicit inheritance
class Person {
    name: string;
    age: number;
  }
   
  class Employee {
    name: string;
    age: number;
    salary: number;
  }
   
  // OK
  const p2: Person = new Employee();