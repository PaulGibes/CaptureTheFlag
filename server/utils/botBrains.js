const { User, Game, Queue } = require("../models");
const teamOnePositions = ["2-2", "3-3", "4-2"];
const teamTwoPositions = ["2-11", "3-10", "4-11"];


function compareTeamOnePositions(gameData, position){
    var result = false;
    var column = parseInt(position.subdocument(2, position.length));
    if(column > 6 ){
       if(gameData.teamTwo.find(user => user.position === position)){
        result = true;
       }
       if(gameData.bots.find(bot => bot.position === position && bot.team == 2)){
        result = true;
       }
    }
    
    return result;
}

function compareTeamTwoPositions(gameData, position){
    var result = false;
    var column = parseInt(position.subdocument(2, position.length));
    if(column < 7 ){
       if(gameData.teamOne.find(user => user.position === position)){
        result = true;
       }
       if(gameData.bots.find(bot => bot.position === position && bot.team == 1)){
        result = true;
       }
    }
    
    return result;
}

module.exports = {
  moveBot: function (gameData) {
    var flagOneTaken = gameData.flagTwo;
    var flagTwoTaken = gameData.flagTwo;
    var teamOne = [];
    var teamTwo = [];

// resolve for team one humans
    gameData.teamOne.forEach((player, index) => {
        teamOne.push(player.position);
        if(player.position == flagTwoTaken){
            flagTwoTaken = "taken";
            User.findOneAndUpdate(
                {
                  _id: player._id,
                },
                {
                  hasFlag: true,
                },
                {
                  new: true,
                }
              );
        }
        if(compareTeamOnePositions(gameData, player.position)){
            User.findOneAndUpdate(
                {
                  _id: player._id,
                },
                {
                  position: teamOnePositions[index],
                },
                {
                  new: true,
                }
              );
        }
    });
//resolve for team two humans
    gameData.teamTwo.forEach((player, index) => {
        teamOne.push(player.position);
        if(player.position == flagOneTaken){
            flagOneTaken = "taken";
            User.findOneAndUpdate(
                {
                  _id: player._id,
                },
                {
                  hasFlag: true,
                },
                {
                  new: true,
                }
              );
        }
        if(compareTeamTwoPositions(gameData, player.position)){
            User.findOneAndUpdate(
                {
                  _id: player._id,
                },
                {
                  position: teamTwoPositions[index],
                },
                {
                  new: true,
                }
              );
        }
    });
    
    var bots = [];
    gameData.bots.forEach((bot, index) => {
        if(bot.team == 1){

        }else{

        }
    })
    
    const newgame = Game.findByIdAndUpdate(gameData._id,{status: "tes"}).then((game) => {
        console.log(game._id)
    })

    return newgame;
  },
};
