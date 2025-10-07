export default async function getEnderecoByCep(cep){
    let response = new Object()
    const url = `https://viacep.com.br/ws/${cep}/json/`
    await fetch(url)
    .then((response) => response.json())
    .then((endereco) => {
        response.endereco = {
            cep: cep,
            logradouro: endereco.logradouro,
            bairro: endereco.bairro,
            uf: endereco.uf,
            cidade: endereco.localidade
        }
    })
    .catch((error) => {
        console.log(`${error.code} = ${error.message}`)
        response.error = error.message
    })

    return response
}