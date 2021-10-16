let data = ['apple', 'acorn', 'bee', 'beet', 'beef', 'bunny', 'cookie',
    'corn', 'corndog', 'dog', 'dogma', 'echo', 'elephant'];


document.addEventListener("DOMContentLoaded", init);

function init() {
    let input = document.getElementById('input');

    // the data array is stored as value in localstorage of the browser
    localStorage.setItem("keys", JSON.stringify(data));

    //
    let delay = 300;
    let betterFunction = debounce(getData, delay);
    // add the event
    input.addEventListener("input", betterFunction);


}



function debounce(func, delay) {
    let timeout = undefined; // common variable for all

    return function (event) {

        // during that delay time if a new call is made clear the earlier one
        // precede with the new one
        clearTimeout(timeout);
        //make a call after a specific delay
        timeout = setTimeout(() => {
            func.call(window, event);
        }, delay);
    }
}

function getData(event) {
    search(event.target.value)
        .then((matches) => {
            let ul = document.getElementById("display");
            ul.innerHTML = "";

            if (matches.length === 0) {
                ul.textContent = "no result found";
            } else {
                let df = new DocumentFragment();
                matches.forEach((item) => {
                    let li = document.createElement("li");
                    li.textContent = item;
                    df.appendChild(li);
                })
                ul.appendChild(df);
            }
        })


}

function search(value) {

    let r = Math.floor(Math.random() * 1000);

    return new Promise((resolve, reject) => {
        // get data from local storage

        setTimeout(()=> {
            let data = JSON.parse(localStorage.getItem("keys"));
        let pattern = '^' + value;
        let regex = new RegExp(pattern, "i");

        // fiter out the result
        let matches = data.filter((item) => {
            return regex.test(item);
        });
        console.log(matches);
        resolve(matches);
        })
    })
}



// fetch is replaced with other async code

// what's happening inside debouncing fn is 
// a timeout to execute the function that we passed but if in between another call 
//comes earlier one is cleared if it wasnot executed within the period

