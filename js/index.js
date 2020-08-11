class Book{
    constructor(bookName,bookAuthor,bookType){
        this.bookName = bookName;
        this.bookAuthor = bookAuthor;
        this.bookType = bookType;
    }
}

class Display{
    add(book){
        let tableBody = document.querySelector(`#tableBody`)
        let tableList = `
                <tr>
                    <td>${book.bookName}</td>
                    <td>${book.bookAuthor}</td>
                    <td>${book.bookType}</td>
                </tr>
        `
        tableBody.innerHTML += tableList;
    }

    validate(book){
        if(book.bookName.length < 2 || book.bookAuthor.length < 2){
            return false
        }else{
            return true
        }
    }

    clear(){
        let libraryForm = document.querySelector(`#library-form`)
        libraryForm.reset()
    }

    show(type,errorMessage){
        let errorMessageDOM = document.querySelector(`#error-message`)
        let emphasizeText;
        if(type === 'success'){
            emphasizeText = 'Success'
        }else{
            emphasizeText = 'Error'
        }

        errorMessageDOM.innerHTML = `
                <div class="alert alert-${type} alert-dismissible fade show text-center" role="alert">
                    <strong>${emphasizeText}:</strong> ${errorMessage}
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>`

        setTimeout(() => {
            errorMessageDOM.innerHTML = ``
        },4000)
    }
}

let libraryForm = document.querySelector(`#library-form`)
libraryForm.addEventListener(`submit`, e => {
    let bookName = document.querySelector(`#book-name`).value
    let bookAuthor = document.querySelector(`#book-author`).value
    let bookType = document.querySelector(`#book-type`)
    // Dropdown
    let selectProgramming = document.querySelector(`#select-programming`)
    let selectMystery = document.querySelector(`#select-mystery`)
    let selectAction = document.querySelector(`#select-action`)
    let selectHistorical = document.querySelector(`#select-historical`)

    if(selectProgramming.selected){
        bookType = selectProgramming.value

    }else if(selectMystery.selected){
        bookType = selectMystery.value
    
    }else if(selectAction.selected){
        bookType = selectAction.value
    
    }else if(selectHistorical.selected){
        bookType = selectHistorical.value
    }

    let book = new Book(bookName,bookAuthor,bookType)
    console.log(book)

    let display = new Display()

    if(display.validate(book)){
        display.add(book)
        display.clear()
        display.show("success","Book added successfully!")
    }else{
        display.show("error","Can't add this book.")
    }

    e.preventDefault()
})