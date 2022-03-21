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

## Commencer à utiliser le projet

### Prérequis

Java version 11.

### Téléchargement

Vous devez récupérer une version du générateur sur votre machine pour l'utiliser :
voir les _Releases_ dans
<a href="https://github.com/Zhykos/deno-server-openapi-generator/releases">GitHub</a>.

## Utilisation du projet

*Aide basée de la documentation officielle <a href="https://github.com/OpenAPITools/openapi-generator">OpenAPI Generator</a>. Pour plus d'informations, n'hésitez pas à lire cette page.*

After downloading the JAR, run java -jar openapi-generator-cli.jar help to show the usage.

Exemple pour générer l'exemple habituel (du monde OpenAPI) ***PetStore*** :
```
java -jar <CHEMIN>/openapi-generator-cli.jar generate \
  -i https://raw.githubusercontent.com/openapitools/openapi-generator/master/modules/openapi-generator/src/test/resources/3_0/petstore.yaml \
  -g deno-oak \
  -o <CHEMIN_CIBLE>
```

## Feuille de route

L'objectif principal serait d'avoir une version plus propre, voire plus stable, afin de l'intégrer au projet officiel OpenAPI Generator.

Ce projet est développé sur mon temps libre et je n'en ai pas énormément...

Vérifiez la page [open issues](https://github.com/Zhykos/deno-server-openapi-generator/issues) pour
voir la liste des évolutions et des bugs.

## Contribuer au projet

### Initialiser un espace de travail

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

<!-- CONTACT -->

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