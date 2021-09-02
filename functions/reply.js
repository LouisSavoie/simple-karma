// Create reply object
const replyObj = {}

// SUCCESS: THING FOUND
replyObj.found = function (message, foundThing) {
  message.reply({
    embed: {
      color: 'BLUE',
      description: '**' + foundThing.name + '** has **' + foundThing.karma + '** karma.'
    }
  }).catch(console.error)
}

// SUCCESS: THINGS FOUND
replyObj.thingsFound = function (message, char, foundThings) {
  // debug
  // console.log("foundThings:\n" + foundThings);

  if (char === '') {
    char = '*'
  }

  let text = `.\nThings containing **${char}**:`
  foundThings.forEach(thing => {
    text += `\n--------------------\n**${thing.name}**: Karma - **${thing.karma}**`
  })

  // debug
  // console.log("text:\n" + text);

  message.author.send([
        `${text}`
  ]).catch(console.error)
}

// SUCCESS: BEST FOUND
replyObj.bestFound = function (message, foundThings) {
  // debug
  // console.log("foundThings:\n" + foundThings);

  let num = 1
  let text = '__**BEST FIVE KARMA**__:'
  foundThings.forEach(thing => {
    text += `\n${num}. **${thing.name}**: Karma = **${thing.karma}**`
    num++
  })

  // debug
  // console.log("text:\n" + text);

  message.reply({
    embed: {
      color: 'BLUE',
      description: `${text}`
    }
  }).catch(console.error)
}

// SUCCESS: WORST FOUND
replyObj.worstFound = function (message, foundThings) {
  // debug
  // console.log("foundThings:\n" + foundThings);

  let num = 1
  let text = '__**WORST FIVE KARMA**__:'
  foundThings.forEach(thing => {
    text += `\n${num}. **${thing.name}**: Karma = **${thing.karma}**`
    num++
  })

  // debug
  // console.log("text:\n" + text);

  message.reply({
    embed: {
      color: 'BLUE',
      description: `${text}`
    }
  }).catch(console.error)
}

// ERROR: THING ALREADY EXISTS
replyObj.thingAlreadyExists = function (message, foundThing) {
  message.reply({
    embed: {
      color: 'RED',
      description: 'Thing, **' + foundThing.name + '**, already exists!'
    }
  }).catch(console.error)
}

// STATUS: THING ALREADY EXISTS ON JOIN
replyObj.thingAlreadyExistsOnJoin = function (member, foundThing) {
  member.guild.channels.cache.find(i => i.name === 'general').send({
    embed: {
      color: 'GREEN',
      description: `**${foundThing.name}** joined the server\n
          and already has **${foundThing.karma}** karma.`
    }
  }).catch(console.error)
}

// SUCCESS: THING CREATED
replyObj.thingCreated = function (message, newThing) {
  message.reply({
    embed: {
      color: 'BLUE',
      description: `New thing, **${newThing.name}**, has been created!`
    }
  }).catch(console.error)
}

// SUCCESS: THING CREATED ON JOIN
replyObj.thingCreatedOnJoin = function (member, newThing) {
  member.guild.channels.cache.find(i => i.name === 'general').send({
    embed: {
      color: 'BLUE',
      description: `**${newThing.name}** joined the server\n
          and has been added to the database!\n
          If **${newThing.name}** is not their desired name,\n
          create a new thing with \`sk new <@name>\`.`
    }
  }).catch(console.error)
}

// ERROR: THING COULD NOT BE CREATED
replyObj.thingNotCreated = function (message, thingName) {
  message.reply({
    embed: {
      color: 'RED',
      description: 'A database **ERROR** ocurred and thing, **' + thingName + '**, was not created :('
    }
  }).catch(console.error)
}

// ERROR: THING COULD NOT BE CREATED ON JOIN
replyObj.thingNotCreatedOnJoin = function (member, thingName) {
  member.guild.channels.cache.find(i => i.name === 'general').send({
    embed: {
      color: 'RED',
      description: 'A database **ERROR** ocurred and thing, **' + thingName + '**, was not created :('
    }
  }).catch(console.error)
}

// ERROR: THING NOT FOUND
replyObj.notFound = function (message, thingName) {
  // if thingName includes spaces, add parens that are needed to create it
  if (thingName.includes(' ')) {
    thingName = '(' + thingName + ')'
  }
  message.reply({
    embed: {
      color: 'RED',
      description: `Thing, **${thingName}**, doesn't exist!\n
          You can create it with: \`sk new ${thingName}\`\n
          It could also exist under a different name.\n
          Use \`sk search <part of name>\` to see if it does.`
    }
  }).catch(console.error)
}

// SUCCESS: THING NOT FOUND CREATED
replyObj.notFoundCreated = function (message, thingName) {
  // if thingName includes spaces, add parens that are needed to create it
  if (thingName.includes(' ')) {
    thingName = '(' + thingName + ')'
  }
  message.reply({
    embed: {
      color: 'BLUE',
      description: `Thing, **${thingName}**, doesn't exist, but has been created for you.\n
          If this was a mistake, an admin can undo it.`
    }
  }).catch(console.error)
}

