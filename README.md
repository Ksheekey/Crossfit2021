# 2021-Crossfit-One-Division
If everyone was in the same division

The goal of this was to see who would have won the 2021 NoBull Crossfit Games if all crossfit athletes from the mens and womens side competed together in one division. Crossfit scales their workouts so that the male and female competitors have a level playing field.


In Pandas,
Start off with scraping the Crossfit Games 2021 website to find the event by event results for each athlete in the mens and womens division.
Saved as CrossfitScrape.ipynb

The goal was to build a DataFrame / csv file that held

1. First and Last names
1. image of athlete
1. their country
1. image of the country flag
1. their affiliate
1. event 1-15 results
1. a rank for each event

The output got saved as crossfit.csv

Data manipulation was done in excel using formulas and step-by-step cased macros;

1. all athletes not completing in an event were given a rank of 1 from pandas so had to count how many 1's were present in the event rank row and subract the rest of the row by that number to get the actual rank (so if there were 3 people not competing, those 3 people were ranked 1 while the person who won was ranked 4, so count how many 1's were present, in this case 3, and minus everyones ranks by that number. This makes the previous rank 4, a rank of 1)
1. Inserted a VLOOKUP table to score the events
1. I doubled the point values for each event being there were double the competitors, so instead of the 1st place getting 100 and 2nd getting 98.. 1st got 200 and 2nd got 196.
1. Event 12 was a problem I ran into. As seen with that row in crossfit.csv it scored the athletes on how much they lifted. The guy who did the worse had 225lbs while the winning girl had 200lb. So in the spirit of crossfit, I scaled the weight lifted much like a curve on a test in school. I applied that to the females totals to level the field. (you can see this in the excel file.)
1. I then made the rows for the race chart, which adds up the score event by event.
1. Per the competition, once athletes were cut or had to leave due to medical, their position was the bottom-most position available regardless of score


Once this was done it was saved as the macro formatted excel sheet crossfitOneDivision.xlsm

Scoring table breakdown is in the images folder

Then went to Flourish to see what it looked like as a race chart.

Graph here:

https://preview.flourish.studio/7043910/X2j5B5bEw3qbyVWuXPkuPbf8VjAZXI-RJqFfYKyxHaD2Z9kqWpu4e7TDIEcjaBD5/