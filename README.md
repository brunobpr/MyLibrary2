# My Library
My Library is an web application to keep track of all physical books I have on my shelf at home. Reading and buying new books are my two favourite hobbies, therefore someday the number of books I own will be greater than I can keep in my head. My books.json file was created based on a spreadsheet I have been building since 2013, it contains relevant book information plus the year it was read. Only for this application I added a Favourite field to show even further information regarding only my favourite books.
## Technology
There are several ways to develop an interactive web application, but I have chosen the following technologies:
- Framework: Express;
- Data format: JSON;
- Templating: EJS;
- Security: Express-validator, NoSave;
- Styling: MaterializeCSS;

The Express framework is built using Node.js. It allows an easy and flexible way to create a backend application that works as a server. It offers features that handle HTTP requests, manage page routes and render HTML files. JSON - JavaScript Object Notation, nowadays it is one of the most used data format to exchange data between a browser and a server, I wanted to build an up to date application by using the easiest and latest technology presented in the market. To render the books.json file into an web page it was used EJS, which is a templating language that converts plain JavaScript into a readable HTML. For security measures it was used Express-validator and NoSave in the backend for sanitation and validation. For the frontend, the HTML pattern and required fields were used, plus the JavaScript given by the Materialize framework.
For deep understating of how this web app works it is required to explain what each file is doing. The core file is the app.js, it works as the server and handles all the GET and POST request from the user. It also redirects the user to the web page based on the URL entered, each page requires a different route. The app.js is also doing the sanitisation and validation in the backend. Books.json is where My Library’s data is stored. It has an array of JSON objects(books), each book contains at least six elements: Title, Subtitle, Author, Publisher, Year (Date when it was published) and YearRead (When it was read). For some books, it was added a seventh item.

## Functionalities 
##### CRUD - CREATE, READ, UPDATE AND DELETE

My Library application is able to handle the full CRUD functionality. The user can add new books, update all the existing ones and also delete them. In the page Update My Library, it is just needed to click on any item, this action opens up a dropdown section that contains a form. In this form, two of the CRUD functionality is presented. Update and Delete.

Creating a new JSON object and adding it to the array books is also possible, it can be done on the Register A New Book page. Like the Update My Library it has input validation. If the user enter a input which does not match with the pattern given, the form is not submitted and an error message is displayed. If the user has already read the book that is being added, there is a checkbox that when checked opens a new text field. If all the inputs match with the requirements, the form is submitted and a second validation and sanitisation in the backend is done.


### Displaying the Data
Favourite Books reads in all the books.json file, but by using an IF statement it only displays books that contains the Favourite json element. It uses Materialize Image Card, which is an standard card with an image thumbnail to display the content. The More Info link sends the user to an Wikipedia Page referent to the book.
My Library is the main page of the web application, it contains the whole collection of books that shows relevant information about each book. It also shows which book has been read with a tick on the righthand side. For the small thumbnail I have tried to use Google Books API to make it different for each book, but unfortunately Google has a limit of requests per minute.
