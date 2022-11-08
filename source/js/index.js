let cards = document.querySelector('.cards');

fetch('https://rickandmortyapi.com/api/character').then((response) => {
    return response.json()
}).then((data) => {
    console.log(data)
})