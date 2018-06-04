# project

## Problem Statement
The finished product will illustrate whether population growth is outpacing agricultural production in (some parts of) the world. In 1799 demographer Thomas Malthus predicted that in the future there will come a day when there is not enough food produced to feed everybody.  People who are interested in sustainability will see whether there are any indications that indicate that Malthus might be right and that overpopulation is or will be a real problem.

## Solution
The visualizations will compare food production and population growth with a line graph, show how densely populated a country is, and how much land of a country is already being used for agriculture.

### Main features
- user can select from which year the data will be shown (Minimum viable product (MVP))
- globe/map which will show 1) the population density of each country (MVP) or 2) the prevalence of undernourishment. User can choose which variable will be illustrated on the map (Optional).
- line graph, which will compare the total population with the total food produced per country over a couple of decades. Usefr selects the country on the globe (MVP). User can also choose to compare population number with either crop or livestock production (Optional)
- piechart, which will illustrate how much land is being used already for agriculture in a certain country. Also shows decline in forest area, which can be a sign of overpopulation (MVP).

## Data Sources
Datasets from the World Bank (https://data.worldbank.org/indicator) will be used. All the datasets (csv-format) are user-friendly, and will thus need none to minimum editing before implantation.

### Datasets for the map/globe:
- Population density (people per sq. km of land area)
- Prevalence of undernourishment (% of population)

### Datasets for the pie chart
- Agricultural land (% of land area)
- Forest area (% of land area)

### Datasets for the line graph
- Population, total (note: index will be calculated and used for the line graph)
- Food production index (2004 – 2006 = 100)
- Crop production index (2004 – 2006 = 100)
- Livestock production index (2004 – 2006 = 100)

## External components
- D3 tip
- D3 topojson (https://github.com/topojson/topojson)
- Bootstrap

## Hardest parts


