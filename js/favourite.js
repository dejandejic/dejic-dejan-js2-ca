var navMenuDiv = document.getElementById("nav-content");
var navMenu = document.getElementById("nav-toggle");

document.onclick = check;
function check(e) {
    var target = (e && e.target) || (event && event.srcElement);

    //Nav Menu
    if (!checkParent(target, navMenuDiv)) {
        if (checkParent(target, navMenu)) {
            if (navMenuDiv.classList.contains("hidden")) {
                navMenuDiv.classList.remove("hidden");
            } else {
                navMenuDiv.classList.add("hidden");
            }
        } else {
            navMenuDiv.classList.add("hidden");
        }
    }
}
function checkParent(t, elm) {
    while (t.parentNode) {
        if (t == elm) {
            return true;
        }
        t = t.parentNode;
    }
    return false;
}


let respArr = [];
let table = document.querySelector("#item_table")
function loadDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            respArr = JSON.parse(this.responseText)
            if (respArr.length > 0) {
                table.innerHTML = "";
                respArr.forEach((item, ind) => {
                    let row = '<tr class="text-gray-700">' +
                        '<td class="px-4 py-3 border">' +
                        '<div class="flex items-center text-sm">' +
                        '<div>' +
                        '<p class="font-semibold text-black">' + item.title + '</p>' +
                        // '<p class="text-xs text-gray-600">'+item.title+'</p>'+
                        '</div>' +
                        '</div>' +
                        '</td>' +
                        '<td class="px-4 py-3 text-ms font-semibold border">' + item.author + '</td>' +
                        '<td class="px-4 py-3 text-xs border">' +
                        '<span class="px-2 py-1 font-semibold leading-tight     rounded-sm">' + item.summary + '</span>' +
                        '</td>' +
                        '<td class="px-4 py-3 text-sm border"><i class="fas fa-heart cursor-pointer heart_' + item.id + '" title="Add to Favourite" onclick="addFvrt(\'' + 'heart_' + item.id + '\',\'' + item + '\')" ></i></td>' +
                        '</tr>';

                    table.innerHTML += row
                })
            }
        }
    };
    xhttp.open("GET", "http://localhost:1337/articles", true);
    xhttp.send();
}
// loadDoc();

let searchInput = document.querySelector('#search_input');
let clearAll = document.querySelector('#clear_all');
let heartIcon = '';
let fvrtArr = localStorage.getItem('fvrt') ? JSON.parse(localStorage.getItem('fvrt')) : []
setTimeout(() => {
    if (fvrtArr.length > 0) {

        table.innerHTML = ""
        fvrtArr.forEach(item => {
            let ele = document.querySelector(".heart_" + item.id);
            let row = '<tr class="text-gray-700">' +
                '<td class="px-4 py-3 border">' +
                '<div class="flex items-center text-sm">' +
                '<div>' +
                '<p class="font-semibold text-black">' + item.title + '</p>' +
                // '<p class="text-xs text-gray-600">'+item.title+'</p>'+
                '</div>' +
                '</div>' +
                '</td>' +
                '<td class="px-4 py-3 text-ms font-semibold border">' + item.author + '</td>' +
                '<td class="px-4 py-3 text-xs border">' +
                '<span class="px-2 py-1 font-semibold leading-tight     rounded-sm">' + item.summary + '</span>' +
                '</td>' +
                '<td class="px-4 py-3 text-sm border"><i class="fas fa-heart cursor-pointer text-red-600 heart_' + item.id + '" title="Add to Favourite" onclick="addFvrt(\'' + 'heart_' + item.id + '\',\'' + item + '\')" ></i></td>' +
                '</tr>';

            table.innerHTML += row
        })

    }
}, 1000);
clearAll.addEventListener('click', function(e){
    e.preventDefault();
    localStorage.removeItem('fvrt');
    table.innerHTML = '<tr class="text-gray-700">'+
                    '<td class="px-4 py-3 border" colspan="4">'+
                       ' <div class="flex items-center text-sm ">'+
                           ' <p class="font-semibold text-black text-center">There is no item available</p>'+
                        '</div>'+
                    '</td>'+
                '</tr>';
})

