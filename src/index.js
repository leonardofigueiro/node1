import fs from 'fs'
import chalk from 'chalk';



function extraiLinks(texto) {
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm
    const capturas = [...texto.matchAll(regex)];
    const resultados = capturas.map(captura => ({[captura[1]]:captura[2]}))
    return resultados.length !== 0 ? resultados : 'Não há links no arquivo'
}




function trataErro(erro){
    throw new Error(chalk.red(erro.code,`O arquivo ou diretório não existe`))
}

    async function pegaArquivo(caminho) {
        const encoding = 'utf-8';
    try {
        const texto = await fs.promises.readFile(caminho, encoding)
        return extraiLinks(texto)
    } catch(error) {
        trataErro(chalk.red(error))
    }
}

export default pegaArquivo
//  \[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)