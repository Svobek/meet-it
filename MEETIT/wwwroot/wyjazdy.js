
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
    try {
        let response = await fetch('https://localhost:7168/User/GetAllTrackPoints?idTrack=' + id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
    }
    );

    let data = await response.json();
    if (response.ok) {
        console.log(data);
        var markersArray = [];
        for (var i = 0; i < data.length; i++){
            var dane = await getPointInfo(data[i].points.xParm, data[i].points.yParm);
            console.log(dane);
            markersArray.push(
                {
                    'nazwa': data[i].points.pointName,
                    'kraj': dane.kraj,
                    'miasto': dane.miasto,
                    'adres': dane.adres,
                    'kod': dane.kod,
                    'punkt': {lat:data[i].points.xParm, lng:data[i].points.yParm},
                    'cena': data[i].pointValues.price,
                    'data': data[i].pointValues.date,
                    'godzina': data[i].pointValues.time
                });
        }
        sessionStorage.setItem("markersArray", JSON.stringify(markersArray));
        console.log(markersArray);
        window.location.href = "nowywyjazd.html";
    }

    }
    catch (error) {
console.error('Error:', error);
    }
}


   
//create function to get info about point from long and lat using goole maps api
function getPointInfo(lat, lng) {
    var geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(lat, lng);
    geocoder.geocode({ 'latLng': latlng }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            if (results[1]) {
                var adres = results[1].formatted_address;
                var kod = results[1].address_components[6].long_name;
                var miasto = results[1].address_components[2].long_name;
                var kraj = results[1].address_components[5].long_name;
                
                var dane = { adres: adres, kod: kod, miasto: miasto, kraj: kraj }
               
                return dane;
            }
        } else {
            console.log("Geocoder failed due to: " + status);
        }
    });
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
















  
















