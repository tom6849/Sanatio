# Préparation de l'environnement de développement

Configurer l'environnement pour le développement d'une application React Native peut être une tâche relativement longue et fastidieuse. Ce guide vous accompagne dans la configuration de votre environnement pour développer l'application Sanatio sur Linux.

## LINUX

### Java
Il est nécessaire d’installer une version de Java comprise entre 17 et 20. Dans ce guide, nous prendrons l’exemple de la version 17.

#### Installation des packages
##### Fedora
```bash
dnf install -y java-17-openjdk
dnf install -y java-17-openjdk-devel
```

##### Debian / Ubuntu
```bash
apt-get install openjdk-17-jdk
```

##### Vérification de l’installation
```bash
java -version
```
> openjdk version "17.X.X"

```bash
javac -version
```
> javac 17.X.X

#### Configuration de JAVA_HOME
Dans le fichier `.bashrc`, ajoutez en haut du fichier la ligne suivante :
```bash
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk
```
Si l’emplacement de votre OpenJDK diffère de `/usr/lib/jvm/...`, modifiez le chemin en conséquence.

### Android Studio

React Native nécessite Android Studio pour construire et installer l’application sur Android. Vous en aurez également besoin pour installer le SDK Android, un émulateur, etc.

#### Étapes d’installation
1. Installez Android Studio en suivant les instructions disponibles sur le lien suivant : [Installation Android Studio](https://developer.android.com/studio/install#linux).
2. Dans votre fichier `.bashrc` (ou équivalent comme `.zshrc`), ajoutez le chemin vers le dossier `bin` d'Android Studio. Par exemple :
```bash
export PATH=/chemin/vers/android-studio/bin:$PATH
```

#### Configuration dans Android Studio
1. Installez un émulateur et configurez un appareil virtuel avec l’API Android 34, nommée "UpsideDownCake".
2. Dans les paramètres d'Android Studio, accédez à :
   - `Languages & Frameworks > Android SDK > SDK Tools`, cochez `Android SDK Command-line Tools (latest)` et vérifiez qu’il est bien marqué comme `Installed`.
   - `Languages & Frameworks > Android SDK > SDK Tools`, vérifiez que `Android SDK Build-Tools` version 34.0.0 est bien installé.
   - `Languages & Frameworks > Android SDK > SDK Platforms`, cochez `Android 14.0 ("UpsideDownCake")` et assurez-vous qu’il est noté comme `Installed`.
3. Récupérez dans `Languages & Frameworks > Android SDK` la valeur de `Android SDK Location`. Vous en aurez besoin pour la suite.

#### Configuration des chemins
Ajoutez les chemins suivants à votre fichier `.bashrc` (ou équivalent), en remplaçant `ANDROID_HOME` par la valeur obtenue de `Android SDK Location` :
```bash
export ANDROID_HOME=/chemin/vers/android-sdk
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin
```

### Gradle

#### Étapes d’installation
1. Suivez les instructions disponibles sur le site officiel : [Installation Gradle](https://gradle.org/install/).
2. Ajoutez les lignes suivantes à votre fichier `.bashrc` :
```bash
export GRADLE_HOME=/opt/gradle/gradle-VERSION
export PATH=$GRADLE_HOME/bin:$PATH
```

### React Native

#### Vérification avec Doctor
Exécutez la commande suivante :
```bash
npx react-native doctor
```
Si vous voyez une croix rouge à un endroit, consultez la section "En cas de problème".

#### Lancement du projet
1. Dans le répertoire du projet, ouvrez un terminal et lancez Metro avec la commande :
```bash
npm start
```
2. Dans un autre terminal, exécutez :
```bash
npm run android
```
L'émulateur que vous avez configuré dans Android Studio devrait s'ouvrir automatiquement.

### En cas de problème
Pour tout problème, contactez-moi directement à l’adresse [thomas.ambroise@etu.univ-nantes.fr](mailto:thomas.ambroise@etu.univ-nantes.fr) ou sur Discord (`mitoto`) si vous êtes sur Linux.