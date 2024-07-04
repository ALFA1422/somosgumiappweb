@echo off
REM Navegar a la carpeta 'client'
cd client

REM Construir el proyecto en modo producción
ng build --configuration production --output-path dist --base-href /

REM Volver a la raíz del proyecto
cd ..

REM Copiar los archivos generados al directorio raíz del repositorio
xcopy client\dist\* .\ /E /H /C /I /Y

REM Hacer commit y push de los cambios
git add .
git commit -m "Update app content"
git push origin main