// ERROR: NO THINGS FOUND
replyObj.noThingsFound = function (message, char) {
  message.reply({
    embed: {
      color: 'RED',
      description: `No things containing **${char}** exist!`
    }
  }).catch(console.error)
}

// ERROR: BEST NOT FOUND
replyObj.bestNotFound = function (message) {
  message.reply({
    embed: {
      color: 'RED',
      description: 'Best things could not be found.'
    }
  }).catch(console.error)
}

// ERROR: WORST NOT FOUND
replyObj.worstNotFound = function (message) {
  message.reply({
    embed: {
      color: 'RED',
      description: 'Worst things could not be found.'
    }
  }).catch(console.error)
}

// ERROR: KARMA CAPPED
replyObj.capped = function (message, thingName) {
  message.reply({
    embed: {
      color: 'RED',
      description: `Thing, **${thingName}'s** karma is already **OVER 9000**!\n
        **${thingName}** doesn't need anymore.`
    }
  }).catch(console.error)
}

// ERROR: CAN'T GIVE KARMA TO YOURSELF
replyObj.karmaYourselfError = function (message, thingName) {
  message.reply({
    embed: {
      color: 'RED',
      description: 'You can\'t give yourself karma!'
    }
  }).catch(console.error)
}

// ERROR: CAN'T TROLL DELETE YOURSELF
replyObj.trollDeleteYourselfError = function (message) {
  message.reply({
    embed: {
      color: 'RED',
      description: 'You can\'t delete yourself!'
    }
  }).catch(console.error)
}

// ERROR: NOT ENOUGH KARMA
replyObj.notEnoughKarma = function (message) {
  message.reply({
    embed: {
      color: 'RED',
      description: 'You have insufficient karma to use this command.'
    }
  }).catch(console.error)
}

// ERROR: MUST BE IN DATABASE
replyObj.userNotInDatabase = function (message, displayName) {
  message.reply({
    embed: {
      color: 'RED',
      description: `You must be in the database to use this command.\n
          You can create yourself with: \`sk new @${displayName}\`.`
    }
  }).catch(console.error)
}

// SUCCESS: DELETE TROLLED
replyObj.deleteTrolled = function (message, foundUser, foundThing) {
  message.reply({
    embed: {
      color: 'BLUE',
      description: `**AN *"ERROR"* OCCURRED!**\n
        **${foundUser.name}'s** karma has been transferred to **${foundThing.name}**.\n
        **${foundThing.name}** has **${foundThing.karma}** karma.\n
        and **${foundUser.name.toUpperCase()}** has **NONE**.`
    }
  }).catch(console.error)
}

// ERROR: UNKNOWN COMMAND
replyObj.unknownCommand = function (message) {
  message.reply({
    embed: {
      color: 'RED',
      description: 'Command is unknown or contains banned characters.'
    }
  }).catch(console.error)
}

// ERROR: NO THING GIVEN
replyObj.noThing = function (message) {
  message.reply({
    embed: {
      color: 'RED',
      description: 'Command did not include a thing!'
    }
  }).catch(console.error)
}

// ERROR: NO PERMISSION
replyObj.noPermission = function (message) {
  message.reply({
    embed: {
      color: 'RED',
      description: 'You do not have the proper permission to use this command.'
    }
  }).catch(console.error)
}

// ERROR: NOT A NUMBER
replyObj.notANumber = function (message, value) {
  message.reply({
    embed: {
      color: 'RED',
      description: 'That value is not a number.'
    }
  }).catch(console.error)
}

// SUCCESS: THING DELETED
replyObj.thingDeleted = function (message, thingName) {
  message.reply({
    embed: {
      color: 'BLUE',
      description: '**' + thingName + '**, has been deleted.'
    }
  }).catch(console.error)
}

// ERROR: THING COULD NOT BE DELETED
replyObj.thingNotDeleted = function (message, thingName) {
  message.reply({
    embed: {
      color: 'RED',
      description: 'A database **ERROR** ocurred and thing, **' + thingName + '**, was not deleted :('
    }
  }).catch(console.error)
}

// ERROR: NO UNDO CASE
replyObj.noUndoCase = function (message) {
  message.reply({
    embed: {
      color: 'RED',
      description: 'Undo operation does not match any defined case.'
    }
  }).catch(console.error)
}

// ERROR: NO UNDO
replyObj.noUndoCase = function (message) {
  message.reply({
    embed: {
      color: 'RED',
      description: 'There is nothing to undo.'
    }
  }).catch(console.error)
}

// INFO: NEXT UNDO
replyObj.nextUndo = function (message, undo) {
  if (undo.command === 'untroll') {
    message.reply({
      embed: {
        color: 'GREY',
        description: 'Next undo will **' + undo.command + ' ' + undo.thing.thingName + '** and **' + undo.command + ' ' + undo.thing.userName + '**.'
      }
    }).catch(console.error)
  } else {
    message.reply({
      embed: {
        color: 'GREY',
        description: 'Next undo will **' + undo.command + ' ' + undo.thing.name + '**.'
      }
    }).catch(console.error)
  }
}

//  Export reply object
module.exports = replyObj
