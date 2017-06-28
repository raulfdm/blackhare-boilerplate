<p align="center">
<img src="https://github.com/raulfdm/blackhare-boilerplate/blob/develop/img/hare.jpg?raw=true" alt="black hare" width="250">
</p>
<p align="center">
<img src="https://travis-ci.org/raulfdm/blackhare-boilerplate.svg?branch=master" alt="black hare">
<a href="https://david-dm.org/raulfdm/blackhare-boilerplate" title="dependencies status"><img src="https://david-dm.org/raulfdm/blackhare-boilerplate/status.svg"/></a>
</p>


# Black Hare Boilerplate
> An easy way to build fast a web project from scratch!


## Why
Every time when I need to create an web project (without any js framework), I use to save some gists containing boilerplate files like gulpfile with all the tasks to optimize CSS, JS, HTML, images, live reload server also folder structure that is the same in all my project.

So, I decide to create a **Command-line user Interface (CLI)** to generate this file easily. 

## Technologies
This boilerplate uses the followings technologies:
- Template Engine: [PugJS](https://pugjs.org/) (ex Jade)
- CSS: 
  - Tooling: [PostCSS](http://postcss.org/)
  - Reset CSS: [Meyer Version](https://meyerweb.com/eric/tools/css/reset/)
- JS Transpiller: [BabelJS](https://babeljs.io/)
- Task Runner: [Gulp](http://gulpjs.com/)
- Server Live Reload: [BrowserSync](https://www.browsersync.io/)
- Package Manager: [Yarn](https://yarnpkg.com/) or [NPM](https://www.npmjs.com/) (You decide)

## How To
For the best use, you should install globally:
```sh
npm i -g blackhare
```

After this, create your new project with the following command:
```sh
blackhare new
```

Answer the questions:
1. What is your project name? (default: my-project)
1. What is the version of this project? (default: 0.0.1)
1. Choose the package manager: NPM or YARN (default: Yarn)
1. Confirm project informations (default: Yes)

Than, your project will be generate and all dependencies will be installed!

## Versioning

To keep better organization of releases we follow the [Semantic Versioning 2.0.0](http://semver.org/) guidelines.

## License
[MIT License](https://github.com/raulfdm/blackhare-boilerplate/blob/master/LICENSE.md) © [Raul de Melo](https://rauldemelo.com.br/)
