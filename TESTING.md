# Part 3 - Testing  
## Names
Friedrich Amouzou, fram6578  
Anna-Sophia Wolniewicz, aswolniewicz  
Katherine Best, Serenaise  
Kathryn Osborn, kateosborn10  
  
## Project Title  
Captan Cool  

## Vision  
We want to introduce people to coding in a less intimidating way.  

## Game Testing  
For this project, we're using Jasmine to test our javascript. Because we are making a game, Jasmine is only testing invisible functions, and arrays that are not displayed. The rest is implimented in the game itself, such as having the character react as they encounter a wall, or having collisions displayed in the feed below the canvas. As it is a game, most actions are tested in the game itself.  
To run the automated testing, just open SpecRunner.html. 
![alt text](https://github.com/aswolniewicz/captainCool/blob/master/img/testing_screenshot.png "Picture of our testing environment.")  
## User Acceptance Tests  
### Test 1  
#### Use case name  
Verify that the player can interact with collidables.  
#### Description  
Walk into the wall in game.  
#### Pre-conditions  
User is able to open the html in the file system.  
#### Test steps  
1) Load the html page.  
2) Use wasd to walk into wall.  
#### Expected result  
Character informs player they cannot go further, and they cannot walk through the wall.  
#### Actual result  
Character is unable to walk through the wall, and does react with the encounter.  
#### Status (Pass/Fail)    
Pass  
#### Notes  
N/A  
#### Post-conditions  
Throughout the players experience, they will not be able to phase through obsticals.  
### Test 2  
#### Use case name  
Verify the character can walk through doors.  
#### Description  
Test that doors bring you to a seperate room.  
#### Pre-conditions  
User is able to open the html in the file system.  
#### Test steps  
1) Load the html page.  
2) Use wasd to walk into the door on the far right.  
#### Expected result  
The character walks through the door and enters the next room.  
#### Actual result  
The character walks through door and enters a different colored room.  
#### Status (Pass/Fail)    
Pass  
#### Notes  
N/A  
#### Post-conditions  
User is able to interact with the room they just entered.  
### Test 3  
#### Use case name  
Verify interaction with objects in game.  
#### Description  
Have the characte interact with a blue square.  
#### Pre-conditions  
User is able to open the html in the file system.  
#### Test steps  
1) Load the html page.  
2) Use wasd to walk into the blue box on the bottom right.  
#### Expected result  
User walks into box, and character reacts.  
#### Actual result  
Character walks into box, and the character asks what the box is.  
#### Status (Pass/Fail)    
Pass  
#### Notes  
N/A  
#### Post-conditions  
User is able to interact with objects within the game that aren't obsticals.  
