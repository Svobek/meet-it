
var wyjazdy = [];
window.onload = getWyjazdy();
async function getWyjazdy() {
    var userid = sessionStorage.getItem("userId");
    try {
        let response = await fetch('https://localhost:7168/User/GetTrackNames?idUsers=' +userid, {
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
    var div5 = document.createElement('div');
    div5.className = 'info ilosc-osob';
    var div6 = document.createElement('div');
    div6.className = 'info opis';
    var div7 = document.createElement('div');
    div7.id = "lupa";
    div7.className = 'lupa';
    div.appendChild(div1);
    div1.appendChild(div2);
    div1.appendChild(div3);
    div1.appendChild(div4);
    div1.appendChild(div5);
    div1.appendChild(div6);
    div.appendChild(div7);
    wyjazdyDiv.appendChild(div);
    
}

async function getWyjazd(id) {
    
    
    let response = await fetch('https://localhost:7168/User/GetAllTrackPoints?idTrack=' + id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }
    )

        //let data12 = await response.json();
        //if (response.ok) {*/
        //create then and get data from response
    response.json()
        .then((data12) =>{ 
            console.log(data12);
            
            
            const orderPromises =  data12.forEach(point => {
                getPointInfo(point)
            }
            );
            Promise.all(orderPromises).then(() => {
                
                
            }, () => {
                setTimeout(() => {
                    window.location.href = "nowywyjazd.html", 10000
                });
                
                
            }
            );
            console.log(orderPromises);
            
        });
            
}



async function getPointInfo(point) {
    try {
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
                    return true;
                }
            } else {
                console.log("Geocoder failed due to: " + status);
                return false;
            }
        });
    }
    catch (error) {
        console.error('Error:', error);
        return false;
    }
}



   





//add event listener to wyjazd
document.getElementById('lista-wyjazdow').addEventListener('click', function (e) {
    var id = e.target.parentElement.parentElement.id;
    var nazwa = e.target.parentElement.children[0].innerHTML;
    sessionStorage.setItem("trackName", nazwa);
    if (id != "") {
        getWyjazd(id);
    }
});
















  
















