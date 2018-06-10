How to start:
npm install http-server -g
http-server . -o

A brief description of how you approached the task:
First of all, I created empty models for all required elements from the game (Game, Playfield, Row, Field, Ant);
After that, I started to add functionality to all models.
At the end, I created the verbose mode.

A brief description of the solution idea that you used and why:
My idea was to use models and to elimante direct DOM manipulation.
Because of that, I created models for each required element and to make them work idependently.
Each model contains properties with different game states and the dom element for itself.
Game model is the one in controll of all other elements.
Games are started from main.js

Explanation of the used data structures:
Each model contains properties with game states and a dom element.


TODO: Use Promise for delay :)