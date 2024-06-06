async function pokemon() {
    const pokemonPromises = [];
    for (let i = 1; i < 20; i++) {
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
        const pokemonSprite = data.sprites.other.home.front_default;
        const types = data.types.map(element => element.type.name)
        const hp = data.stats[0].base_stat;
        const attack = data.stats[1].base_stat;
        const defense = data.stats[2].base_stat;
        const speed = data.stats[5].base_stat;
        makePokeMonCard(pokemonName, pokemonSprite, types, hp, attack, defense, speed,index);
    } catch (error) {
        console.error(error)
    }
}

function makePokeMonCard(pokemonName, pokemonSprite, types, hp, attack, defense, speed, index){
    const div = document.createElement('div');
    div.classList.add('pokemon-card');
    div.innerHTML = `
        <div class='card-content'>
            <div class='pokemon-hp'><h1>HP:</h1> <span>${hp}</span></div>
            <img src='${pokemonSprite}' alt='${pokemonName}'>
            <div class='pokemon-name'><h1>${pokemonName}</h1></div>
            <div class='type'></div>
            <div class='stats'>
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
        </div>`;
    
    const typeDiv = div.querySelector('.type');
    for (const item of types) {
        const color = getPokemonColor(item);
        const p = document.createElement('p');
        p.style.cssText = `
            font-weight: 700;
            padding: 0.2rem 1.3rem;
            background-color: ${color};
            border-radius: 32px;
            color: white;
            font-size: 0.8rem;`;
        p.textContent = item;
        typeDiv.appendChild(p);
    }

    mainContainer.append(div);
    div.addEventListener('click', ()=>{
        window.location.href = `/pokedex/${index}`;
    })
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