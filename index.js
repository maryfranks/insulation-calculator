const fs = require('fs');
const readline = require('readline')
const inputFile = 'input.txt'

// build information objects
let people = {}
let cities = {}
let queries = []
let results = []

function readFile() {

  let rl = readline.createInterface({
    input : fs.createReadStream(inputFile),
  })

  rl.on('line', function(line) {
    let splitLineArray = line.substr(1).split(/[" "]+[" ]/)
    if (splitLineArray.length > 2) {

      let city = splitLineArray[1]
      let region = city.split("/").slice(0, 2).join("/")
      let country = city.split("/")[0]
      let value = parseFloat(splitLineArray[2])
      addToCities(city, value)
      addToCities(region, value)
      addToCities(country, value)

      let person = splitLineArray[0]
      let info = [city, value]
      people[person] = info

    } else if (splitLineArray.length > 1){
      let name = splitLineArray[0]
      let region = splitLineArray[1].slice(0, splitLineArray[1].length-1)
      let query = [name, region]
      queries.push(query)
    }
  })
}

function addToCities (key, value) {
  if (cities.hasOwnProperty(key)) {
    cities[key].push(value)
  } else {
  cities[key] = [value]
  }
}

function makeResultsArray() {
  queries.forEach(function(array) {
    let name = array[0]
    let place = array[1]
    let rscore = people[name][1]
    let result = calculateScore(cities[place], rscore)
    array.push(result)
    results.push(array)
  })
}

function calculateScore(rscoreArray, rscoreIndividual) {
  let better = 0
  rscoreArray.forEach(function(score) {
    if (score > rscoreIndividual) {
      better += 1
    }
  })
  let numberOfHomes = rscoreArray.length
  let percentile = (better/numberOfHomes) * 100
  let result = 0
    if (percentile >= 90 && percentile <= 100) {
      result = 1
    } else if (percentile >= 80 && percentile <= 89) {
      result = 2
    } else if (percentile >= 70 && percentile <= 79) {
      result = 3
    } else if (percentile >= 60 && percentile <= 69) {
      result = 4
    } else if (percentile >= 50 && percentile <= 59) {
      result = 5
    } else if (percentile >= 40 && percentile <= 49) {
      result = 6
    } else if (percentile >= 30 && percentile <= 39) {
      result = 7
    } else if (percentile >= 20 && percentile <= 29) {
      result = 8
    } else if (percentile >= 10 && percentile <= 19) {
      result = 9
    } else if (percentile >= 0 && percentile <= 9) {
      result = 10
    }
  return result
}

readFile()
makeResultsArray()
console.log(`people: ${people}`)
console.log(`cities: ${cities}`)
console.log(`queries: ${queries}`)
console.log(`results: ${results}`)

// console.log(`city: ${city}, region: ${region}, country: ${country}`);
