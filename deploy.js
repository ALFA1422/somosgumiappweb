const { exec } = require('child_process');
const path = require('path');

// Ruta al proyecto Angular
const clientDir = path.join(__dirname, 'client');

// Función para ejecutar comandos
function runCommand(command, cwd = __dirname) {
    return new Promise((resolve, reject) => {
        exec(command, { cwd }, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing command: ${command}`, error);
                reject(error);
            } else {
                console.log(`Output for command: ${command}`, stdout);
                if (stderr) console.error(`Stderr for command: ${command}`, stderr);
                resolve(stdout);
            }
        });
    });
}

async function deploy() {
    try {
        // Construir el proyecto Angular
        console.log('Building Angular project...');
        await runCommand('ng build --configuration production --output-path dist --base-href /', clientDir);

        // Copiar los archivos generados a la raíz del proyecto
        console.log('Copying generated files...');
        await runCommand('xcopy client\\dist\\* .\\dist /E /H /C /I /Y');

        // Hacer commit y push de los cambios
        console.log('Adding changes to git...');
        await runCommand('git add .');
        console.log('Committing changes...');
        await runCommand('git commit -m "Update app content"');
        console.log('Pulling latest changes from GitHub...');
        await runCommand('git pull --rebase');
        console.log('Pushing to GitHub...');
        await runCommand('git push origin main');

        console.log('Deployment complete!');
    } catch (error) {
        console.error('Deployment failed:', error);
    }
}

deploy();
