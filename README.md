# compare-the-market

JavaScript tests

## Installation

Download the sourcecode or clone this repository with

```sh
git clone https://github.com/andreasonny83/compare-the-market.git
```

We assume you have already installed [npm](https://www.npmjs.com/)
and [NodeJS](node.js) on your machine.

Install all the project's dependencies with:

```sh
npm install
```

## About the tests

There are 2 folders named `test1` and `test2` inside this project.
Each of them contains a JavaScript module, a unit test and an demo file
ready to be run in your terminal.

### Running the demos

Each demo for the 2 test modules can be run from the root project folder
running:

```sh
npm run demo:test1
```

and

```sh
npm run demo:test2
```

### Test1

Given a book in a text file

1.  Write an application that outputs the individual words that appear in
the book, and how many times that word appears in the text file.

2.  The second part is to also output whether the number of times each
word appears is a prime number.

The following assumptions can be made:

*   Ignore punctuation and
capitalisation

*   Complete this test using JavaScript and/or Node.js

It would be beneficial to:

*   Come up with more than one solution and be able to talk about the pro's
and con’s to each

*   Ensure the application scales and performs optimally

*   Use TDD in the approach to writing the application

## Unit tests

Each of the 2 tests have a unit test file named `*.spec.js` in the
correspondent folder.
To easily run all the unit tests and render a report in an HTML format
open a terminal to this project folder and run:

```sh
npm test
```

This will generate a `reports` folder and (hopefully) will trigger the file
report to be opened inside your default browser. You should be able to see
the `mocha` test result directly in your terminal window as well and a
`reports.html` should be generated inside your `reports` folder every time
you run this npm command.
