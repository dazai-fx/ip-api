

const fetchIPInfo = async (ip) => {
    try {
        console.log('ip introducida: '+ip);
        const res = await fetch(`http://ip-api.com/json/${ip}?fields=status,message,continent,continentCode,country,countryCode,region,regionName,city,district,zip,lat,lon,timezone,offset,currency,isp,org,as,asname,reverse,mobile,proxy,hosting,query`);
        return await res.json();
    } catch (err) {
        console.error(err);
        return null; // Manejar el error devolviendo `null`
    }
};

// método para evitar escribir la misma sentencia tantas veces como selectores tengamos
const $ = selector => document.querySelector(selector)

// En el nombre de las constantes: 
// el dolar delante sirve para indicar que es un elemento del DOM pero no es necesario.
const $form = $('#form')
const $input = $('#input')
const $submit = $('#submit')
const $results = $('#results')
const $divMyIp = $('#divMyIp')
const $submit2 = $('#submit2')
const $divMap = $('#divMap')

const startMap = (lat, long) => {
    
}

$submit.addEventListener('click', async (event) => {
    
    const {value} = $input
    if(!value) return 
    $submit.setAttribute('disabled', '')
    $submit.setAttribute('aria-busy', 'true')
    const ipInfo = await fetchIPInfo(value); 

    if(ipInfo){
        $results.innerHTML = JSON.stringify(ipInfo, null, 2)
    } else {
        $results.innerHTML = 'Error fetching IP information';
    }

    $submit.removeAttribute('disabled', '')
    $submit.removeAttribute('aria-busy', 'true')

})

$submit2.addEventListener('click', async (event) => {
    
    const myip = $divMyIp.innerHTML;

    if(myip=='') return
    $submit2.setAttribute('disabled', '')
    $submit2.setAttribute('aria-busy', 'true')
    const ipInfo = await fetchIPInfo(myip); 

    if(ipInfo){
        $results.innerHTML = JSON.stringify(ipInfo, null, 2)
    } else {
        $results.innerHTML = 'Error fetching IP information';
    }

    $submit2.removeAttribute('disabled', '')
    $submit2.removeAttribute('aria-busy', 'true')
    $input.value = myip;

})

fetch('https://api.ipify.org?format=json')
  .then(response => response.json())
  .then(data => {
    $divMyIp.innerHTML=data.ip
    $divMyIp.style.display="none"
  })
  .catch(error => console.error('Error al obtener mi IP:', error));