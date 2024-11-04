//Modules

//1.ES Module Syntax
//hello.ts
export default function helloWorld() {
    console.log("Hello, world!");
  }
//Import file
import helloWorld from "./hello.js";
helloWorld();


//We can have more than one export of variables and functions via the export by omitting default
//export file
export var pi = 3.14;
export let squareTwo = 1.41;
export const phi = 1.61;
 
export class RandomNumberGenerator {}
 
export function absolute(num: number) {
  if (num < 0) return num * -1;
  return num;
}
//import file
import { pi, phi, absolute } from "./maths.js";
 
console.log(pi);
const absPhi = absolute(phi);



//An import can be renamed using a format like import {old as new}
import { pi as π } from "./maths.js";
console.log(π);


//You can mix and match the above syntax into a single import
//maths.ts
export const pi = 3.14;
export default class RandomNumberGenerator {}
//app.ts
import RandomNumberGenerator, { pi as π } from "./maths.js";
RandomNumberGenerator;
console.log(π);


//You can take all of the exported objects and put them into a single namespace using * as name
// @filename: app.ts
import * as math from "./maths.js";
console.log(math.pi);
const positivePhi = math.absolute(math.phi);
//You can import a file and not include any variables into your current module via import "./file"
import "./maths.js";
console.log("3.14");


//2.TypeScript Specific ES Module Syntax:- Types can be exported and imported using the same syntax as JavaScript values

// @filename: animal.ts
export type Cat = { breed: string; yearOfBirth: number };
export interface Dog {
  breeds: string[];
  yearOfBirth: number;
}
//@filename: app.ts
import { Cat, Dog } from "./animal.js";
type Animals = Cat | Dog;


//TypeScript has extended the import syntax with two concepts for declaring an import of a type

//import types
// @filename: animal.ts
export type Cat1 = { breed: string; yearOfBirth: number };
export type Dog1 = { breeds: string[]; yearOfBirth: number };
export const createCatName1 = () => "fluffy";
// @filename: valid.ts
import type { Cat1, Dog1 } from "./animal.js";
export type Animals1 = Cat | Dog;
// @filename: app.ts
import type { createCatName } from "./animal.js";
const name = createCatName1();

//Inline type imports
import { createCatName2, type Cat2, type Dog2 } from "./animal.js";
export type Animals2 = Cat | Dog;
const name2 = createCatName2();



//ES Module Syntax with CommonJS Behavior
import fs = require("fs");
const code = fs.readFileSync("hello.ts", "utf8");



//3.CommonJS Syntax

//Exporting:- Identifiers are exported via setting the exports property on a global called module
function absolute(num: number) {
    if (num < 0) {
        return num * -1;
    }
    return num;
  }
  module.exports = {
    pi: 3.14,
    squareTwo: 1.41,
    phi: 1.61,
    absolute,
  };

//importing:- Then these files can be imported via a require statement
const maths = require("./maths");
maths.pi;
//or we can simplify using destructuring feature in JavaScript
const { squareTwo } = require("./maths");
squareTwo;

