# Minesweeper

**Вы также можете прочитать этот README на [русском](https://github.com/klekwedge/minesweeper/blob/main/README.md)**

## Table of contents

- [Deployment instructions](#deployment-instructions)
- [Overview](#overview)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
- [Author](#author)

## Deployment instructions

**To run the project, you need to have [npm](https://nodejs.org/en/) and [git](https://git-scm.com/downloads) installed on your computer**

1. Make a clone of this repository ```git clone https://github.com/klekwedge/minesweeper.git```
2. Install all required npm packages with ```npm i```
3. Run the project with the command ```npm run dev```

## Overview

It is necessary to write a Minesweeper game using HTML, CSS, JavaScript and the attached sprite.

#### Requirements:

- field 16x16 cells, 40 min;
- on the left is a min counter from 40 to zero, on the right is a stopwatch
- mines are placed randomly;
- the first click should never be on a mine;
- if there are other fields with no mines nearby next to an open field, they open automatically;
- the right key puts a flag - this is how the place where the mine is supposed to be is marked;
- if you right-click on the flag, the question is raised, again - the selection is removed;
- click on the emoticon restarts the game;
- frightened emoticon - the user has clicked on the field, but has not yet released the mouse button;
- after losing, the emoticon is replaced by a sad one, the user is shown a map of mines;
- after the user has opened all the fields except mines, the smiley puts on sunglasses, the stopwatch stops.

There are no restrictions on technologies, libraries and frameworks.

### Screenshot

![Main screen](./preview/screenshot.png)

### Links

- [Solution URL](https://github.com/klekwedge/minesweeper)
- [Live Site URL](https://klekwedge-minesweeper.vercel.app/)

## My process

### Built with

- React
- TypeScript
- SCSS
- Chakra UI

### What I learned

## Author

- [Website](https://klekwedge-cv.vercel.app/)
- [Linkedin](https://www.linkedin.com/in/klekwedge/)
- [Facebook](https://www.facebook.com/klekwedge)

