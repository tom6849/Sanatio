
# 🛠️ Préparation de l'environnement de développement – Sanatio (React Native)

Ce guide vous accompagne dans la configuration de votre environnement de développement **React Native** pour l'application **Sanatio**, que vous soyez sur **Linux** ou **Windows**.

---

## 🔗 Prérequis communs

- Node.js (version recommandée ≥ 18)
- npm ou yarn
- Un éditeur de code (ex: [VS Code](https://code.visualstudio.com/))
- Git

---

## 🐧 Linux

### ☕ Java (version 17 recommandée)

#### 📥 Installation

**Debian / Ubuntu**
```bash
sudo apt-get install openjdk-17-jdk
```

**Fedora**
```bash
sudo dnf install -y java-17-openjdk
sudo dnf install -y java-17-openjdk-devel
```

#### ✅ Vérification
```bash
java -version     # → openjdk version "17.X.X"
javac -version    # → javac 17.X.X
```

#### 🔄 Configuration de JAVA_HOME

Dans `~/.bashrc` ou `~/.zshrc` :
```bash
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk
export PATH=$JAVA_HOME/bin:$PATH
```

---

### 📱 Android Studio

1. Installez Android Studio : [Instructions officielles](https://developer.android.com/studio/install#linux)
2. Ajoutez Android Studio au `PATH` :
```bash
export PATH=/chemin/vers/android-studio/bin:$PATH
```

#### Configuration recommandée dans Android Studio

- **SDK Platforms** : cochez `Android 14.0 (UpsideDownCake)`
- **SDK Tools** :
  - `Android SDK Build-Tools` v34.0.0
  - `Android SDK Command-line Tools (latest)`
- Configurez un **AVD** avec API 34

#### Variables d'environnement Android

Ajoutez dans votre `~/.bashrc` ou `~/.zshrc` :

```bash
export ANDROID_HOME=/chemin/vers/android-sdk
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin
```

---

### ⚙️ Gradle

1. Téléchargez depuis [gradle.org/install](https://gradle.org/install/)
2. Décompressez dans `/opt/gradle`
3. Ajoutez dans `~/.bashrc` :
```bash
export GRADLE_HOME=/opt/gradle/gradle-X.X
export PATH=$GRADLE_HOME/bin:$PATH
```

---

## 🪟 Windows

### ☕ Java

1. Téléchargez [OpenJDK 17 (Adoptium)](https://adoptium.net/fr/temurin/releases/?version=17)
2. Installez et récupérez le chemin d'installation (ex: `C:\Program Files\Eclipse Adoptium\jdk-17`)
3. Ajoutez les variables d’environnement :
   - `JAVA_HOME` → vers le dossier d'installation de Java
   - Ajoutez `%JAVA_HOME%\bin` au `PATH`

### 📱 Android Studio

1. Installez Android Studio : [Instructions Windows](https://developer.android.com/studio/install)
2. Dans Android Studio :
   - Installez `Android SDK`, `Command-line Tools`, et `Build-Tools` v34.0.0
   - Dans l’onglet `SDK Platforms`, cochez `Android 14.0 (UpsideDownCake)`
   - Créez un AVD avec API 34

### 🧭 Variables d’environnement Android

Ajoutez dans les variables système :
- `ANDROID_HOME` → ex: `C:\Users\<Nom>\AppData\Local\Android\Sdk`
- Ajoutez au `PATH` :
  - `%ANDROID_HOME%\platform-tools`
  - `%ANDROID_HOME%\cmdline-tools\latest\bin`
  - `%ANDROID_HOME%\emulator`

### ⚙️ Gradle

1. Téléchargez Gradle ZIP : [https://gradle.org/install](https://gradle.org/install)
2. Décompressez dans `C:\Gradle`
3. Variables d’environnement :
   - `GRADLE_HOME` → `C:\Gradle\gradle-X.X`
   - Ajoutez `%GRADLE_HOME%\bin` au `PATH`

---

## 🚀 Lancer le projet React Native

1. Démarrez le serveur Metro :
```bash
npm start
```
2. Dans un autre terminal, lancez l’application :
```bash
npm run android
```
> ✅ L’émulateur Android se lance automatiquement.

---

## 🆘 En cas de problème

- Utilisez `npx react-native doctor` pour identifier les éléments manquants.
- Rechargez les fichiers de config :
```bash
source ~/.bashrc  # ou ~/.zshrc
```
