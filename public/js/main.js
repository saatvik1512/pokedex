async function pokemon() {
    const pokemonPromises = [];
    for (let i = 1; i < 60; i++) {
        pokemonPromises.push(getAPI(i));
    }
    await Promise.all(pokemonPromises);
}


const mainContainer = document.querySelector('.all-pokemon-container');

async function getAPI(index){
    try { 
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${index}/`);
        const data = await response.json();
        const pokemonName = data.name;
        const pokemonSprite = data.sprites.front_default;
        const types = data.types.map(element => element.type.name)
        console.log(data.stats)
        const hp = data.stats[0].base_stat;
        const attack = data.stats[1].base_stat;
        const defense = data.stats[2].base_stat;
        const speed = data.stats[5].base_stat;
        makePokeMonCard(pokemonName, pokemonSprite, types, hp, attack, defense, speed);
    } catch (error) {
        console.error(error)
    }
}

function makePokeMonCard(pokemonName, pokemonSprite, types, hp, attack, defense, speed){
    const div = document.createElement('div');
    div.classList.add('pokemon-card')
    div.innerHTML = `<div class='card-content'>
    <div class='pokemon-hp'><h1>HP:</h1> <span>${hp}</span></div>
    <img src='${pokemonSprite}' alt='arcanine'>
    <div class='pokemon-name'><h1>${pokemonName}</h1></div>
    <div class='type'></div>`
    for (const item of types){
        const color = getPokemonColor(item);
        div.innerHTML += `<p class='type-heading' style="font-weight: 700;
        padding: 0.2rem 1.3rem;
        background-color: ${color};
        border-radius: 32px;
        color: white;
        font-size: 0.8rem;">${item}</p>`
    }
    div.innerHTML += `<div class='stats'>
    <span>
      <h1>${attack}</h1>
      <p>Attack</p>
    </span>
    <span>
      <h1>${defense}</h1>
      <p>Defense</p>
    </span>
    <span>
      <h1>${speed}</h1>
      <p>Speed</p>
    </span>
  </div>
</div>`
  mainContainer.append(div)
    // <div class='type'>
    //   <p class='type-heading'>fire</p>
    // </div>
    // div.classList.add('pokemon-card')
    // const subdiv = document.createElement('div');
    // subdiv.classList.add('subdiv')
    // div.append(subdiv)
    // mainContainer.append(div);
    // for (const item of types){
    //     const color = getPokemonColor(item);
    //     subdiv.innerHTML += `<p style = "padding: 0.4rem 1rem;
    //     border: 2px solid ${color};
    //     border-radius: 20px;">${item}</p>`
    // }
}


function getPokemonColor(pokemonColor) {
    const typeColors = {
        normal: "#A8A878",
        fire: "orange",
        water: "blue",
        electric: "yellow",
        grass: "green",
        ice: "#98D8D8",
        fighting: "red",
        ground: "#E0C068",
        flying: "#A890F0",
        psychic: "#F85888",
        bug: "#A8B820",
        rock: "#B8A038",
        ghost: "#705898",
        dragon: "#7038F8",
        dark: "#705848",
        steel: "#B8B8D0",
        fairy: "pink",
        poison: "purple"
    };
    return typeColors[pokemonColor]
}

pokemon()