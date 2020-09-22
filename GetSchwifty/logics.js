document.getElementsByClassName("game")[0].onload=Init();

var boardsizer;

function Init()
{
    document.getElementsByClassName("gamecol")[0].innerHTML="";
    let btndiv=document.createElement("div");
    btndiv.className="col-lg-12 mt-4 ml-4 d-flex justify-content-center"
    let button = document.createElement("button");
    button.className="col-lg-3 mt-4 ml-4 btn btn-secondary startbtn d-flex justify-content-center";
    boardsizer=3;
    button.onclick=()=>CreateGame();
    button.innerHTML="Start";
    btndiv.appendChild(button);
    document.getElementsByClassName("gamecol")[0].appendChild(btndiv);
};

function CreateGame()
{
    GenerateGame();
    while(IsSolvable()==false)
    {
        console.log("Shit");
        GenerateGame();

    }
};

function GenerateGame()
{
    document.getElementsByClassName("gamecol")[0].innerHTML="";
    let btngroup = document.createElement("div");
    btngroup.className="row btn-group mt-4 ml-4 d-flex justify-content-center";
    btngroup.role="group";
    let usednums=[];
    for (let i =1;i<boardsizer*boardsizer+1;i++)
    {
        let button = document.createElement("button");
        button.className="col-lg-3 mt-4 ml-4 btn btn-secondary";
        let rnd = Math.floor(Math.random() * 9)+1;
        while(usednums.includes(rnd))
        {
            rnd = Math.floor(Math.random() * 9)+1;
        }
        usednums.push(rnd);
        if(rnd==9)
            button.innerHTML="";
        else
            button.innerHTML=rnd.toString();
        button.id=i.toString();
        button.onclick=()=>MakeMove(button);
        btngroup.appendChild(button);
    }
    document.getElementsByClassName("gamecol")[0].appendChild(btngroup);
}

function FindEmpty()
{
    for (var i=1;i<boardsizer*boardsizer+1;i++)
    {
        var t = document.getElementById(i.toString());
        if(t.innerText=="")
            return i;
    }
}

function SwapText(sourceid, empid)
{
        var temp = document.getElementById(sourceid.toString()).innerText;
        document.getElementById(sourceid.toString()).innerText="";
        document.getElementById(empid.toString()).innerText=temp;
};

function CheckWin()
{
    let count=0;
    for (var i=1;i<boardsizer*boardsizer;i++)
    {
        var t = document.getElementById(i.toString());
        if(t.innerText!=i.toString())
            count++;
        if(t.innerText==i.toString()){
            t.style.backgroundColor="green";
        }
    }
    if(count>0)
        return false;
    else
        return true;
}

function Winner(){
    if(IsSolvable()==false)
    {
        document.getElementsByClassName("gamecol")[0].innerHTML="";
        let header= document.createElement("h1");
        header.innerText="not solvable";
        document.getElementsByClassName("gamecol")[0].appendChild(header);
    }

    if(CheckWin()==true)
    {
        document.getElementsByClassName("gamecol")[0].innerHTML="";
        let header= document.createElement("h1");
        header.innerText="You won !";
        document.getElementsByClassName("gamecol")[0].appendChild(header);
    }
}

function MakeMove(buttonid)
{
    var emptyid=FindEmpty();
    var btnid=parseInt(buttonid.id);
    if(btnid-1>0&&(btnid-1)%boardsizer!=0)
        if(btnid-1==emptyid)
        {
            SwapText(btnid, emptyid);
        }
    if(btnid+1<=boardsizer*boardsizer&&(btnid+1)%boardsizer!=1)
        if(btnid+1==emptyid)
        {
            SwapText(btnid, emptyid);

        }
    if(btnid-boardsizer>=1)
        if(btnid-boardsizer==emptyid)
        {
            SwapText(btnid, emptyid);

        }
    if(btnid+boardsizer<=boardsizer*boardsizer)
        if(btnid+boardsizer==emptyid)
        {
            SwapText(btnid, emptyid);

        }
    Winner();
}

function IsSolvable()
{
    let count=0;
    let emptyid=FindEmpty();
    for (var i=1;i<boardsizer*boardsizer;i++)
    {
        for (j=i+1;j<boardsizer*boardsizer;j++)
        {
            if(i!=emptyid&&j!=emptyid) {
                if (parseInt(document.getElementById(i.toString()).innerText) > parseInt(document.getElementById(j.toString()).innerText))
                    count++;
            }
        }
    }
    if(boardsizer%2==0)
    {
        count+=FindEmpty();
    }
    if(count%2==0)
        return true;
    else
        return false;
}