import pegaArquivo from "./index.js";
import chalk from 'chalk'
import fs from 'fs'

//método para informar um caminho
const caminho = process.argv;

function imprimeLista(resultado, arquivo = '') {
    console.log(chalk.yellow('lista de links no arquivo'), chalk.black.bgGreen(arquivo),resultado)   

}
async function processaTexto(argumentos) {
    const caminho = argumentos[2]

    try {
        fs.lstatSync(caminho)
    } catch (erro) {
        if (erro.code === 'ENOENT') {
            console.log('Arquivo ou diretório não existe')
            return
        }
    }

    if (fs.lstatSync(caminho).isFile()) {
        const resultado = await pegaArquivo(caminho)
        imprimeLista(resultado, caminho)
    } else if (fs.lstatSync(caminho).isDirectory()) {
        const arquivos = await fs.promises.readdir(caminho)
        arquivos.forEach(async arquivo => {
            const lista = await pegaArquivo(`${caminho}/${arquivo}`)
            imprimeLista(lista, arquivo)
        })
    }

}


processaTexto(caminho)