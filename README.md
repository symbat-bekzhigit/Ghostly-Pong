# Ghostly Pong

Ghostly Pong is a modification of Ping Pong game where, instead of playing with 1 disk, the players play with 2, and the disks will keep periodically disappearing and reappearing during the game, just like a ghost.

**Link to the Game:** https://editor.p5js.org/symbatb/sketches/LKhQtZmjB

**Game features:**

- Each player will have a paddle and an individual score counter.
- Players must hit the disk with their corresponding paddles, if they miss the disk, their opponents will score a point.
- Players can move the paddle only vertically (along the initially specified y-axis).
- Paddles will be in rectangular shape, the disc will be in circular shape.
- The control key for the player 1 will be “W” and “S” keys, for the player 2 – “UP” and “DOWN” keys.
- The first player to score 10 points wins.

***
![](bin/img1.jpeg)

**Game design:**

There are different classes for Disk, Paddle, and Game objects. Each of these classes contains corresponding functions that aim at displaying the object, updating the coordinates, making the object move, and perform other features unique to the object. Every time a new game starts, new instances of these objects would be created.

Also, the game consists of 4 stages: Welcome page, Instructions page, Game, Game Over page. The draw() function will draw will display different screens based on the stage we’re in. Transitions from one stage to another is usually handled by the mouse click.

There are two separate functions for updating the screen when the player scores a goal or when the game is over: continueGame() get called when the disk enters one of the goals, hence in this function I create a new instances of only Disk objects. In the function restartGame(), I create a new instance of the whole Game, which in turn automatically creates new instances of Disk and Paddle objects.

The game will always have a background music, which will also change based on the game theme the user chooses. Moreover, the collision of the disk and the paddle, as well as the goals will be accompanied by different corresponding sounds (this can make the game a bit easier by giving some hints about the location of the disk when it disappears from screen).

***
![](bin/img1.jpeg)

**Aspects that I'm proud of:**

I’m proud of the good technical decision to create different classes for each of the Disk and Paddle objects, as this allowed me to easily create new instances of them, independently of each other, later in the game and to write a separate function on a global scope called ” Disk_Paddle_Contact(paddle, disk)” which takes instances of those classes and calculates whether there was a contact. I’m also proud of the good game design and the designs of the Welcome and Game Over pages.

***
![](bin/img1.jpeg)

**Ares for future improvements:**

Some people may find it hard to hit the disk as it constantly keeps disappearing. Therefore I decided to add some sound stimuli in terms of the collision sound and goal sound to help the user recognize when he/she scores a goal. One of the suggestions for future improvements would be making the paddles blink when the disk is nearby, thus sending some sort of a “hint” to the player of where the disk is located.

Another possible suggestion would be adding a volume slider for the game_display(), so that the user could control the intensity of a background music, and make it lower if it is too loud.
