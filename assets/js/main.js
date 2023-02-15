const pokemonList = document.getElementById('pokemonList')
const loadMoreBtn = document.getElementById('loadMoreBtn')
let offset = 0
const limit = 6

const maxRecords = 151

function loadPokemonItens(offset, limit) {
    function convertPokemonToLi(pokemon) {
        return `
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
    
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
    
                    <img src="${pokemon.photo}"
                         alt="${pokemon.name}">
                </div>
            </li>
        `
    }
    
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {    
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreBtn.addEventListener('click', () => {
    offset += limit
    const recordsWithNextPage = offset + limit

    if (recordsWithNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)    

        loadMoreBtn.parentElement.removeChild(loadMoreBtn)
    } else {
        loadPokemonItens(offset, limit)
    }
})