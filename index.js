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