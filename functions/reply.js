// Create reply object
const replyObj = {}

// SUCCESS: THING FOUND
replyObj.found = function (message, foundThing, pointsName) {
  message.reply({
    embed: {
      color: 'BLUE',
      description: '**' + foundThing.name + '** has **' + foundThing.karma + '** ' + pointsName + '.'
    }
  }).catch(console.error)
}

// SUCCESS: THINGS FOUND
replyObj.thingsFound = function (message, char, foundThings, pointsName) {
  let text = `.\nThings containing **${char}**:\n**Name**: ${pointsName}\n--------------------`
  if (char === '') {
    text = `.\nAll things:\n**Name**: ${pointsName}\n--------------------`
  }
  foundThings.forEach(thing => {
    text += `\n**${thing.name}**: ${thing.karma}`
  })

  if (text.length > 2000) {
    const splitText = text.match(/(.+\n|\n){1,50}/g)
    splitText.forEach((text, index) => {
      if (index === 0) {
        message.author.send([`${text}`]).catch(console.error)
      } else {
        message.author.send([`.\n${text}`]).catch(console.error)
      }
    })
  } else {
    message.author.send([`${text}`]).catch(console.error)
  }
  return text.length
}

// SUCCESS: BEST FOUND
replyObj.bestFound = function (message, foundThings, pointsName) {
  let num = 1
  let text = `__**BEST FIVE ${pointsName.toUpperCase()}**__:`
  foundThings.forEach(thing => {
    text += `\n${num}. **${thing.name}**: ${thing.karma}`
    num++
  })

  message.reply({
    embed: {
      color: 'BLUE',
      description: `${text}`
    }
  }).catch(console.error)
}

// SUCCESS: WORST FOUND
replyObj.worstFound = function (message, foundThings, pointsName) {
  let num = 1
  let text = `__**WORST FIVE ${pointsName.toUpperCase()}**__:`
  foundThings.forEach(thing => {
    text += `\n${num}. **${thing.name}**: ${thing.karma}`
    num++
  })

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
replyObj.thingAlreadyExistsOnJoin = function (member, foundThing, pointsName) {
  member.guild.channels.cache.find(i => i.name === 'general').send({
    embed: {
      color: 'GREEN',
      description: `**${foundThing.name}** joined the server\n
          and already has **${foundThing.karma}** ${pointsName}.`
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
          rename them with \`sk adminRename ${newThing.name} <@name>\`.`
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
// replyObj.capped = function (message, thingName, pointsName) {
//   message.reply({
//     embed: {
//       color: 'RED',
//       description: `Thing, **${thingName}'s** ${pointsName} is already **OVER 9000**!\n
//         **${thingName}** doesn't need anymore.`
//     }
//   }).catch(console.error)
// }

// ERROR: CAN'T GIVE KARMA TO YOURSELF
replyObj.karmaYourselfError = function (message, pointsName) {
  message.reply({
    embed: {
      color: 'RED',
      description: `You can't give yourself ${pointsName}!`
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
replyObj.notEnoughKarma = function (message, pointsName) {
  message.reply({
    embed: {
      color: 'RED',
      description: `You have insufficient ${pointsName} to use this command.`
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
replyObj.deleteTrolled = function (message, foundUser, foundThing, pointsName) {
  message.reply({
    embed: {
      color: 'BLUE',
      description: `**AN *"ERROR"* OCCURRED!**\n
        **${foundUser.name}'s** ${pointsName} has been transferred to **${foundThing.name}**.\n
        **${foundThing.name}** has **${foundThing.karma}** ${pointsName}.\n
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

// INFO: NO NEXTUNDO
replyObj.noUndoNext = function (message) {
  message.reply({
    embed: {
      color: 'GREY',
      description: 'There are no more commands to undo.'
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

// SUCCESS: POINTSNAME SET
replyObj.pointsNameSet = function (message, pointsName) {
  message.reply({
    embed: {
      color: 'BLUE',
      description: `Points name set to: **${pointsName}**!`
    }
  }).catch(console.error)
}

// ERROR: SERVER COULD NOT BE CREATED
replyObj.serverNotCreated = function (message) {
  message.reply({
    embed: {
      color: 'RED',
      description: 'A database **ERROR** ocurred and your points name was not set :('
    }
  }).catch(console.error)
}

//  Export reply object
module.exports = replyObj
