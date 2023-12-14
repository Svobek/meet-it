
var wyjazdy = [];
window.onload = getWyjazdy();
async function getWyjazdy() {
    var userid = sessionStorage.getItem("userId");
    try {
        let response = await fetch('https://meet-it.azurewebsites.net/User/GetTrackNames?idUsers=' +userid, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
        }
        );

        let data = await response.json();
        if (response.ok) {
            for (var i = 0; i < data.length; i++) {
                createWyjazdDiv(data[i]);
            }
        }

    }
    catch (error) {
        console.error('Error:', error);
    }
}
//create wyjazd in div rekord
function createWyjazdDiv(wyjazd) {
    var wyjazdyDiv = document.getElementById('lista-wyjazdow');
var div = document.createElement('div');
    div.className = 'pasek';
    div.id = wyjazd.idTrack;
    var div1 = document.createElement('div');
    div1.className = 'kat';
    var div2 = document.createElement('div');
    div2.className = 'info cel-wyjazdu';
    div2.innerHTML = wyjazd.name;
    var div3 = document.createElement('div');
    div3.className = 'info data-wyjazdu';
    div3.innerHTML = wyjazd.date;
    var div4 = document.createElement('div');
    div4.className = 'info miejsce-wyjazdu';
    div4.innerHTML = wyjazd.fPointName;
    var div6 = document.createElement('div');
    div6.className = 'info opis';
    div6.innerHTML = wyjazd.opis;
    //check if wyjazd.date is today
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;

    }
    today = yyyy + '-' + mm + '-' + dd;
    if (today == wyjazd.date) {
        div.style.backgroundColor="red";
    }

    

    div.appendChild(div1);
    div1.appendChild(div2);
    div1.appendChild(div3);
    div1.appendChild(div4);
    div1.appendChild(div6);
    
    wyjazdyDiv.appendChild(div);
    
}

async function getWyjazd(id) {
    
    
    let response = await fetch('https://meet-it.azurewebsites.net/User/GetAllTrackPoints?idTrack=' + id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }
    );
    let data12 = await response.json();
    console.log(data12);

    const orderPromises = data12.map(point => getPointInfo(point));
    console.log(orderPromises);
    await Promise.all(orderPromises).then(() => {
        console.log("done");
        window.location.href = "nowywyjazd.html";
    });

    
   
}
    

function getPointInfo(point) {
    return new Promise((resolve, reject) => {
        var geocoder = new google.maps.Geocoder();
        var latlng = new google.maps.LatLng(point.points.xParm, point.points.yParm);
        geocoder.geocode({ 'latLng': latlng }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[1]) {
                    var markersArray = sessionStorage.getItem("markersArray");
                    if (markersArray == null) {
                        markersArray = [];
                    }
                    else {
                        markersArray = JSON.parse(markersArray);
                    }
                    console.log(results[1].address_components.length);
                    for (var i = 0; i < results[1].address_components.length; i++) {
                        var addressType = results[1].address_components[i].types[0];
                        if (addressType === 'country') {
                            var kraj = results[1].address_components[i].long_name;
                        } else if (addressType === 'locality') {
                            var miasto = results[1].address_components[i].long_name;
                        } else if (addressType === 'route') {
                            var ulica = results[1].address_components[i].long_name;
                        } else if (addressType === 'postal_code') {
                            var kod = results[1].address_components[i].long_name;
                        }
                    }
                    
                    markersArray.push(
                        {
                            'nazwa': point.points.pointName,
                            'kraj': kraj,
                            'miasto': miasto,
                            'adres': ulica,
                            'kod': kod,
                            'punkt': { lat: point.points.xParm, lng: point.points.yParm },
                            'cena': point.pointValues.price,
                            'data': point.pointValues.date,
                            'godzina': point.pointValues.time
                        });
                    sessionStorage.setItem("markersArray", JSON.stringify(markersArray));
                    console.log(markersArray);
                    resolve(true);
                }
            } else {
                console.log("Geocoder failed due to: " + status);
                reject(false);
            }
        });
    }
    );

    
}

//window onload clear markersArray in session storage
window.onload = sessionStorage.removeItem("markersArray");

   





//add event listener to wyjazd
document.getElementById('lista-wyjazdow').addEventListener('click', function (e) {
    var id = e.target.parentElement.parentElement.id;
    var nazwa = e.target.parentElement.children[0].innerHTML;
    sessionStorage.setItem("trackName", nazwa);
    sessionStorage.setItem("opis", e.target.parentElement.children[4].innerHTML);
    if (id != "") {
        getWyjazd(id);
    }
});
















  
















