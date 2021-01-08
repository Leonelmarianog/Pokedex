module.exports = `
<main>
<div id="overlay"></div>

<div class="modal" id="modal">
    <div>
        <img src="" alt="oops!" id="modal-img">
        <p id="modal-text"><!-- --></p>
        <button class="btn" id="btn-close-modal" >X</button>
    </div>
</div>

<div class="pokedex">
    <div class="pokedex-main-panel">
        <div>
            <p>Name: <span id="name"><!-- --></span></p>
            <p>ID: <span id="id"><!-- --></span></p>
        </div>
        <div>
            <p id="loading">Loading...</p>
            <img src="" alt="pokemon" id="image">
        </div>
        <div>
            <p>Height: <span id="height"><!-- --></span></p>
            <p>Weight: <span id="weight"><!-- --></span></p>
        </div>
        <div id="types">
            <!-- -->
        </div>
        <div>
            <button class="btn" id="btn-previous" data-action="get-previous">
                <i class="fas fa-arrow-left"></i>
            </button>
            <button class="btn" id="btn-next" data-action="get-next">
                <i class="fas fa-arrow-right"></i>
            </button>
        </div>
        <div>
            <input type="text" class="input" id="pokemon-input">
            <button class="btn" id="btn-search">
                <i class="fas fa-search"></i>
            </button>
        </div>
    </div>

    <div class="pokedex-secondary-panel">
        <div class="stat-bar">
            <p>HP</p>
            <div>
                <div class="bar">
                    <div class="bar bar-fill bar-fill-hp" id="stat-fill-hp"></div>
                </div>
                <p id="stat-value-hp"><!-- --></p>
            </div>
        </div>

        <div class="stat-bar">
            <p>Attack</p>
            <div>
                <div class="bar">
                    <div class="bar bar-fill bar-fill-attack" id="stat-fill-attack"></div>
                </div>
                <p id="stat-value-attack"><!-- --></p>
            </div>
        </div>

        <div class="stat-bar">
            <p>Defense</p>
            <div>
                <div class="bar">
                    <div class="bar bar-fill bar-fill-defense" id="stat-fill-defense"></div>
                </div>
                <p id="stat-value-defense"><!-- --></p>
            </div>
        </div>

        <div class="stat-bar">
            <p>Speed</p>
            <div>
                <div class="bar">
                    <div class="bar bar-fill bar-fill-speed" id="stat-fill-speed"></div>
                </div>
                <p id="stat-value-speed"><!-- --></p>
            </div>
        </div>

        <div class="stat-bar">
            <p>Special-Attack</p>
            <div>
                <div class="bar">
                    <div class="bar bar-fill bar-fill-sa" id="stat-fill-sa"></div>
                </div>
                <p id="stat-value-sa"><!-- --></p>
            </div>
        </div>

        <div class="stat-bar">
            <p>Special-Defense</p>
            <div>
                <div class="bar">
                    <div class="bar bar-fill bar-fill-sd" id="stat-fill-sd"></div>
                </div>
                <p id="stat-value-sd"><!-- --></p>
            </div>
        </div>
    </div>
</div>
</main>
`;
