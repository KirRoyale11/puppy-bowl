// Use the API_URL variable to make fetch requests to the API.
// Replace the placeholder with your cohort name (ex: 2109-UNF-HY-WEB-PT)
const cohortName = "2404-FTB-ET-WEB-AM";
const API_URL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}`;



const newPlayerForm = document.querySelector("#newPlayerForm");

const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-content");
const closeModal = document.querySelector("#close-modal");

modal.addEventListener("click", function(e){
  // closes modal when you click outside the content area of the modal
  console.log(e.target.classList)
  if(!e.target.classList.contains("modal-content") ){
    modal.classList.remove("modal-open")
    modalContent.classList.remove("modal-content-open");
    modalContent.innerHTML = ''
  }
})

/**
 * Fetches all players from the API.
 * @returns {Object[]} the array of player objects
 */
const fetchAllPlayers = async () => {
  try {
    // TODO
    /* Remember, if you're using the modal, when you create the details button,
    in th event handler, create functionality that adds the class 'modal-open' to the modal var and 'modal-content-open' to the
    modalContent var */
    const response = await fetch ("https://fsa-puppy-bowl.herokuapp.com/api/2404-FTB-ET-WEB-AM/players");

    const result = await response.json();

    // console.log(result);
    return result.data.players;

  }catch(err){
     console.error("Uh oh, trouble fetching players!", err);
  }
};

// const players = fetchAllPlayers();

/**
 * Fetches a single player from the API.
 * @param {number} playerId
 * @returns {Object} the player object
 */
const fetchSinglePlayer = async (playerId) => {
  try {
    // TODO
    const response = await fetch (`https://fsa-puppy-bowl.herokuapp.com/api/2404-FTB-ET-WEB-AM/players/${playerId}`)
    const result = await response.json();
    return result.data.player;
  } catch (err) {
    console.error(`Oh no, trouble fetching player #${playerId}!`, err);
  }
};

function createNewPlayerCards(players) {
    const newPlayerCard = players.map((player) => {
        const playerContainer = document.createElement("div");
        const playerInfo = document.createElement("p");
        const playerPhoto = document.createElement("img");
        playerPhoto.src = player.imageUrl;
        playerPhoto.alt = player.name;
        playerInfo.innerText = `Name: ${player.name}, Breed: ${player.breed}, ID: ${player.id}, Team: ${player.team}, Status: ${player.status}`;
        const singleInfoButton = document.createElement("button");
        singleInfoButton.innerText = "About Player";
        singleInfoButton.addEventListener("click", function () {
            renderSinglePlayer(player.id);
        });

        const removeButton = document.createElement("button");
        removeButton.innerText = "Remove Player from Roster";
        removeButton.addEventListener("click", function () {
            removePlayer(player.id);

        
        });
        playerContainer.appendChild(playerInfo);
        playerContainer.appendChild(playerPhoto);
        playerContainer.appendChild(singleInfoButton);
        playerContainer.appendChild(removeButton);
        return playerContainer;

});
return newPlayerCard;
render();
}

/**
 * Adds a new player to the roster via the API.
 * @param {Object} playerObj the player to add
 * @returns {Object} the player returned by the API
 */
const addNewPlayer = async (playerId) => {
  try {
    // TODO
    // fetchNewPlayer(playerId).appendChild(newPlayerCard);
    const response = await fetch(
        `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/players`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: playerName,
            breed: playerBreed,
          }),
        }
      );
      const result = await response.json();
      console.log(result);
  } catch (err) {
    console.error("Oops, something went wrong with adding that player!", err);
  }
};

/**
 * Removes a player from the roster via the API.
 * @param {number} playerId the ID of the player to remove
 */
const removePlayer = async (playerId) => {
    fetch('https://fsa-puppy-bowl.herokuapp.com/api/COHORT-NAME/players', {
        method: 'DELETE',
      });
      try {
        const response = await fetch(
          'https://fsa-puppy-bowl.herokuapp.com/api/COHORT-NAME/players/1',
          {
            method: 'DELETE',
          }
        );
        const result = await response.json();
        console.log(result);
        
    // TODO
    
  } catch (err) {
    console.error(
      `Whoops, trouble removing player #${playerId} from the roster!`,
      err
    );
  }
};

/**
 * Updates `<main>` to display a list of all players.
 *
 * If there are no players, a corresponding message is displayed instead.
 *
 * Each player is displayed in a card with the following information:
 * - name
 * - id
 * - image (with alt text of the player's name)
 *
 * Additionally, each card has two buttons:
 * - "See details" button that, when clicked, calls `renderSinglePlayer` to
 *    display more information about the player
 * - "Remove from roster" button that, when clicked, will call `removePlayer` to
 *    remove that specific player and then re-render all players
 *
 * Note: this function should replace the current contents of `<main>`, not append to it.
 * @param {Object[]} playerList - an array of player objects
 */
const renderAllPlayers = (playerList) => {
 // TODO
fetchAllPlayers(players);
 createNewPlayerCards(players);
render();

const mainElement = document.querySelector("main");
mainElement.innerHTML = "";

const playerCards = createNewPlayerCards(players);
playerCards.forEach(card => mainElement.appendChild(card));

 // when you add a event handler to the buttons, you need to pass an id of the player
 // to the function renderSinglePlayer or removePlayer
 /*
     ...your code(player=>{
      // more code...
        deleteButton.addEventListener("click", function(){
          removePlayer(player.id);
        })
      })

 */
};

/**
 * Updates `<main>` to display a single player.
 * The player is displayed in a card with the following information:
 * - name
 * - id
 * - breed
 * - image (with alt text of the player's name)
 * - team name, if the player has one, or "Unassigned"
 *
 * The card also contains a "Back to all players" button that, when clicked,
 * will call `renderAllPlayers` to re-render the full list of players.
 * @param {Object} player an object representing a single player
 */
const renderSinglePlayer = (player) => {
  // TODO
  createNewPlayerCards(player[Math.floor(Math.random()*players.length)]);
  render();
};

/**
 * Fills in `<form id="new-player-form">` with the appropriate inputs and a submit button.
 * When the form is submitted, it should call `addNewPlayer`, fetch all players,
 * and then render all players to the DOM.
 */
const renderNewPlayerForm = () => {
  try {
    // TODO
    newPlayerForm.addEventListener("submit", async function(e) {
        e.preventDefault();
        const newPlayer = {
            name: playerName.value,
            breed: playerBreed.value,
            id: playerId.value,
            status: playerStatus.value,
            team: playerTeam.value

        };
        const result = await addNewPlayer(newPlayer);
        console.log(result);
    });
    
  } catch (err) {
    console.error("Uh oh, trouble rendering the new player form!", err);
  }
};




/**
 * Initializes the app by fetching all players and rendering them to the DOM.
 */
const init = async () => {
  const players = await fetchAllPlayers();
  const player1 = await fetchSinglePlayer(players[0].id);
  console.log(player1);
  renderAllPlayers(players);

  renderNewPlayerForm();
};


init();