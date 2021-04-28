// Create reply object
let replyObj = {};

// THING FOUND
replyObj.found = function(message, foundThing) {
    message.reply({
        embed: {
          color: "BLUE",
          description: '**' + foundThing.name + '** has **' + foundThing.karma + '** karma.'
        }
    }).catch(console.error);
};

// THING NOT FOUND
replyObj.notFound = function(message, thingName) {
    message.reply({
        embed: {
          color: "RED",
          description: `Thing, **${thingName}**, doesn\'t exist!\n
          You can create it with: \`sk new ${thingName}\`\n
          It could also exist under a different name.\n
          Use \`sk search <part of name>\` to see if it does.`
        }
    }).catch(console.error);
};

// KARMA CAPPED
replyObj.capped = function(message, thingName) {
    message.reply({
        embed: {
        color: "RED",
        description: `Thing, **${thingName}'s** karma is already **OVER 9000**!\n
        **${thingName}** doesn't need anymore.`
        }
    }).catch(console.error);
};

// CAN'T GIVE KARMA TO YOURSELF
replyObj.karmaYourselfError = function(message, thingName) {
    message.reply({
        embed: {
        color: "RED",
        description: `Thing, **${thingName}'s** karma is already **OVER 9000**!\n
        **${thingName}** doesn't need anymore.`
        }
    }).catch(console.error);
};

// NOT ENOUGH KARMA
replyObj.notEnoughKarma = function(message) {
    message.reply({
        embed: {
          color: "RED",
          description: `You have insufficient karma to use this command.`
        }
    }).catch(console.error);
};

// ERROR: MUST BE IN DATABASE
replyObj.userNotInDatabase = function(message, displayName) {
    message.reply({
        embed: {
          color: "RED",
          description: `You must be in the database to use this command.\n
          You can create yourself with: \`sk new @${displayName}\`.`
        }
    }).catch(console.error);
};

// DELETE TROLLED
replyObj.deleteTrolled = function(message, foundUser, foundThing) {
    message.reply({
        embed: {
        color: "BLUE",
        description: `**AN *"ERROR"* OCCURRED!**\n
        **${foundUser.name}'s** karma has been transferred to **${foundThing.name}**.\n
        **${foundThing.name}** has **${foundThing.karma}** karma.\n
        and **${foundUser.name.toUpperCase()}** has **NONE**.`
        }
    }).catch(console.error);
};

//  Export reply object
module.exports = replyObj;