class Pokemon{
    nome;
    numero;
    type;
    types = [];
    foto
}

function converterPokemonApi(pokeDetalhe){
    const pokemon = new Pokemon();

    pokemon.nome = pokeDetalhe.name
    pokemon.numero = pokeDetalhe.id

    const types = pokeDetalhe.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    pokemon.types = types
    pokemon.type = type

    pokemon.foto = pokeDetalhe.sprites.other.dream_world.front_default

    return pokemon;

}

const pokeApi = { }
pokeApi.getPokemonsDescricao = (pokemon) => {
    return fetch(pokemon.url).then((response) => response.json())
    .then(converterPokemonApi);
}
pokeApi.getPokemons = () =>{
    const url = 'https://pokeapi.co/api/v2/pokemon';

    return fetch(url)
    .then((response) => response.json())
    .then((res) => res.results)
    .then((pokemon) => pokemon.map(pokeApi.getPokemonsDescricao))
    .then((detalhesRequisicao) =>Promise.all(detalhesRequisicao))
    .then((pokemonDetalhe) => pokemonDetalhe)
    
}
function converterPokemon(pokemon){
    return `
    <li class="pokemon">
        <span class="numero">#${pokemon.numero}</span>
        <span class="nome">${pokemon.nome}</span>
        <div class="descricao">
        <ol class="tipos">
            ${pokemon.types.map((type) => `<li>${type}</li>`).join(' ')}
        </ol>
    <img src="${pokemon.foto}" alt="">
    </li>
    `
}

pokeApi.getPokemons()
    .then((list = []) =>{
        const novaLista = list.map((list) => {
            return converterPokemon(list);
        })
        
        const retornoListaHTML = novaLista.join('');
        
        const listaPokemons = document.getElementById('listaPokemons');
        listaPokemons.innerHTML += retornoListaHTML;
        
    })
    .catch((err) =>console.log(err) )