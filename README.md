# Random cats web app

![Logo](https://user-images.githubusercontent.com/74159127/211264292-77edac19-ea2a-4653-b80c-f9a442440740.png)

Responsive web application for consume [The Cat API - Cats as a Service](https://thecatapi.com).

## Demo
Access the demo hosted at Vercel: [Demo](https://random-cats-tau.vercel.app/)

## Table of Contents
* [General Info](#general-information)
* [Screenshots](#screenshots)
* [Installation and Setup Instructions](#installation-and-setup-instructions)
* [Contact](#contact)
* [License](#license)

## General information
This is a frontend project where an api that generates data and information related to cats is consumed. Some of the implemented features, which are supported in the API, are: 

- Get random cats
- Add favorite cats
- Upload cats

## Screenshots

### Desktop size
![Front web app desktop](https://user-images.githubusercontent.com/74159127/211265482-adde8d76-6d07-463a-9f46-134eb267a54f.png)

### Mobile size
![Front web app mobile](https://user-images.githubusercontent.com/74159127/211266343-bde621e9-d505-4522-91a0-5e881e2398e0.png)

## Installation and Setup Instructions

### Installation
This project is built with **vanilla JavaScript**, so no package installation is required. 

### Setup
It is necessary to get a **API KEY** to be able to use the favorites and image upload features.

The **API KEY** can be obtained by registering on the [API](https://thecatapi.com/signup) page.

Once the **API KEY** is obtained, it must be configured in the [config.js](./js/config.js) file, replacing *YOUR_API_KEY* by your **API KEY**.

#### Example:
```javascript
export const API_KEY = "aaabbbcccdddeeefffhhhiiijjjkkk";
```
### Run
As this is a vanilla Javascript project, it can be run by opening the [index.html](./index.html) file in a browser. Also, it can be run through a web/http server.

## Contact
Creadted by Jorge Sanabria / jorgesanux\
[Twitter](https://twitter.com/jorgesanux)\
[Github](https://github.com/jorgesanux)\
[LinkedIn](https://www.linkedin.com/in/jorge--sanabria)

## License
Licensed [MIT license](LICENSE.md)
