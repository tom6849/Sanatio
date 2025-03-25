Réalisé Par Alexis Lambert En 2025.
Permet le lancement d'un projet react-native sur l'ecosysteme informatique de l'IUT de Nantes.

# Installation des applications `React Native` sur les postes de l'IUT

Ce wiki fournis une procédure détaillé de l'installation de l'application.  

## Installation d'une VM
Nous allons utiliser une VM Ubuntu 24.04. 

1. Ouvrir un terminal et taper `exit` pour se placer dans le terminal `Silverblue`
2. Taper cette commande pour créer la VM avec `distrobox` :

```bash
distrobox create --name ubuntu-24-04 --image ubuntu:24.04 --additional-packages "nano git" -I -Y
```

3. Accédez à la VM, cela peut prendre un peut de temps :

```bash
distrobox enter ubuntu-24-04
```

## Création d'un script pour charger les variables d'environnement

```bash
cat <<EOF > "$HOME/.bashrc.d/ubuntu-24-04.sh"
#!/bin/bash

if [[ "$CONTAINER_ID" == "ubuntu-24-04" ]] && [ -f "$HOME/.bashrc_ubuntu-24-04" ]; then
    source "$HOME/.bashrc_ubuntu-24-04"
fi
EOF

chmod +x $HOME/.bashrc.d/ubuntu-24-04.sh
```

## Configuration du proxy
À l'IUT il y a un proxy et le conteneur n'en dispose pas automatiquement.\
\
Entrer les commandes suivantes pour le renseigner :

```bash
echo '
# Proxy settings
export HTTP_PROXY="http://srv-proxy-etu-2.iut-nantes.univ-nantes.prive:3128"
export HTTPS_PROXY="http://srv-proxy-etu-2.iut-nantes.univ-nantes.prive:3128"
export FTP_PROXY="http://srv-proxy-etu-2.iut-nantes.univ-nantes.prive:3128"
export NO_PROXY="localhost,127.0.0.1,::1"
' | tee -a /etc/bash.bashrc

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
Nous allons installer le JDK 20, entrez cette commande :

```bash
cd ~
wget https://download.oracle.com/java/20/archive/jdk-20.0.2_linux-x64_bin.deb
sudo apt install ./jdk-20.0.2_linux-x64_bin.deb -y
rm jdk-20.0.2_linux-x64_bin.deb
echo '
# JAVA_HOME
export JAVA_HOME="/usr/lib/jvm/jdk-20"
export PATH=$JAVA_HOME/bin:$PATH
' | sudo tee -a $HOME/.bashrc_ubuntu-24-04
source $HOME/.bashrc_ubuntu-24-04
```

## Installation de Android Studio

Un des problèmes majeur de l'architecture de l'IUT est que l'ensemble des applications sont conteneurisées via flatpak depuis Fedora. Cela empêche différents service de se joindre car ils ne sont donc pas dans le même réseau. Le but est de créer un Android Studio dans notre VM afin que celui puisse voir le serveur.

Installation de Android Studio :

```bash
cd ~
wget "https://r1---sn-gxo5uxg-jqbl.gvt1.com/edgedl/android/studio/ide-zips/2024.3.1.13/android-studio-2024.3.1.13-linux.tar.gz"
tar -xvzf android-studio-2024.3.1.13-linux.tar.gz
rm android-studio-2024.3.1.13-linux.tar.gz
cd android-studio/bin
chmod +x studio.sh
sudo apt update
sudo apt full-upgrade -y
sudo apt install libglib2.0-bin libcanberra-gtk-module libcanberra-gtk3-module libpulse0 libnss3 libxkbfile1 libxcb-xinerama0 libxcb-cursor0 libx11-xcb1 libxcb1 qt5-qmake qtbase5-dev qtchooser qt5-qmake-bin libxcb1-dev libx11-6 libvulkan1 ninja-build -y
sudo apt install tzdata --reinstall
./studio.sh
```

L'interface peut vous demander de configurer le proxy : \
\
Manual proxy configuration :
```bash
Host name: srv-proxy-etu-2.iut-nantes.univ-nantes.prive
Port number: 3128
```

### Installation du Android SDK et configuration des variables d'environnement
Dans Android Studio, en haut à droite : **Roue crantée > SDK Manager...**
Vérifiez que **Android SDK Location** est bien **/var/home/(VOTRE USER ICI)/Android/Sdk**, par exemple :
*/var/home/E222451U/Android/Sdk*.
Installez le SDK que vous souhaitez.
Puis allez dans la section **SDK Tools** et cochez :
- Android SDK Build-Tools 36
- NDK (Side by side)
- Android SDK Command-line Tools (latest)
- CMake
- Android Emulator
- Android SDK Platform-Tools

Puis OK, continuez l'installation.

Ensuite, fermer Android Studio et éxecutez dans le terminal :

```bash
echo '
# ANDROID VARIABLES
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$ANDROID_HOME/emulator:$ANDROID_HOME/tools:$ANDROID_HOME/tools/bin:$ANDROID_HOME/platform-tools:$PATH
export ANDROID_AVD_HOME=$HOME/.config/.android/avd
' | tee -a $HOME/.bashrc_ubuntu-24-04
source $HOME/.bashrc_ubuntu-24-04
```

## Installation de `Node`
Ensuite nous installerons `node`.  \
\
*Exécutez chaque blocs de commandes séparement.* \
\
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

Et également donner le droit d'éxecution au fichier `gradlew`. N'oubliez pas de mettre le bon path pour le fichier (/mobile/android/) :
```bash
chmod +x gradlew
```

# Lancement de l'application

dans /mobile/android : npm install, npm start

appuyer sur a dans Metro pour lancer l'application

# Erreurs potentielles

**Erreur 1 :**\
\
```ninja: error: manifest 'build.ninja' still dirty after 100 tries```

Lorsque l'on tente de build l'application avec **react-native run-android** il est possible que le build échoue avec cette erreur si on regarde de plus près. 

**Solution**

En général il s'agit du paquet **react-native-screens** qui fait des siennes et on peut résoudre le problème en supprimant le dossier *node_modules/react-native-screens/android/.cxx*. Parfois, relancer le build permet également de résoudre le problème.

```rm -r /(CHEMIN VERS LE DOSSIER)/mobile/node_modules/react-native-screens/android/.cxx```
