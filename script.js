const busca = document.getElementById('search')
const numeroCep = document.getElementById('cepNumber')

busca.addEventListener('click', () => buscacep(numeroCep))

function buscacep(cep){
    fetch(`https://viacep.com.br/ws/${cep}/json`)
    .then(response => attForm(response))
}

function attForm(location){
    
}