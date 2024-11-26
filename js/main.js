var siteName = document.getElementById('siteName');
var siteUrl = document.getElementById('siteUrl');
var dataShow = document.getElementById('dataShow');

var siteList = [];
if(localStorage.getItem('site'))
{
    siteList = JSON.parse(localStorage.getItem('site'))
    display();
}
function addSite()
{
    if(siteUrlTest())
    {
    var siteObj = {
        id:Date.now(),
        sName:siteName.value,
        sUrl:siteUrl.value,
    } 
    siteList.push(siteObj)
    localStorage.setItem('site',JSON.stringify(siteList))
    display();
    clearFull();
    }
}

function display(list=siteList)
{
    var box = '';
    for(var i = 0; i < list.length; i++)
    {
        box += `<table class="table text-center my-0">
                    <thead>
                        <tr>
                            <td class="col-3">${i+1}</td>
                            <td class="col-3  text-capitalize">${list[i].sName}</td>
                            <td class="col-3">
                                <div class="btn-group">
                                    <a href="https://${list[i].sUrl}" target="_blank" id="btn" class="btn btn-primary"><i class="fa-solid fa-eye pe-1"></i>Visit</a>
                                </div>
                            </td>
                            <td class="col-3"><button type="button" id="btn2" class="btn btn-primary" onclick=(deleteSite(${list[i].id}))>Delete</button></td>
                        </tr>
                    </thead>
                </table>`
    }
    dataShow.innerHTML = box;
}

function deleteSite(id)
{
    siteList = siteList.filter(function(el){return el.id !== id});
    localStorage.setItem('site', JSON.stringify(siteList));
    display();
}

function clearFull()
{
    siteName.value = null;
    siteUrl.value = null;
}

function siteUrlTest()
{
    var regex = /^(www\.)[a-z]{1,}\D+(\.com)$/;
    if(regex.test(siteUrl.value))
    {
        siteUrl.classList.add('is-valid');
        siteUrl.classList.remove('is-invalid');
        return true;
    }
    else
    {
        siteUrl.classList.add('is-invalid');
        siteUrl.classList.remove('is-valid');
        return false;
    }
}