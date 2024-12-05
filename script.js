const busca = document.getElementById('search')
const numeroCep = document.getElementById('cepNumber')

busca.addEventListener('click', fetch(`https://viacep.com.br/ws/${numeroCep}/json`).then(response => console.log(response)))