<p align="center">
<img src="./img/hare.jpg" alt="black hare" width="250">
</p>
<p align="center">
<img src="https://travis-ci.org/raulfdm/blackhare-boilerplate.svg?branch=master" alt="black hare">
</p>


# Black Hare
> An easy way to build fast a web project from scratch!


## Why
Every time when I need to create an web project (without any js framework), I use to save some gists containing boilerplate files like gulpfile with all the tasks to optimize CSS, JS, HTML, images, live reload server also folder structure that is the same in all my project.

So, I decide to create a **Command-line user Interface (CLI)** to generate this file easily. 

## Technologies
This boilerplate uses the followings technologies:
- Template Engine: PUG (ex Jade)
- CSS: PostCSS 
- Reset CSS: Meyer Version
- JS Transpile: BabelJS
- Task Runner: Gulp
- Server Live Reload: BrowserSync
- Package Manager: Yarn or NPM (You decide)

## How-to
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
