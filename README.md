# A/B Test Calculator

This repository hosts the source code for [ABTestCalculator.com](http://www.abtestcalculator.com), a visual A/B test significance calculator.

## Development

First, clone this repository and ensure you have [npm](https://github.com/npm/npm) installed.

Next, install the project's dependencies by running `npm install`.

Finally, simply run `gulp` from the command line and then open `build/index.html` in your browser.

## The Math

For an explanation of the math behind A/B testing significance calculations, checkout this excellent series by Aaron O'Connell:

* [The Math of Split Testing Part 1: Statistical Sampling Uncertainty](http://blog.42floors.com/math-split-testing-part-1-statistical-sampling-uncertainty/)
* [The Math of Split Testing Part 2: Chance of Being Better](http://blog.42floors.com/math-split-testing-part-2-chance-better/)
* [The Math of Split Testing Part 3: The Chance of being Similar](http://blog.42floors.com/math-split-testing-part-3-chance-similar/)

This tool uses the Wald method to estimate the distribution of the sample proportions and tests are considered significant at the p = 0.10 confidence level.

# Contact

If you have any suggestions, find a bug, or just want to say hey drop me a note at [@mhmazur](https://twitter.com/mhmazur) on Twitter or by email at matthew.h.mazur@gmail.com.

# License

MIT © [Matt Mazur](http://mattmazur.com)
