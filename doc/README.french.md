<p align="center">
  <img src="./images/logo.png" alt="Logo" width="100" height="100" />
  <h2 align="center">🦖 Deno oak 🌳</h2>
  <h3 align="center">OpenAPI Generator</h3>
  <br />
  <p align="center">
    <i>Implémentation d'un générateur OpenAPI basé sur Deno et le middleware oak</i>
    <br />
    <a href="https://github.com/Zhykos/deno-server-openapi-generator/blob/main/README.md"><strong>English documentation »</strong></a>
    <br />
    <br />
    <a href="https://github.com/Zhykos/deno-server-openapi-generator/issues">Reporter un bug</a>
    ·
    <a href="https://github.com/Zhykos/deno-server-openapi-generator/issues">Proposer une évolution</a>
  </p>
</p>
<br />

[![Workflow][workflow-shield]][workflow-url]
[![MIT License][license-shield]][license-url]
[![Issues][issues-shield]][issues-url]
[![Stable release][release-stable-shield]][release-url]

## Table des matières

TODO

- [À propos du projet](#à-propos-du-projet)
- [Commencer à utiliser le projet](#commencer-à-utiliser-le-projet)
  - [Prérequis](#prérequis)
  - [Installation](#installation)
- [Utilisation du projet](#utilisation-du-projet)
- [Feuille de route](#feuille-de-route)
- [Contribuer au projet](#contribuer-au-projet)
- [Licence](#licence)
- [Contact](#contact)

## À propos du projet

**Deno oak OpenAPI Generator** vous permet de générer un serveur auto-configuré, basé sur <a href="https://deno.land">Deno</a> et le middleware <a href="https://github.com/oakserver/oak">oak</a>, à partir d'une spécification <a href="https://swagger.io/specification/">OpenAPI</a>.

Projet basé sur <a href="https://github.com/OpenAPITools/openapi-generator">OpenAPI Generator</a> version 5.4 : on ajoute un générateur de serveur.

### Contexte personnel

J'ai eu envie d'apprendre TypeScript et Deno, deux technologies que je trouve intéressantes. C'est au détour d'un projet professionnel que j'ai encore découvert des projets avec une API mais où le code est totalement écrit à la main (dans un contexte Spring). Pour moi, les projets devraient toujours définir ses API via OpenAPI, puis générer le code. C'est via ce simple contexte et ma volonté d'apprendre que j'ai mixé Deno, oak, TypeScript et OpenAPI Generator pour créer ce projet.

## Générer le code d'un serveur basé sur Deno et oak

### Prérequis

Java version 11 : à récupérer sur le site de l'<a href="https://openjdk.java.net/projects/jdk/11/">OpenJDK</a>, mais vous pouvez prendre une autre implémentation.

### Téléchargement

Vous devez récupérer une version du générateur sur votre machine pour l'utiliser :
voir les _Releases_ dans
<a href="https://github.com/Zhykos/deno-server-openapi-generator/releases">GitHub</a>.

Télécharger alors un fichier ***openapi-generator-cli.jar*** dans la version que vous souhaitez (la plus récente est bien sûr recommandée). Vous pouvez vérifier l'authenticité du fichier grâce au <a href="https://fr.wikipedia.org/wiki/SHA-2#SHA-256">hash SHA-256</a> fourni dans un fichier à côté.

### Génération

*Aide basée de la documentation officielle <a href="https://github.com/OpenAPITools/openapi-generator">OpenAPI Generator</a>. Pour plus d'informations, n'hésitez pas à lire cette page.*

Après avoir téléchargé le fichier JAR, vous pouvez lancer la commande `java -jar openapi-generator-cli.jar help` pour prendre connaissance des options de lancement.

Exemple pour générer l'exemple ***PetStore*** proposé par <a href="https://petstore.swagger.io">OpenAPI</a> :
```
mkdir petstore-server-deno-oak/
java -jar openapi-generator-cli.jar generate \
  -i https://petstore.swagger.io/v2/swagger.json \
  -g deno-oak \
  -o petstore-server-deno-oak/
```

Adaptez bien sûr les chemins du JAR et du dossier cible de la génération (précisé par l'option `-o`) selon vos besoins.

## Lancer un serveur Deno oak généré

### Prérequis

Deno : à récupérer sur le <a href="https://deno.land">site officiel</a>.

### Implémentation du code nécessaire et obligatoire

#### Les services

Cette section est plus détaillée dans le paragraphe lié à l'architecture du code générée, mais dans un premier temps, vous avez juste à savoir que chaque mot clé (*tag*) du fichier de description OpenAPI permet de définir un service, c'est une façon de ranger le métier en groupes logiques.

Ainsi une interface est générée par regroupement et il vous faudra implémenter ces services. Vous les trouverez dans le dossier `services` généré.

L'exemple du ***PetStore*** génère trois services :

```
$ ls -l services/ --hide=*Private*
total 12
-rwxr-xr-x 1 Zhykos Aucun 2079 22 mars  19:26 PetService.ts
-rwxr-xr-x 1 Zhykos Aucun 1011 22 mars  19:26 StoreService.ts
-rwxr-xr-x 1 Zhykos Aucun 1740 22 mars  19:26 UserService.ts
```

Chaque service a alors plusieurs méthodes à implémenter correspondant à ce qui a été décrit dans le fichier OpenAPI. Reportez vous au <a href="https://petstore.swagger.io">site contenant l'exemple</a> si vous voulez plus de détails.

Vous pouvez également découvrir ces mêmes services que j'ai implémentés pour des besoins de tests unitaires, sur le dépôt <a href="https://github.com/Zhykos/deno-server-openapi-generator/tree/main/samples/server/petstore/deno/oak/tests/petstore">GitHub</a> du projet.

#### Initialisation et lancement du serveur

Une fois que vos services ont été codés, vous pourrez les fournir à la méthode d'initialisation et de démarrage du serveur Deno oak. Vous devrez également fournir le port d'écoute du serveur.

Voici un exemple avec les trois services implémentés et un serveur sur le port 3000 :

```typescript
import { DenoOakServer } from "./DenoOakServer.ts";
import { MyPetService } from "./MyPetService.ts";
import { MyStoreService } from "./MyStoreService.ts";
import { MyUserService } from "./MyUserService.ts";

const myPetService = new MyPetService();
const myStoreService = new MyStoreService();
const myUserService = new MyUserService();

new DenoOakServer(3000, myPetService, myStoreService, myUserService).start();
```

Vous pouvez ensuite lancer le serveur avec la ligne de commande suivante (à adapter en fonction du nom du fichier et des <a href="https://deno.land/manual/getting_started/permissions">options de sécurité Deno</a>):

```
deno run --allow-net MyGeneratedServerDenoOak.ts
```

## Architecture du code généré

TODO

## Utiliser un autre middleware que oak

TODO

## Feuille de route

L'objectif principal serait d'avoir une version plus propre, voire plus stable, afin de l'intégrer au projet officiel OpenAPI Generator.

Ce projet est développé sur mon temps libre et je n'en ai pas énormément...

Vérifiez la page [open issues](https://github.com/Zhykos/deno-server-openapi-generator/issues) pour
voir la liste des évolutions et des bugs.

## Contribuer au projet

Vous souhaitez tester, développer, contribuer à ce projet ? Suivez les étapes suivantes.

### Initialiser un espace de travail

TODO

#### Prérequis

NodeJS : à récupérer sur le <a href="https://nodejs.org/">site officiel</a>.

#### Script d'initialisation

TODO

#### Structure du projet

TODO

### Lancer les tests

Voici les démarches pour lancer les tests.

#### Prérequis

Java version 11 : à récupérer sur le site de l'<a href="https://openjdk.java.net/projects/jdk/11/">OpenJDK</a>, mais vous pouvez prendre une autre implémentation.

NodeJS : à récupérer sur le <a href="https://nodejs.org/">site officiel</a>.

#### Logiciel recommandé

TODO Postman

#### Lancement des tests unitaires Java

TODO

#### Lancement des tests unitaires Postman

TODO

### Envoyer votre contribution

Vos contributions font que la communauté _open source_ est un endroit incroyable
pour apprendre, créer et partager. Toute contribution sera grandement appréciée,
d'autant plus que je n'ai que très peu de temps à m'y consacrer.

1. _Forkez_ le projet
2. Créez une branche pour la correction ou fonctionnalité
   (`git checkout -b feature/AmazingFeature`)
3. _Commitez_ vos modifications (`git commit -m 'Add some AmazingFeature'`)
4. Poussez la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une _Pull Request_ sur la page Github du projet

## Licence

TODO

Projet distribué avec la licence AGPL-3.0. Ouvrez le fichier `LICENSE` pour plus
d'informations.

## Contact

Thomas "Zhykos" Cicognani - github@tomtom.email

Lien du projet :
[https://github.com/Zhykos/deno-server-openapi-generator](https://github.com/Zhykos/deno-server-openapi-generator)

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/Zhykos/deno-server-openapi-generator.svg?style=for-the-badge
[contributors-url]: https://github.com/Zhykos/deno-server-openapi-generator/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Zhykos/deno-server-openapi-generator.svg?style=for-the-badge
[forks-url]: https://github.com/Zhykos/deno-server-openapi-generator/network/members
[stars-shield]: https://img.shields.io/github/stars/Zhykos/deno-server-openapi-generator.svg?style=for-the-badge
[stars-url]: https://github.com/Zhykos/deno-server-openapi-generator/stargazers
[issues-shield]: https://img.shields.io/github/issues/Zhykos/deno-server-openapi-generator.svg?style=for-the-badge&logo=GitHub
[issues-url]: https://github.com/Zhykos/deno-server-openapi-generator/issues
[license-shield]: https://img.shields.io/github/license/Zhykos/deno-server-openapi-generator.svg?style=for-the-badge
[license-url]: https://github.com/Zhykos/deno-server-openapi-generator/blob/main/LICENSE.txt
[workflow-shield]: https://img.shields.io/github/workflow/status/Zhykos/deno-server-openapi-generator/CI?style=for-the-badge&logo=Node.js
[workflow-url]: https://github.com/Zhykos/deno-server-openapi-generator/actions/workflows/node.js.yml
[release-url]: https://github.com/Zhykos/deno-server-openapi-generator/releases
[release-draft-shield]: https://img.shields.io/badge/Release-DRAFT-orange?style=for-the-badge