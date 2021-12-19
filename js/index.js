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
loadDoc();

let searchInput = document.querySelector('#search_input');
let searchBtn = document.querySelector('#search_btn');
let heartIcon = ''
searchBtn.addEventListener('click', function (e) {
    e.preventDefault()
    let val = searchInput.value
    table.innerHTML = "";
    let result = respArr.filter(item => {
        return item.title.toLowerCase().includes(val.toLowerCase());
    })
     
    if (result.length > 0) {
        result.forEach(item => {
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
                '<td class="px-4 py-3 text-sm border"><i class="fas fa-heart"></i></td>' +
                '</tr>';
            table.innerHTML += row
        })
    }
    else {
        table.innerHTML = '<tr class="text-gray-700">' +
            '<td class="px-4 py-3 border" colspan="4">' +
            ' <div class="flex items-center text-sm ">' +
            ' <p class="font-semibold text-black text-center">There is no item available</p>' +
            '</div>' +
            '</td>' +
            '</tr>';
    }
})

let fvrtArr = localStorage.getItem('fvrt') ? JSON.parse(localStorage.getItem('fvrt')) : []
setTimeout(() => {
    fvrtArr.forEach(item => {
        let ele = document.querySelector(".heart_" + item.id);
        ele.classList.add("text-red-600")
    })

}, 1000);

function addFvrt(node) {
    let ele = document.querySelector("." + node);
    let item_id = parseInt(node.slice(node.length - 1));
    debugger;
    if (!ele.classList.contains('text-red-600')) {
        let item = respArr.filter(ele => ele.id === item_id)
        ele.classList.add('text-red-600');
        fvrtArr.push(...item)
        localStorage.setItem('fvrt', JSON.stringify(fvrtArr))
    } else {

        ele.classList.remove('text-red-600');
        let newArr = fvrtArr.filter(item => item.id !== item_id)
        fvrtArr = newArr;
        localStorage.setItem('fvrt', JSON.stringify(fvrtArr))

    }

}

