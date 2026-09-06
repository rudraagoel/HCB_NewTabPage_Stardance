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
            // document.getElementById('digital-date').textContent = now.toLocaleDateString('en-US', options);
        }

  
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





const calendarCard = document.getElementById("calendar-card");




calendarCard.addEventListener("click", function () {
    calendarCard.classList.toggle("calendar-flipped");
});


function generateCalendar() {

    const now = new Date();

    const year = now.getFullYear();
    const month = now.getMonth();
    const date = now.getDate();



    const weekdayNames = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];

    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];




    document.getElementById("calendar-date").textContent =
        String(date).padStart(2, "0");

    document.getElementById("calendar-day").textContent =
        weekdayNames[now.getDay()];

    document.getElementById("calendar-month-year").textContent =
        `${monthNames[month]}/${year}`;


 
    const calendarDays =
        document.getElementById("calendar-days");

    calendarDays.innerHTML = "";


 

    let firstDay =
        new Date(year, month, 1).getDay();

    firstDay =
        firstDay === 0
            ? 6
            : firstDay - 1;




    const daysInMonth =
        new Date(year, month + 1, 0).getDate();


    let currentDay = 1;



    for (let row = 0; row < 6; row++) {

        const tr = document.createElement("tr");


        for (let column = 0; column < 7; column++) {

            const th = document.createElement("th");

            const position =
                row * 7 + column;



            if (
                position >= firstDay &&
                currentDay <= daysInMonth
            ) {

                th.textContent = currentDay;

                th.classList.add("calendar-day");


            

                if (currentDay === date) {

                    th.classList.add(
                        "calendar-today"
                    );

                }


                currentDay++;
            }


            tr.appendChild(th);
        }


        calendarDays.appendChild(tr);



        if (currentDay > daysInMonth) {
            break;
        }
    }
}




generateCalendar();





const newsLink = document.getElementById("news-link");
const newsImage = document.getElementById("news-image");
const newsTitle = document.getElementById("news-title");
const newsCategory = document.getElementById("news-category");
const newsMeta = document.getElementById("news-meta");

const fallbackImage =
    "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1000&auto=format&fit=crop";




const bingNewsRSS =
    "https://www.bing.com/news/search?q=technology&format=rss";




const newsAPI =
    "https://api.rss2json.com/v1/api.json?rss_url=" +
    encodeURIComponent(bingNewsRSS);




async function loadNews() {

    try {

        const response =
            await fetch(newsAPI);

        if (!response.ok) {

            throw new Error(
                `HTTP ${response.status}`
            );

        }


        const data =
            await response.json();


        console.log("News:", data);


        if (
            data.status !== "ok" ||
            !data.items ||
            data.items.length === 0
        ) {

            throw new Error(
                "No news articles found"
            );

        }




        const article =
            data.items[0];


        newsTitle.textContent =
            article.title ||
            "Latest technology news";


    

        newsLink.href =
            article.link ||
            "https://www.bing.com/news";


       
        let source =
            article.author ||
            "BING NEWS";


        newsCategory.textContent =
            source.toUpperCase();


        

        if (article.pubDate) {

            const published =
                new Date(article.pubDate);

            const now =
                new Date();

            const minutes =
                Math.max(
                    0,
                    Math.floor(
                        (now - published) / 60000
                    )
                );


            let timeText;


            if (minutes < 1) {

                timeText =
                    "Just now";

            } else if (minutes < 60) {

                timeText =
                    `${minutes} min ago`;

            } else if (minutes < 1440) {

                const hours =
                    Math.floor(
                        minutes / 60
                    );

                timeText =
                    `${hours}h ago`;

            } else {

                const days =
                    Math.floor(
                        minutes / 1440
                    );

                timeText =
                    `${days}d ago`;

            }


            newsMeta.textContent =
                `${source} • ${timeText}`;

        } else {

            newsMeta.textContent =
                source;

        }


     

        let image =
            article.thumbnail;


      

        if (!image && article.enclosure) {

            if (article.enclosure.link) {

                image =
                    article.enclosure.link;

            }

        }


        newsImage.src =
            image || fallbackImage;


        newsImage.onerror =
            function () {

                newsImage.src =
                    fallbackImage;

            };


    } catch (error) {

        console.error(
            "Could not load news:",
            error
        );


        newsTitle.textContent =
            "Unable to load latest news";

        newsCategory.textContent =
            "NEWS";

        newsMeta.textContent =
            "News service unavailable";

        newsImage.src =
            fallbackImage;

        newsLink.href =
            "https://www.bing.com/news";

    }
}




loadNews();



setInterval(
    loadNews,
    10 * 60 * 1000
);




const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const todoCount = document.getElementById("todo-count");



let todos = [];

const savedTodos = localStorage.getItem("myTodoList");

if (savedTodos !== null) {
    todos = JSON.parse(savedTodos);
}



function saveTodos() {

    localStorage.setItem(
        "myTodoList",
        JSON.stringify(todos)
    );

}



todoForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const text = todoInput.value.trim();

    if (text === "") {
        return;
    }


    todos.push({
        id: Date.now(),
        text: text,
        completed: false
    });


    saveTodos();

    todoInput.value = "";

    renderTodos();

});




function renderTodos() {

    todoList.innerHTML = "";


    if (todos.length === 0) {

        todoList.innerHTML = `
            <div class="todo-empty">
                Nothing here yet.
            </div>
        `;

        updateTodoCount();

        return;
    }


    todos.forEach(function (todo) {

        const item =
            document.createElement("div");

        item.className = "todo-item";


        if (todo.completed) {
            item.classList.add("completed");
        }


        const checkbox =
            document.createElement("input");

        checkbox.type = "checkbox";

        checkbox.className =
            "todo-checkbox";

        checkbox.checked =
            todo.completed;


        const text =
            document.createElement("span");

        text.className =
            "todo-text";

        text.textContent =
            todo.text;


        const deleteButton =
            document.createElement("button");

        deleteButton.type = "button";

        deleteButton.className =
            "todo-delete";

        deleteButton.textContent = "×";



        checkbox.addEventListener(
            "change",
            function () {

                todo.completed =
                    checkbox.checked;

                saveTodos();

                renderTodos();

            }
        );



        deleteButton.addEventListener(
            "click",
            function () {

                todos =
                    todos.filter(function (task) {

                        return task.id !== todo.id;

                    });

                saveTodos();

                renderTodos();

            }
        );


        item.appendChild(checkbox);
        item.appendChild(text);
        item.appendChild(deleteButton);

        todoList.appendChild(item);

    });


    updateTodoCount();

}




function updateTodoCount() {

    const remaining =
        todos.filter(function (todo) {

            return !todo.completed;

        }).length;


    if (remaining === 0) {

        todoCount.textContent =
            "All tasks completed";

    } else if (remaining === 1) {

        todoCount.textContent =
            "1 task remaining";

    } else {

        todoCount.textContent =
            `${remaining} tasks remaining`;

    }

}



renderTodos();