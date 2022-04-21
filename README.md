# yaMock

Yet another library for mocking data in JavaScript.

- [yaMock](#yamock)
  - [Features](#features)
  - [Installation](#installation)
  - [Example](#example)
  - [Usage](#usage)
    - [Mock](#mock)
    - [Scheme and types](#scheme-and-types)
    - [Types](#types)

## Features

* Scheme based API
* Intuitive mock scheme description with integrated Types
* Posibility to make promise based responses

## Installation
Using npm:
```bash
$ npm install yamock
```

Using yarm:
```bash
$ yarn add yamock
```

## Example

Creating mock object, that will return random person data with random amount of posts, after random timeout:
```javascript
import Mock from 'yamock'
import {UUID, FullName, Username, Bool, DateTime, ArrayOf, Sentence, Sentences, Integer} from 'yamock/types'

const person = Mock({
    id: UUID(),
    name: FullName(Bool()),
    username: Username(),
    birthday: DateTime(0, new Date(2000, 1, 1)),
    posts: ArrayOf({
        id: UUID(),
        title: Sentence(3, 6),
        text: Sentences(Integer(2, 4))
    }, Integer(1, 3))
}, Integer(500, 2000))

const result = await person()
```
`Mock` function returns a function, that return random values each call based on scheme.

## Usage

### Mock
`Mock` - main object of module. Creates a function that return random values based on scheme.

Parameters:
|Name|Value|Description|
|-|-|-|
|Scheme|`Object` `Array`|Describes mock object structure|
|timeout|optional: `Number` `Function`|Creates delay for output< default value is 0|

Return `Object` if timeout equals 0, and `Promise` if timeout greater than 0.

### Scheme and types
`Scheme` - describes structure of mock object. Scheme is made of `Types`, that can be imported from `yamock/types`.

Example:
```javascript
import Mock from 'yamock'
import {Integer, String} from 'yamock/types'

const mock = Mock({
    int: Integer(0, 100), // generate random integer number between 0 and 100
    string: String(10) // generate string of random characters 10 symbols long
})
```

### Types
List of currently available types:
Numbers:
- `Integer(min, max)` - generates random integer between min and max
- `Id(max)` - generates random integer between 0 and max  
- `Float(min, max)` - generates random float number between min and - max
  
Date and Time:
- `DateTime(min, max)` - generates random Date beetween min and max, - min and max can be both `Number` and `Date`  
- `Time(min, max)` - generates random time between min and max

Boolean:
- `Bool(chance)` - return random boolean with chance of true value

String:
- `String(length)` - generates string of random characters `length` - symbols long  
- `Word()` - generates random word
- `Words(length)` - generates `length` count of words  
- `Sentence(min, max)` - generate sentence of words  
- `Sentences(length)` - generate random sentences `length` sentences - long  
- `FirstName()` - generate random first name  
- `LastName()` - generate random last name  
- `FullName(double)` - generate random full name  
- `Country()` - generate random country  
- `City()` - generate random city  
- `UUID()` - return uuidv4  
- `Email(provider)` - generate random email with provider  
- `Phone(code)` - generate random phone number with country code
- `CreditCard()` - generate random credit card number
- `Street()` - generate random street name
- `Coordinates(type)` - generate random WGS84 coordinates
- `Gender()` - return random gender
- `Username()` - generate random username

Array:
- `PickArray(array)` - pick element from array randomly
- `ArrayOf(type, length)` - generates array with `length` elements of `type`

URL:
- `Wikipedia` - return url to random Wikipedia article
- `Avatar(size)` - return url to random avatar
- `PlaceholderImage(width, height, text, format)` - return url to placeholder image
