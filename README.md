#This is a list build that I did that handles reordering with some intelligence.

It assumes that the value that you put into the line number box is the target line number that you want after the sort.

The only exception is when you pick a value under 1, or greater than the count.

See it in action: http://embed.plnkr.co/FDTlKs4nlUWDmotXmc7u/preview

Known compatibility issues
* IE has a problem where when you renumber a field, you have to leave the text box, re-enter the text box, then you can retype. Otherwise the kbd entry is ignored, regardless of how many times you click on the text box.

Known minor issues
* I still don't have the dependancy on jQuery or TBS javascript files removed.
* Common.js is my own compilation of many compatibility scripts that are missing, and some nifty things that I have added.
 *  Common.js needs to be both minified and cleaned up.
  
Future
* None - This is a demo, if I decide to show people the bug and see if they want to give it a swing to fix.
