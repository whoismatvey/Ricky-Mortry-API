let cards = document.querySelector('.cards');

function fetchOne (url, fun) {
    fetch(url).then((response) => {
        return response.json()
    }).then((data) => {
        fun(data);
    })

}

let renderCards = (heroes) => {
    heroes.results.forEach(item => {
        cards.innerHTML += `
        <div class="card">
            <img src='${item.image}'></img>
            <div class="card__name">${item.name}</div>
            <div class="card__origin">${item.origin.name}</div>
            <button class="card__btn" onclick="renderPopup(${item.id})">More</button>
        </div>
        `
    });
}

let search = (hero) => {
    fetch(`https://rickandmortyapi.com/api/character?name=${hero}`).then((response) => {
        return response.json()
    }).then((data) => {
        cards.innerHTML = '';
        data.results.forEach(item => {
            cards.innerHTML += `
            <div class="card">
                <img src='${item.image}'></img>
                <div class="card__name">${item.name}</div>
                <div class="card__origin">${item.origin.name}</div>
                <button class="card__btn" onclick="renderPopup(${item.id})">More</button>
            </div>
            `
        });
})}


let renderPopup = (id) => {
    fetch(`https://rickandmortyapi.com/api/character/${id}`).then((response) => {
        return response.json()
    }).then((data) => {
        document.body.innerHTML += `
            <div class="popup">
                <div class="popup__body">
                    <div class="popup__content">
                        <img src="${data.image}"></img>
                        <button class="popup__close" onclick="popupRemove()">X</button>
                        <table>
                            <tr><td>Status:</td> <td>${data.status}</td></tr>
                            <tr><td>Gender:</td> <td>${data.gender}</td></tr>
                            <tr><td>Species:</td> <td>${data.species}</td></tr>
                            <tr><td>Location:</td> <td>${data.location.name}</td></tr>
                        </table>
                    </div>
                </div>
            </div>
            `
    })
}

let popupRemove = () => {
    document.querySelector('.popup').remove();
}

fetchOne('https://rickandmortyapi.com/api/character', renderCards);
