# compare-the-market

> JavaScript tests

[![Build Status](https://travis-ci.org/andreasonny83/compare-the-market.svg?branch=master)](https://travis-ci.org/andreasonny83/compare-the-market)

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

### Test2

#### BOWLING

Write a program to score a game of Ten-Pin Bowling.

`Input`: string (described below) representing a bowling game

`Output`: integer score

#### The scoring rules

Each game, or `line` of bowling, includes ten turns, or `frames` for the bowler.

In each frame, the bowler gets up to two tries to knock down all ten pins.

If the first ball in a frame knocks down all ten pins,
this is called a `strike`. The frame is over.

The score for the frame is ten plus the total of the pins knocked down in the
next two balls.

If the second ball in a frame knocks down all ten pins,
this is called a `spare`.

The frame is over. The score for the frame is ten plus the number of pins
knocked down in the next ball.

If, after both balls, there is still at least one of the ten pins standing the
score for that frame is simply the total number of pins knocked down in those
two balls.

If you get a spare in the last (10th) frame you get one more bonus ball.
If you get a strike in the last (10th) frame you get two more bonus balls.

These bonus throws are taken as part of the same turn.
If a bonus ball knocks down all the pins, the process does not repeat.
The bonus balls are only used to calculate the score of the final frame.

The game score is the total of all frame scores.

#### Examples

`X` indicates a strike

`/` indicates a spare

`-` indicates a miss

`|` indicates a frame boundary

The characters after the || indicate bonus balls

##### Ten strikes on the first ball of all ten frames

`X|X|X|X|X|X|X|X|X|X||XX`

Two bonus balls, both strikes.

Score for each frame == 10 + score for next two balls == 10 + 10 + 10 == 30

Total score == 10 frames x 30 == 300

##### Nine pins hit on the first ball of all ten frames

`9-|9-|9-|9-|9-|9-|9-|9-|9-|9-||`

Second ball of each frame misses last remaining pin.

No bonus balls.

Score for each frame == 9

Total score == 10 frames x 9 == 90

##### Five pins on the first ball of all ten frames

`5/|5/|5/|5/|5/|5/|5/|5/|5/|5/||5`

Second ball of each frame hits all five remaining pins, a spare.

One bonus ball, hits five pins.

Score for each frame == 10 + score for next one ball == 10 + 5 == 15

Total score == 10 frames x 15 == 150

`X|7/|9-|X|-8|8/|-6|X|X|X||81`

Total score == 167

#### Assumptions

*   Please complete this test using JavaScript and/or Node.js
*   Thought to performance, TDD and OO would be of benefit

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
