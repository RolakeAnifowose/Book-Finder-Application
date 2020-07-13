function getBooks(event) {
    event.preventDefault();
    let searchProperty = document.getElementById('searchInput').value;
    let api = 'https://www.googleapis.com/books/v1/volumes?q=';
    let apiKey = ‘&key=//insert your Google Books API key here';
    let maxResult = '&max-results=5';
    let url = api + searchProperty + apiKey + maxResult;

    fetch(url)
        .then(response => {
            if(!response.ok) {
                throw Error('Error');
            }
            return response.json();
        })
        .then(data => {
            console.log(data.items);
            // console.log(data.items[0].volumeInfo.description.substring(0, 200) + '...');
            const html = data.items
            .map(book => {
                // console.log(`${book.volumeInfo.description}`.substring(0, 200) + '...')
                // console.log(description);
                return `
                    <div class="book">
                        <div class="imageDiv">
                            <a class="image" href="${book.volumeInfo.previewLink}"><img src="${book.volumeInfo.imageLinks.thumbnail}"></a>
                        </div>
                        <div class="textDiv">
                            <a class="title" href="${book.volumeInfo.previewLink}">${book.volumeInfo.title}</a>
                            <p class="author">${book.volumeInfo.authors} - ${book.volumeInfo.publishedDate}</p>
                            <a class="btn btn-primary" id="preview" href="${book.volumeInfo.previewLink}" target="_blank"><span class="icon"><i class="fas fa-book"></i></span>Preview</a>
                        </div>
                    </div>
                ` 
            })
            .join('');
            document.querySelector('#searchResults').insertAdjacentHTML('afterbegin', html);
        })
        .catch(error => {
            console.log(error);
        });
}

document.getElementById('searchButton').addEventListener('click', getBooks);
