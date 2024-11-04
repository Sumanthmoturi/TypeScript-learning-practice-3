//Decorators

/*1.Intro:-
           ->Decorators provide a way to add both annotations and a meta-programming syntax for class declarations and members.
           ->A Decorator is a special kind of declaration that can be attached to a class declaration, method, accessor, property, or parameter. 
           ->Decorators use the form @expression, where expression must evaluate to a function that will be called at runtime with information about the decorated declaration
*/
function first() {
    console.log("first():factory evaluated");
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
      console.log("first():called");
    };
}
function second() {
    console.log("second(): factory evaluated");
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
      console.log("second(): called");
    };
}
class ExampleClass {
    @first()
    @second()
    method() {}
  }


/*2.Class Decorators:-  
                      ->A Class Decorator is declared just before a class declaration
                      ->The class decorator is applied to the constructor of the class and can be used to observe, modify, or replace a class definition
*/
@sealed
class BugReport {
  type = "report";
  title: string;
 
  constructor(t: string) {
    this.title = t;
  }
}
//We can define the @sealed decorator using the following function declaration
function sealed(constructor: Function) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
  }



/*Method Decorators:- 
                     -> A Method Decorator is declared just before a method declaration. 
                     ->The decorator is applied to the Property Descriptor for the method, and can be used to observe, modify, or replace a method definition. 
                     ->A method decorator cannot be used in a declaration file, on an overload, or in any other ambient context 
*/
class Greeter {
    greeting: string;
    constructor(message: string) {
      this.greeting = message;
    }
   
    @enumerable(false)
    greet() {
      return "Hello, " + this.greeting;
    }
  }
//We can define the @enumerable decorator using the following function declaration
  function enumerable(value: boolean) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
      descriptor.enumerable = value;
    };
  }



/*Accessor Decorators:-
                       ->An Accessor Decorator is declared just before an accessor declaration. 
                       ->The accessor decorator is applied to the Property Descriptor for the accessor and can be used to observe, modify, or replace an accessor’s definitions. 
                       ->An accessor decorator cannot be used in a declaration file, or in any other ambient context 
*/
/*The expression for the accessor decorator will be called as a function at runtime, with the following three arguments:

Either the constructor function of the class for a static member, or the prototype of the class for an instance member.
The name of the member.
The Property Descriptor for the member.
*/
class Point {
    private _x: number;
    private _y: number;
    constructor(x: number, y: number) {
      this._x = x;
      this._y = y;
    }
   
    @configurable(false)
    get x() {
      return this._x;
    }
   
    @configurable(false)
    get y() {
      return this._y;
    }
  }
  function configurable(value: boolean) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
      descriptor.configurable = value;
    };
  }


/*Property Decorators:-
                    ->A Property Decorator is declared just before a property declaration. 
                    ->A property decorator cannot be used in a declaration file, or in any other ambient context.
                    ->The expression for the property decorator will be called as a function at runtime, with the following two arguments:
                           1.Either the constructor function of the class for a static member, or the prototype of the class for an instance member.
                           2.The name of the member.
*/
class Greeter1 {
    @format("Hello, %s")
    greeting: string;
    constructor(message: string) {
      this.greeting = message;
    }
    greet() {
      let formatString = getFormat(this, "greeting");
      return formatString.replace("%s", this.greeting);
    }
  }
  import "reflect-metadata";
  const formatMetadataKey = Symbol("format");
  function format(formatString: string) {
    return Reflect.metadata(formatMetadataKey, formatString);
  }
  function getFormat(target: any, propertyKey: string) {
    return Reflect.getMetadata(formatMetadataKey, target, propertyKey);
  }


/*Parameter Decorator:-
                       ->The expression for the parameter decorator will be called as a function at runtime, with the following three arguments:
                               1.Either the constructor function of the class for a static member, or the prototype of the class for an instance member.
                               2.The name of the member.
                               3.The ordinal index of the parameter in the function’s parameter list.
*/

class BugReport {
    type = "report";
    title: string;
   
    constructor(t: string) {
      this.title = t;
    }
   
    @validate
    print(@required verbose: boolean) {
      if (verbose) {
        return `type: ${this.type}\ntitle: ${this.title}`;
      } else {
       return this.title; 
      }
    }
  }
  import "reflect-metadata";
  const requiredMetadataKey = Symbol("required");
   
  function required(target: Object, propertyKey: string | symbol, parameterIndex: number) {
    let existingRequiredParameters: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyKey) || [];
    existingRequiredParameters.push(parameterIndex);
    Reflect.defineMetadata( requiredMetadataKey, existingRequiredParameters, target, propertyKey);
  }
   
  function validate(target: any, propertyName: string, descriptor: TypedPropertyDescriptor<Function>) {
    let method = descriptor.value!;
   
    descriptor.value = function () {
      let requiredParameters: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyName);
      if (requiredParameters) {
        for (let parameterIndex of requiredParameters) {
          if (parameterIndex >= arguments.length || arguments[parameterIndex] === undefined) {
            throw new Error("Missing required argument.");
          }
        }
      }
      return method.apply(this, arguments);
    };
  }



//Metadata:- When enabled, as long as the reflect-metadata library has been imported, additional design-time type information will be exposed at runtime
import "reflect-metadata";
class Point {
  constructor(public x: number, public y: number) {}
}
class Line {
  private _start: Point;
  private _end: Point;
 @validate
  set start(value: Point) {
    this._start = value;
  }
  get start() {
    return this._start;
  }
  @validate
  set end(value: Point) {
    this._end = value;
  }
  get end() {
    return this._end;
  }
}
function validate<T>(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<T>) {
  let set = descriptor.set!;
  
  descriptor.set = function (value: T) {
    let type = Reflect.getMetadata("design:type", target, propertyKey);
 
    if (!(value instanceof type)) {
      throw new TypeError(`Invalid type, got ${typeof value} not ${type.name}.`);
    }
 
    set.call(this, value);
  };
}
const line = new Line()
line.start = new Point(0, 0)
//The TypeScript compiler will inject design-time type information using the @Reflect.metadata decorator.

class Line {
    private _start: Point;
    private _end: Point;
    @validate
    @Reflect.metadata("design:type", Point)
    set start(value: Point) {
      this._start = value;
    }
    get start() {
      return this._start;
    }
    @validate
    @Reflect.metadata("design:type", Point)
    set end(value: Point) {
      this._end = value;
    }
    get end() {
      return this._end;
    }
  }

  