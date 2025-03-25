Réalisé Par Alexis Lambert En 2025.
Permet le lancement d'un projet react-native sur l'ecosysteme informatique de l'IUT de Nantes.

# Installation des applications `React Native` sur les postes de l'IUT

Ce wiki fournis une procédure détaillé de l'installation de l'application.  

## Installation d'une VM
Nous allons utiliser une VM Ubuntu 24.04. 

- 1. Ouvrir un terminal et taper `exit` pour se placer dans le terminal `Silverblue`
- 2. Taper cette commande pour créer la VM avec `distrobox` :

```bash
distrobox create --name ubuntu-24-04 --image ubuntu:24.04 --additional-packages "nano git" -I -Y
```

- 3. Accédez à la VM, cela peut prendre un peut de temps :

```bash
distrobox enter ubuntu-24-04
```

## Configuration du proxy
À l'IUT il y a un proxy et le conteneur n'en dispose pas automatiquement.\
Entrer les commandes suivantes pour le renseigner :

```bash
echo '
# Proxy settings
export HTTP_PROXY="http://srv-proxy-etu-2.iut-nantes.univ-nantes.prive:3128"
export HTTPS_PROXY="http://srv-proxy-etu-2.iut-nantes.univ-nantes.prive:3128"
export FTP_PROXY="http://srv-proxy-etu-2.iut-nantes.univ-nantes.prive:3128"
export NO_PROXY="localhost,127.0.0.1,::1"
' | sudo tee -a /etc/bash.bashrc

echo '
# Proxy settings
HTTP_PROXY="http://srv-proxy-etu-2.iut-nantes.univ-nantes.prive:3128"
HTTPS_PROXY="http://srv-proxy-etu-2.iut-nantes.univ-nantes.prive:3128"
FTP_PROXY="http://srv-proxy-etu-2.iut-nantes.univ-nantes.prive:3128"
NO_PROXY="localhost,127.0.0.1,::1"
' | sudo tee -a /etc/environment

echo '
# Proxy settings for APT
Acquire::http::Proxy "http://srv-proxy-etu-2.iut-nantes.univ-nantes.prive:3128";
Acquire::https::Proxy "http://srv-proxy-etu-2.iut-nantes.univ-nantes.prive:3128";
' | sudo tee /etc/apt/apt.conf.d/95proxy
```
## Installation du JDK
Nous allons installer le JDK 20.

```bash
cd ~
wget https://download.oracle.com/java/20/archive/jdk-20.0.2_linux-x64_bin.deb
sudo apt install ./jdk-20.0.2_linux-x64_bin.deb -y
rm jdk-20.0.2_linux-x64_bin.deb
echo '
# JAVA_HOME
export JAVA_HOME="/usr/lib/jvm/jdk-20"
export PATH=$JAVA_HOME/bin:$PATH
' | sudo tee -a /etc/bash.bashrc
source /etc/bash.bashrc
```
## Installation de `Node`
Ensuite nous installerons `node`.  
Exécutez chaque blocs de commandes séparement.  
Premièrement :
```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
```

Ensuite :
```sh
bash
```

Puis :
```sh
nvm install --lts
npm i npm@latest -g
```

Vous pouvez vérifier que tout est installé en exécutant :
```sh
node -v
npm -v
```
## Configuration du proxy dans le projet android/ios
Ne pas oublier de mettre le proxy dans le fichier `gradle.properties` dans le dossier `android` **ET/OU** `ios` :

```properties
systemProp.http.proxyHost=srv-proxy-etu-2.iut-nantes.univ-nantes.prive
systemProp.http.proxyPort=3128
systemProp.https.proxyHost=srv-proxy-etu-2.iut-nantes.univ-nantes.prive
systemProp.https.proxyPort=3128
```

Et également donner le droit d'éxecution au fichier `gradlew`. N'oubliez pas de mettre le bon path pour le fichier :
```bash
chmod +x gradlew
```