let cards = document.querySelector('.cards');
let page = document.querySelector('.page');
let pageNumber = document.querySelector('.page__number');
let mask = document.querySelector('.mask');
let searchInput = document.querySelector('.header__search');
let count = 1;

window.addEventListener('load', () => {
    setTimeout(() => {
        mask.classList.add('hidden');
    }, 1000);
})

async function getData (url) {
    const result = await fetch(`${url}`);
    if(!result.ok) {
        throw new Error(`Error status:" ${res.status} from ${res.url}`);
    }
    return result.json();
}

let renderCards = (heroes) => {
    heroes.results.forEach(item => {
        cards.innerHTML += `
            <div class="card">
                <img class="card__img" src='${item.image}'></img>
                <div class="card__name">${item.name}</div>
                <div class="card__origin">${item.origin.name}</div>
                <button class="card__btn" onclick="renderPopup(${item.id})">More</button>
            </div>
        `
    });
}

getData('https://rickandmortyapi.com/api/character').then((data) => {
    renderCards(data);
})

let search = (hero) => {
    getData(`https://rickandmortyapi.com/api/character?name=${hero}`).then((data) => {
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
    });

    if(searchInput.value.length > 0) {
        resetPagenation();
    } else {
        showPagenation();
    }
}

let renderPopup = (id) => {
    disableScroll();
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
    enableScroll();
}

let disableScroll = () => {
    document.body.style.overflow = 'hidden';
} 

let enableScroll = () => {
    document.body.style.overflow = 'auto';
}

function changePage (page) {
    getData(`https://rickandmortyapi.com/api/character?page=${page}`).then((data) => {
        cards.innerHTML = '';
        renderCards(data)
    })
}

let resetPagenation = () => {
    count = 1;
    page.classList.add('hidden');
}

let showPagenation = () => {
    count = 1;
    page.classList.remove('hidden');
}

page.addEventListener('click', (e) => {
    if(e.target.classList.contains('btn-left')) {
        if(count > 1) {
            pageNumber.value = --count;
            changePage(count);
        }
    }
    if(e.target.classList.contains('btn-right')) {
        pageNumber.value = ++count;
        changePage(count);
    }
})

