const searchForm = document.querySelector("form");

const searchInput = document.querySelector(".search-input")


searchForm.addEventListener("submit", function (event){

    event.preventDefault();

    const query = searchInput.value.trim();

    if(query === ""){
        return "Invalid Query";

    }

    window.location.href = "https://www.google.com/search?q=" + encodeURIComponent(query);
});

function updateDigitalClock() {
            const now = new Date();
            
            // Format Time
            let hours = now.getHours();
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            const ampm = hours >= 12 ? 'PM' : 'AM';
            
            hours = hours % 12;
            hours = hours ? hours : 12; // Handle '0' as '12'
            const formattedHours = String(hours).padStart(2, '0');

            document.getElementById('digital-time').textContent = `${formattedHours}:${minutes}:${seconds} ${ampm}`;

            // Format Date
            const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
            document.getElementById('digital-date').textContent = now.toLocaleDateString('en-US', options);
        }

        // Run clock immediately and update every second
        updateDigitalClock();
        setInterval(updateDigitalClock, 1000);

const button = document.getElementById("add-shortcut");
const shortcutList = document.getElementById("shortcut-list");

const defaultShortcuts = [
    {
        url: "https://hackclub.com"
    },
    {
        url: "https://ysws.hackclub.com"
    },
    {
        url: "https://github.com"
    },
    {
        url: "https://stardance.hackclub.com"
    }
];

let shortcuts = JSON.parse(localStorage.getItem("shortcuts"));

if (!shortcuts) {
    shortcuts = defaultShortcuts;
    localStorage.setItem("shortcuts", JSON.stringify(shortcuts));
}


button.addEventListener("click", function () {

    const url = prompt("Enter website URL:");

    if (!url) {
        return;
    }

    let websiteURL = url.trim();

    if (!websiteURL.startsWith("http://") &&
        !websiteURL.startsWith("https://")) {

        websiteURL = "https://" + websiteURL;
    }

    shortcuts.push({
        url: websiteURL
    });

    localStorage.setItem(
        "shortcuts",
        JSON.stringify(shortcuts)
    );

    loadShortcuts();
});


function loadShortcuts() {

    shortcutList.innerHTML = "";

    shortcuts.forEach(function(shortcut, index) {

        const shortcutElement = document.createElement("div");

        shortcutElement.className = "shortcut";

        shortcutElement.innerHTML = `
            <a href="${shortcut.url}" target="_blank">
                <img
                    src="https://www.google.com/s2/favicons?domain=${shortcut.url}&sz=64"
                    alt="SHORTCUT"
                >
            </a>

            <button class="remove-shortcut" type="button">×</button>
        `;

        const removeButton =
            shortcutElement.querySelector(".remove-shortcut");

        removeButton.addEventListener("click", function() {

            shortcuts.splice(index, 1);

            localStorage.setItem(
                "shortcuts",
                JSON.stringify(shortcuts)
            );

            loadShortcuts();
        });

        shortcutList.appendChild(shortcutElement);
    });
}


loadShortcuts();