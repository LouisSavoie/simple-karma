// Create reply object
let replyObj = {};

// SUCCESS: THING FOUND
replyObj.found = function(message, foundThing) {
    message.reply({
        embed: {
          color: "BLUE",
          description: '**' + foundThing.name + '** has **' + foundThing.karma + '** karma.'
        }
    }).catch(console.error);
};

// SUCCESS: THINGS FOUND
replyObj.thingsFound = function(message, char, foundThings) {
    // debug
    // console.log("foundThings:\n" + foundThings);

    text = `.\nThings containing **${char}**:`;
    foundThings.forEach(thing => {
        text += `\n--------------------\n**${thing.name}**: Karma - **${thing.karma}**`
    });

    // debug
    // console.log("text:\n" + text);
    
    message.author.send([
        `${text}`
    ]).catch(console.error);
};

// ERROR: THING ALREADY EXISTS
replyObj.thingAlreadyExists = function(message, foundThing) {
    message.reply({
        embed: {
          color: "RED",
          description: 'Thing, **' + foundThing.name + '**, already exists!'
        }
    }).catch(console.error);
};

// SUCCESS: THING CREATED
replyObj.thingCreated = function(message, newThing) {
    message.reply({
        embed: {
          color: "BLUE",
          description: `New thing, **${newThing.name}**, has been created!`
        }
    }).catch(console.error);
};

// ERROR: THING COULD NOT BE CREATED
replyObj.thingNotCreated = function(message, thingName) {
    message.reply({
        embed: {
          color: "RED",
          description: 'A database **ERROR** ocurred and thing, **' + thingName + '**, was not created :('
        }
    }).catch(console.error);
};

// ERROR: THING NOT FOUND
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

// ERROR: NO THINGS FOUND
replyObj.noThingsFound = function(message, char) {
    message.reply({
        embed: {
          color: "RED",
          description: `No things containing **${char}** exist!`
        }
    }).catch(console.error);
};

// ERROR: KARMA CAPPED
replyObj.capped = function(message, thingName) {
    message.reply({
        embed: {
        color: "RED",
        description: `Thing, **${thingName}'s** karma is already **OVER 9000**!\n
        **${thingName}** doesn't need anymore.`
        }
    }).catch(console.error);
};

// ERROR: CAN'T GIVE KARMA TO YOURSELF
replyObj.karmaYourselfError = function(message, thingName) {
    message.reply({
        embed: {
        color: "RED",
        description: `You can't give yourself karma!`
        }
    }).catch(console.error);
};

// ERROR: NOT ENOUGH KARMA
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

// SUCCESS: DELETE TROLLED
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

// ERROR: UNKNOWN COMMAND
replyObj.unknownCommand = function(message) {
    message.reply({
        embed: {
          color: "RED",
          description: `Command is unknown or conatins banned characters.`
        }
    }).catch(console.error);
};

//  Export reply object
module.exports = replyObj;