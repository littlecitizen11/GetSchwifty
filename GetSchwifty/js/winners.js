function allStorage() {

    let values = [],
        keys = Object.keys(localStorage),
        i = keys.length;

    while ( i-- ) {
        values.push( JSON.parse(localStorage.getItem(keys[i])));
    }

    return values;
}


function compare(a, b) {
    if (a.time > b.time) return 1;
    if (b.time > a.time) return -1;

    return 0;
}

function CreateTable(){
    let users = allStorage();
    users.sort(compare);

    document.getElementsByClassName("winnercol")[0].innerHTML="";
    let headerdiv = document.createElement("div");
    headerdiv.className="row mt-4 d-flex justify-content-center";
    let header=document.createElement("h2");
    header.innerText="Winners";
    headerdiv.appendChild(header);
    document.getElementsByClassName("winnercol")[0].appendChild(headerdiv);
    let table = document.createElement("table");
    table.className="table table-hover";
    let theads= document.createElement("thead");
    let theadtr =document.createElement("tr");
    let th=document.createElement("th");
    th.innerText="User"
    theadtr.appendChild(th);
    th=document.createElement("th");
    th.innerText="Date"
    theadtr.appendChild(th);
    th=document.createElement("th");
    th.innerText="Time (ms)"
    th=document.createElement("th");
    th.innerText="Board Size"
    theadtr.appendChild(th);
    theads.appendChild(theadtr);
    table.appendChild(theads);
    let tbody = document.createElement("tbody");
    let tr;
    for(let i=0;i<users.length&&i<5;i++)
    {
        tr = document.createElement("tr")
        th = document.createElement("th");
        th.innerText=users[i].username;
        tr.appendChild(th);
        th = document.createElement("th");
        th.innerText=users[i].date;
        tr.appendChild(th);
        th = document.createElement("th");
        th.innerText=users[i].time;
        tr.appendChild(th);
        tbody.appendChild(tr);
        th = document.createElement("th");
        th.innerText=users[i].boardsize;
        tr.appendChild(th);
        tbody.appendChild(tr);
    }
    tbody.appendChild(tr);
    table.appendChild(tbody);
    document.getElementsByClassName("winnercol")[0].appendChild(table);
}

CreateTable();