// Load games from games.json and build the game list
fetch("games.json")
    .then(response => response.json())
    .then(data => {
        const games = data.games || [];
        const gameList = document.getElementById("gameList");
        const playframe = document.getElementById("playframe");

        if (games.length === 0) {
            gameList.textContent = "No games available.";
            return;
        }

        games.forEach((game, index) => {
            const btn = document.createElement("button");
            btn.className = "game-button";
            btn.textContent = game.name;
            btn.addEventListener("click", () => {
                playframe.src = game.src;
            });
            gameList.appendChild(btn);

            // Load first game by default
            if (index === 0) {
                playframe.src = game.src;
            }
        });
    })
    .catch(err => {
        console.error("Error loading games.json:", err);
        document.getElementById("gameList").textContent =
            "Failed to load games.";
    });

// Request game modal logic
const requestBtn = document.getElementById("requestBtn");
const requestModal = document.getElementById("requestModal");
const closeRequest = document.getElementById("closeRequest");
const submitRequest = document.getElementById("submitRequest");
const requestName = document.getElementById("requestName");
const requestLink = document.getElementById("requestLink");
const requestStatus = document.getElementById("requestStatus");

requestBtn.addEventListener("click", () => {
    requestModal.classList.remove("hidden");
    requestStatus.textContent = "";
    requestName.value = "";
    requestLink.value = "";
});

closeRequest.addEventListener("click", () => {
    requestModal.classList.add("hidden");
});

submitRequest.addEventListener("click", () => {
    const name = requestName.value.trim();
    const link = requestLink.value.trim();

    if (!name) {
        requestStatus.textContent = "Please enter at least a game name.";
        return;
    }

    // For now we just show a message.
    // In the future you could send this to a backend or a Google Form.
    requestStatus.textContent =
        "Request saved locally (no server). Tell the site owner to check the console.";
    console.log("Game request:", { name, link });

    // Optional: auto-close after a short delay
    setTimeout(() => {
        requestModal.classList.add("hidden");
    }, 1200);
});
