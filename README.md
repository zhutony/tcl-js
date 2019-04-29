# tcl-js

> A native javascript tcl interpreter

[![tcl-js](https://img.shields.io/npm/v/tcl-js.svg?style=flat&color)](https://www.npmjs.com/package/tcl-js)
[![Build Status](https://travis-ci.org/rubikscraft/tcl-js.svg?branch=master&style=flat)](https://travis-ci.org/rubikscraft/tcl-js)
[![codecov](https://codecov.io/gh/rubikscraft/tcl-js/branch/master/graph/badge.svg)](https://codecov.io/gh/rubikscraft/tcl-js)
[![install size](https://packagephobia.now.sh/badge?p=tcl-js&style=flat)](https://packagephobia.now.sh/result?p=tcl-js)

## About

tcl-js is a project I started because it was impossible to find a pre-existing replacement that already fit all my needs. And since I need to up my typescript skill anyways, took on this project.
tcl-js is mean to replicate the tcl-sh interpreter as closely as possible, any deviations that are made will be listed below.

## Disclaimer

This project is still a work in progress, it is therefore not recommended to use this in production yet. While it is unlikely the api may change in the future, so beware.

Because this project is still not finished any new PRs or found issues being added would be highly aprreciated.

## Getting started

Install tcl-js to your project with

```bash
npm install --save tcl-js
```

Then use it in your project by importing the Tcl component.

```js
// Import the interpreter
const { Tcl } = require('tcl-js');

// Create a new interpreter
// Every interpreter keeps it scope until destroyed
let tcl = new Tcl();

// The interpreter works async, so an async function is used
async function main() {
  // Print "Hello World!" to the terminal
  await tcl.run('set w "World!"');
  await tcl.run('puts "Hello $w"');
}

// Call the async function
main().catch(console.error);
```

## Documentation

You can find the documentation [here](https://htmlpreview.github.io/?https://github.com/rubikscraft/tcl-js/blob/master/docs/index.html)

## Status

Down below is the current project status of tcl-js, here you can see what parts are already implemented and working, and what deviations have been made from the original tcl-sh interpreter.

### Deviations

- In the `expr` command:
  - The `x ** y` (exponentiation) operator has been changed to `x ^ y`
  - The `~x` (bitwise not) operator is now `bnot(x)`
  - The `!x` (logical not) operator is now `not(x)` or `not x`
  - The `x << y` and `x >> y` (bitwise shift) operators are now `lshift(x, y)` and `rshift(x, y)`
  - The `x & y` and `x | y` (bitwise and/or) operators are now `band(x, y)` and `bor(x, y)`
  - The `a1 && a2 && a3 &&...` and `a1 || a2 || a3 ||...` (logical and/or) operators are now `land(a1, a2, a3, ...)` and `lor(a1, a2, a3, ...)`
  - The `eq`, `ne` and `ni` (string compare) operators are not implemented, please use `==`, `!=` and `not(x in y)` instead

### Currently working tcl commands

These commands should be fully working according to the tcl wiki

- eval
- expr
- lindex
- list
- proc
- puts
- set
- unset

### Partially working commands

Only part of these commands are finished and may not work as expected

- info

### Other working parts

These are not commands but just general parts of the interpreter, if they are listed they work

- lexer
- parser
- command handler
- object and array variables
- list variables
- custom functions
- scoping
- interpreter
- backslash escape sequences
- advanced variables
- asynchronous
- expression variables
