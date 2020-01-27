# developer-profile-generator

This app creates a PDF card using information from a github profile. The user is allowed to enter their github username when prompted, then they choose their favorite color from a list. The color chosen determines the background of the PDF, while the username is used to retrieve data from said github profile to populate the PDF that will be created.  

## Usage

After downloading the files, the user can start the progam by running index.js in node (node index.js). After that the user should enter their github username and pick their favorite color. A PDF file named index.pdf will then be created in the same folder as the index.js file.


## Built With

* [Inquirer](https://www.npmjs.com/package/inquirer) - Used to create prompts in Node.
* [Axios](https://www.npmjs.com/package/axios) - Used to call API's.
* [html-pdf](https://www.npmjs.com/package/html-pdf) - Used to convert HTML to PDF.
* [Bootstrap](https://getbootstrap.com/) - Used as the web framework.

## License

MIT License

Copyright (c) 2019 Kyle Jones

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
