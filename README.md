
<img src="/assets/icon/logo_tap_trans.png" width="200"></img>

# TapSearch (MVC)

### A simple program called TapSearch that takes in multiple paragraphs of text, assigns a unique ID To each paragraph and stores the words to paragraph mappings on an inverted index. This is similar to what elasticsearch does. This paragraph can also be referred to as a ‘document’. Given a word to search for, it lists out the top 10 paragraphs in which the word is present.

1. Tokenize to words by splitting at whitespace
2. Convert all words to lowercase
3. Index these words against the documents they are from
4. Generate a unique ID for every document that is index
5. A paragraph is defined by two newline characters

Tech stack:
* NodeJS
* Express
* MongoDB
* Postman
* Horeku


Base URL : https://tapsearch-app.herokuapp.com/

## Table of Contents
 * [Save paragraphs](#save-paragraphs)
 * [Search words in paragraphs](#search-words-in-paragraphs)
 * [Remove paragraphs](#remove-paragraphs)


 #### Reference : https://docs.mongodb.com/manual/core/index-text/#create-text-index
 ```db.paragraphs.createIndex( { tags: "text" } )```

## API Documentation

### Save paragraphs

Index a given document (After having split the input into paragraphs a.k.a document)

#### Request

``` https://tapsearch-app.herokuapp.com/home/index ```

``` 
Headers
Content-Type : application/json

HTTP method
POST
```
```javascript
{
    "paragraphs" : string
}
```
#### Response

```javascript
{
    "message": string
}
```

### Search words in paragraphs

Given a word, search for it and retrieve the top 10 paragraphs (Documents) that contain it.

#### Request

``` https://tapsearch-app.herokuapp.com/home/search ```

``` 
Headers
Content-Type : application/json

HTTP method
POST
```
```javascript
{
    "query" : string
}
```
#### Response

```javascript
{
    "paragraphs": {
        "tags" : array,
        "_id" : string,
        "text" : string,
    }
}
```

### Remove paragraphs

Clear the index and all indexed documents.

#### Request

``` https://tapsearch-app.herokuapp.com/home/clear ```

``` 
Headers
Content-Type : application/json

HTTP method
GET
```
#### Response

```javascript
{
    "message": string
}
```

## License

``` 
The MIT License (MIT)
=====================

Copyright © 2019 Prathamesh More

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the “Software”), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE. ```
