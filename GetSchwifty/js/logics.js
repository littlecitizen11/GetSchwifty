class Initializer{
    constructor() {
    }
    Init(){
        document.getElementsByClassName("gamecol")[0].innerHTML="";
        let headerdiv = document.createElement("div");
        headerdiv.className="row mt-4 d-flex justify-content-center";
        let header=document.createElement("h3");
        header.innerText="Select Size";
        headerdiv.appendChild(header);
        let divuser = document.createElement("div");
        divuser.className="row divuser mt-4 d-flex justify-content-center";
        let label=document.createElement("label");
        label.htmlFor="username";
        label.innerText="EnterUserName";
        divuser.appendChild((label));
        let inputuser=document.createElement("input");
        inputuser.type="text";
        inputuser.id="username";
        inputuser.className="col-lg-2 form-control username";
        divuser.appendChild(inputuser);
        document.getElementsByClassName("gamecol")[0].appendChild(headerdiv);
        document.getElementsByClassName("gamecol")[0].appendChild(divuser);
        let selectordiv=document.createElement("div");
        selectordiv.className="row mt-4 d-flex justify-content-center"
        let input = document.createElement("select");
        input.id="selectboardsize";
        input.className="col-lg-1 selectboardsize form-control mt-4";
        for(let i=2;i<=10;i++)
        {
            let option=document.createElement("option");
            option.innerText=i.toString();
            input.appendChild(option);
        }
        selectordiv.appendChild(input);
        let button = document.createElement("button");
        button.className="col-lg-1 startbtn mt-4 btn btn-secondary ";
        button.onclick=()=>CreateGame();
        button.innerHTML="Start";
        selectordiv.appendChild(button);
        document.getElementsByClassName("gamecol")[0].appendChild(selectordiv);
    }
}


class User{
    constructor(username, timestart, boardsize, datestart) {
        this.username=username;
        this.timestart=timestart;
        this.boardsize=boardsize;
        this.datestart=datestart;
    }

}

let init= new Initializer();
var boardsizer;
document.getElementsByClassName("game")[0].onload=init.Init();
let user;

function CreateGame()
{
    boardsizer=parseInt(document.getElementById("selectboardsize").value);
    user = new User(document.getElementById("username").value, performance.now(), boardsizer,new Date().toLocaleDateString());

    GenerateGame();
    while(!IsSolvable()||CheckWin())
    {
        GenerateGame();
    }
}

function GenerateGame()
{
    document.getElementsByClassName("gamecol")[0].innerHTML="";

    let usednums=[];
    for (let i =1;i<boardsizer*boardsizer+1;i+=boardsizer)
    {
        //let row = document.createElement("row");
        let btngroup = document.createElement("div");
        btngroup.className="row mt-4";
        btngroup.role="group";
        for(let j=i;j<i+boardsizer;j++)
        {
        let button = document.createElement("button");
        button.className="col ml-3 mt-4 btn btn-secondary";
        let rnd = Math.floor(Math.random() * boardsizer*boardsizer)+1;
        while(usednums.includes(rnd))
        {
            rnd = Math.floor(Math.random() * boardsizer*boardsizer)+1;
        }
        usednums.push(rnd);
        if(rnd===boardsizer*boardsizer)
            button.innerHTML="";
        else
            button.innerHTML=rnd.toString();
        button.id=j.toString();
        button.onclick=()=>MakeMove(button);
        btngroup.appendChild(button);
        }
        //row.appendChild(btngroup);
        document.getElementsByClassName("gamecol")[0].appendChild(btngroup);

    }
    Winner();
}

function FindEmpty()
{
    for (let i=1;i<boardsizer*boardsizer+1;i++)
    {
        let t = document.getElementById(i.toString());
        if(t.innerText==="")
            return i;
    }
}

function SwapText(sourceid, empid)
{
        let temp = document.getElementById(sourceid.toString()).innerText;
        document.getElementById(sourceid.toString()).innerText="";
        document.getElementById(empid.toString()).innerText=temp;
}

function CheckWin()
{
    let count=0;
    for (let i=1;i<boardsizer*boardsizer;i++)
    {
        let t = document.getElementById(i.toString());
        if(t.innerText!==i.toString()) {
            count++;
            t.style.backgroundColor="#6c757d";
        }
        else {
            if (t.innerText === i.toString()) {
                t.style.backgroundColor = "green";
            }
        }
    }
    return count <= 0;
}

function Winner(){
    if(CheckWin()===true)
    {
/*
        document.getElementsByClassName("gamecol")[0].innerHTML="";
*/
        let header= document.createElement("h1");
        header.innerText="You won !";
        document.getElementsByClassName("gamecol")[0].appendChild(header);
        let obj={
            "username":(user.username),
            "time":(performance.now()-user.timestart),
            "boardsize":(user.boardsize),
            "date":user.datestart

        }
        localStorage.setItem(user.username,JSON.stringify(obj));

    }
}

function MakeMove(buttonid)
{
    let emptyid=FindEmpty();
    let btnid=parseInt(buttonid.id);
    if(btnid-1>0&&(btnid-1)%boardsizer!==0)
        if(btnid-1===emptyid)
        {
            SwapText(btnid, emptyid);
        }
    if(btnid+1<=boardsizer*boardsizer&&(btnid+1)%boardsizer!==1)
        if(btnid+1===emptyid)
        {
            SwapText(btnid, emptyid);

        }
    if(btnid-boardsizer>=1)
        if(btnid-boardsizer===emptyid)
        {
            SwapText(btnid, emptyid);

        }
    if(btnid+boardsizer<=boardsizer*boardsizer)
        if(btnid+boardsizer===emptyid)
        {
            SwapText(btnid, emptyid);

        }
    Winner();
}

function IsSolvable()
{
    let count=0;
    let emptyid=FindEmpty();
    for (let i=1;i<boardsizer*boardsizer;i++)
    {
        for (let j=i+1;j<=boardsizer*boardsizer;j++)
        {
            if(i!==emptyid&&j!==emptyid) {
                if (parseInt(document.getElementById(i.toString()).innerText) > parseInt(document.getElementById(j.toString()).innerText))
                    count++;
            }
        }
    }
    if(boardsizer%2===0)
    {
        count+=((emptyid-1)/boardsizer)+1;
    }
    return count % 2 === 0;
}