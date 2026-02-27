---
title: discord.js
---

# discord.js

| Property | Value |
|----------|-------|
| **Package** | `discord.js` |
| **Versions Covered** | `>=14.0.0` |
| **Contract Version** | `1.0.0` |
| **Status** | `production` |
| **Last Verified** | 2026-02-27 |
| **Maintainer** | corpus-team |

## Installation

```bash
npm install discord.js
```

## Covered Functions

This contract covers 38 function(s):

### `Client.login()`

Authenticates bot with Discord API using token

**Import:**
```typescript
import discord from 'discord';
discord.Client.login(...);
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - discord-client-login-no-try-catch**

**Condition:** Client.login() called without try-catch

**Throws:** `Error on invalid/revoked token, network failure, or rate limiting`

**Required Handling:**

MUST wrap await client.login() in try-catch block

📖 [Source](https://discord.js.org/docs/packages/discord.js/main/Client:Class#login)

---

### `Client.destroy()`

Destroys client connection and cleans up resources

**Import:**
```typescript
import discord from 'discord';
discord.Client.destroy(...);
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - discord-client-destroy-no-try-catch**

**Condition:** Client.destroy() called without try-catch

**Throws:** `Error during cleanup or network disconnection`

**Required Handling:**

MUST wrap await client.destroy() in try-catch block

📖 [Source](https://discord.js.org/docs/packages/discord.js/main/Client:Class#destroy)

---

### `Client.fetchWebhook()`

Fetches webhook by ID from Discord API

**Import:**
```typescript
import discord from 'discord';
discord.Client.fetchWebhook(...);
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - discord-client-fetchwebhook-no-try-catch**

**Condition:** Client.fetchWebhook() called without try-catch

**Throws:** `DiscordAPIError (404 not found, 403 forbidden) or network errors`

**Required Handling:**

MUST wrap await client.fetchWebhook() in try-catch block

📖 [Source](https://discord.js.org/docs/packages/discord.js/main/Client:Class#fetchWebhook)

---

### `Client.deleteWebhook()`

Deletes webhook from Discord

**Import:**
```typescript
import discord from 'discord';
discord.Client.deleteWebhook(...);
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - discord-client-deletewebhook-no-try-catch**

**Condition:** Client.deleteWebhook() called without try-catch

**Throws:** `DiscordAPIError (403 forbidden, 404 not found) or network errors`

**Required Handling:**

MUST wrap await client.deleteWebhook() in try-catch block

📖 [Source](https://discord.js.org/docs/packages/discord.js/main/Client:Class#deleteWebhook)

---

### `Message.delete()`

Deletes message from channel

**Import:**
```typescript
import discord from 'discord';
discord.Message.delete(...);
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - discord-message-delete-no-try-catch**

**Condition:** Message.delete() called without try-catch

**Throws:** `DiscordAPIError (10008 Unknown Message, 50013 Missing Permissions) or network errors`

**Required Handling:**

MUST wrap await message.delete() in try-catch block

📖 [Source](https://discord.js.org/docs/packages/discord.js/main/Message:Class#delete)

---

### `Message.edit()`

Edits message content

**Import:**
```typescript
import discord from 'discord';
discord.Message.edit(...);
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - discord-message-edit-no-try-catch**

**Condition:** Message.edit() called without try-catch

**Throws:** `DiscordAPIError (50005 Cannot edit other user's message, 50035 Invalid Form Body)`

**Required Handling:**

MUST wrap await message.edit() in try-catch block

📖 [Source](https://discord.js.org/docs/packages/discord.js/main/Message:Class#edit)

---

### `Message.reply()`

Replies to message

**Import:**
```typescript
import discord from 'discord';
discord.Message.reply(...);
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - discord-message-reply-no-try-catch**

**Condition:** Message.reply() called without try-catch

**Throws:** `DiscordAPIError (50013 Missing Permissions, 50035 Invalid Form Body) or rate limits`

**Required Handling:**

MUST wrap await message.reply() in try-catch block

📖 [Source](https://discord.js.org/docs/packages/discord.js/main/Message:Class#reply)

---

### `Message.react()`

Adds reaction to message

**Import:**
```typescript
import discord from 'discord';
discord.Message.react(...);
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - discord-message-react-no-try-catch**

**Condition:** Message.react() called without try-catch

**Throws:** `DiscordAPIError (50013 Missing Permissions, 10014 Unknown Emoji, 90001 Reaction Blocked)`

**Required Handling:**

MUST wrap await message.react() in try-catch block

📖 [Source](https://discord.js.org/docs/packages/discord.js/main/Message:Class#react)

---

### `Message.pin()`

Pins message in channel

**Import:**
```typescript
import discord from 'discord';
discord.Message.pin(...);
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - discord-message-pin-no-try-catch**

**Condition:** Message.pin() called without try-catch

**Throws:** `DiscordAPIError (50013 Missing Permissions, 30003 Maximum Pins Reached)`

**Required Handling:**

MUST wrap await message.pin() in try-catch block

📖 [Source](https://discord.js.org/docs/packages/discord.js/main/Message:Class#pin)

---

### `Message.unpin()`

Unpins message from channel

**Import:**
```typescript
import discord from 'discord';
discord.Message.unpin(...);
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - discord-message-unpin-no-try-catch**

**Condition:** Message.unpin() called without try-catch

**Throws:** `DiscordAPIError (50013 Missing Permissions) if message not pinned`

**Required Handling:**

MUST wrap await message.unpin() in try-catch block

📖 [Source](https://discord.js.org/docs/packages/discord.js/main/Message:Class#unpin)

---

### `Message.crosspost()`

Crossposts message to following channels

**Import:**
```typescript
import discord from 'discord';
discord.Message.crosspost(...);
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - discord-message-crosspost-no-try-catch**

**Condition:** Message.crosspost() called without try-catch

**Throws:** `DiscordAPIError (50024 Cannot execute on system message, channel not announcement)`

**Required Handling:**

MUST wrap await message.crosspost() in try-catch block

📖 [Source](https://discord.js.org/docs/packages/discord.js/main/Message:Class#crosspost)

---

### `Message.fetch()`

Fetches fresh message data from API

**Import:**
```typescript
import discord from 'discord';
discord.Message.fetch(...);
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - discord-message-fetch-no-try-catch**

**Condition:** Message.fetch() called without try-catch

**Throws:** `DiscordAPIError (10008 Unknown Message) or network errors`

**Required Handling:**

MUST wrap await message.fetch() in try-catch block

📖 [Source](https://discord.js.org/docs/packages/discord.js/main/Message:Class#fetch)

---

### `Message.fetchReference()`

Fetches referenced message (if reply)

**Import:**
```typescript
import discord from 'discord';
discord.Message.fetchReference(...);
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - discord-message-fetchreference-no-try-catch**

**Condition:** Message.fetchReference() called without try-catch

**Throws:** `DiscordAPIError (10008 Unknown Message) if reference deleted`

**Required Handling:**

MUST wrap await message.fetchReference() in try-catch block

📖 [Source](https://discord.js.org/docs/packages/discord.js/main/Message:Class#fetchReference)

---

### `Message.startThread()`

Creates thread from message

**Import:**
```typescript
import discord from 'discord';
discord.Message.startThread(...);
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - discord-message-startthread-no-try-catch**

**Condition:** Message.startThread() called without try-catch

**Throws:** `DiscordAPIError (50013 Missing Permissions, 160004 Message already has thread, rate limits)`

**Required Handling:**

MUST wrap await message.startThread() in try-catch block

📖 [Source](https://discord.js.org/docs/packages/discord.js/main/Message:Class#startThread)

---

### `TextChannel.send()`

Sends message to text channel

**Import:**
```typescript
import discord from 'discord';
discord.TextChannel.send(...);
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - discord-textchannel-send-no-try-catch**

**Condition:** TextChannel.send() called without try-catch

**Throws:** `DiscordAPIError (50013 Missing Permissions, 50035 Invalid Form Body, rate limits)`

**Required Handling:**

MUST wrap await channel.send() in try-catch block

📖 [Source](https://discord.js.org/docs/packages/discord.js/main/TextChannel:Class#send)

---

### `BaseChannel.send()`

Sends message to base channel

**Import:**
```typescript
import discord from 'discord';
discord.BaseChannel.send(...);
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - discord-basechannel-send-no-try-catch**

**Condition:** BaseChannel.send() called without try-catch

**Throws:** `DiscordAPIError (50013 Missing Permissions, 50035 Invalid Form Body, rate limits)`

**Required Handling:**

MUST wrap await channel.send() in try-catch block

📖 [Source](https://discord.js.org/docs/packages/discord.js/main/BaseChannel:Class)

---

### `ThreadChannel.send()`

Sends message to thread

**Import:**
```typescript
import discord from 'discord';
discord.ThreadChannel.send(...);
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - discord-threadchannel-send-no-try-catch**

**Condition:** ThreadChannel.send() called without try-catch

**Throws:** `DiscordAPIError (50013 Missing Permissions, 40060 Thread archived, rate limits)`

**Required Handling:**

MUST wrap await thread.send() in try-catch block

📖 [Source](https://discord.js.org/docs/packages/discord.js/main/ThreadChannel:Class#send)

---

### `TextChannel.bulkDelete()`

Bulk deletes messages from channel

**Import:**
```typescript
import discord from 'discord';
discord.TextChannel.bulkDelete(...);
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - discord-textchannel-bulkdelete-no-try-catch**

**Condition:** TextChannel.bulkDelete() called without try-catch

**Throws:** `DiscordAPIError (50013 Missing Permissions, 50034 Messages older than 14 days)`

**Required Handling:**

MUST wrap await channel.bulkDelete() in try-catch block

📖 [Source](https://discord.js.org/docs/packages/discord.js/main/TextChannel:Class#bulkDelete)

---

### `TextChannel.createInvite()`

Creates invite to channel

**Import:**
```typescript
import discord from 'discord';
discord.TextChannel.createInvite(...);
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - discord-textchannel-createinvite-no-try-catch**

**Condition:** TextChannel.createInvite() called without try-catch

**Throws:** `DiscordAPIError (50013 Missing CREATE_INSTANT_INVITE permission) or network errors`

**Required Handling:**

MUST wrap await channel.createInvite() in try-catch block

📖 [Source](https://discord.js.org/docs/packages/discord.js/main/TextChannel:Class#createInvite)

---

### `CommandInteraction.reply()`

Replies to command interaction

**Import:**
```typescript
import discord from 'discord';
discord.CommandInteraction.reply(...);
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - discord-commandinteraction-reply-no-try-catch**

**Condition:** CommandInteraction.reply() called without try-catch

**Throws:** `DiscordAPIError (10062 Unknown interaction, already replied) or token expired (3s limit)`

**Required Handling:**

MUST wrap await interaction.reply() in try-catch block

📖 [Source](https://discordjs.guide/slash-commands/response-methods)

---

### `CommandInteraction.deferReply()`

Defers interaction reply to extend token validity

**Import:**
```typescript
import discord from 'discord';
discord.CommandInteraction.deferReply(...);
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - discord-commandinteraction-deferreply-no-try-catch**

**Condition:** CommandInteraction.deferReply() called without try-catch

**Throws:** `DiscordAPIError (10062 Unknown interaction, already replied) or token expired`

**Required Handling:**

MUST wrap await interaction.deferReply() in try-catch block

📖 [Source](https://discordjs.guide/slash-commands/response-methods)

---

### `CommandInteraction.followUp()`

Sends follow-up message to interaction

**Import:**
```typescript
import discord from 'discord';
discord.CommandInteraction.followUp(...);
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - discord-commandinteraction-followup-no-try-catch**

**Condition:** CommandInteraction.followUp() called without try-catch

**Throws:** `DiscordAPIError (10062 Unknown interaction, not replied first) or token expired (15min)`

**Required Handling:**

MUST wrap await interaction.followUp() in try-catch block

📖 [Source](https://discordjs.guide/slash-commands/response-methods)

---

### `CommandInteraction.editReply()`

Edits interaction reply

**Import:**
```typescript
import discord from 'discord';
discord.CommandInteraction.editReply(...);
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - discord-commandinteraction-editreply-no-try-catch**

**Condition:** CommandInteraction.editReply() called without try-catch

**Throws:** `DiscordAPIError (10062 Unknown interaction, no initial reply) or token expired`

**Required Handling:**

MUST wrap await interaction.editReply() in try-catch block

📖 [Source](https://discordjs.guide/slash-commands/response-methods)

---

### `ButtonInteraction.reply()`

Replies to button interaction

**Import:**
```typescript
import discord from 'discord';
discord.ButtonInteraction.reply(...);
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - discord-buttoninteraction-reply-no-try-catch**

**Condition:** ButtonInteraction.reply() called without try-catch

**Throws:** `DiscordAPIError (10062 Unknown interaction, token expired) or network errors`

**Required Handling:**

MUST wrap await interaction.reply() in try-catch block

📖 [Source](https://discordjs.guide/message-components/interactions)

---

### `SelectMenuInteraction.reply()`

Replies to select menu interaction

**Import:**
```typescript
import discord from 'discord';
discord.SelectMenuInteraction.reply(...);
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - discord-selectmenuinteraction-reply-no-try-catch**

**Condition:** SelectMenuInteraction.reply() called without try-catch

**Throws:** `DiscordAPIError (10062 Unknown interaction, token expired) or network errors`

**Required Handling:**

MUST wrap await interaction.reply() in try-catch block

📖 [Source](https://discordjs.guide/message-components/interactions)

---

### `Guild.fetch()`

Fetches fresh guild data from API

**Import:**
```typescript
import discord from 'discord';
discord.Guild.fetch(...);
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - discord-guild-fetch-no-try-catch**

**Condition:** Guild.fetch() called without try-catch

**Throws:** `DiscordAPIError (10004 Unknown Guild) or network errors`

**Required Handling:**

MUST wrap await guild.fetch() in try-catch block

📖 [Source](https://discord.js.org/docs/packages/discord.js/main/Guild:Class#fetch)

---

### `Guild.edit()`

Edits guild settings

**Import:**
```typescript
import discord from 'discord';
discord.Guild.edit(...);
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - discord-guild-edit-no-try-catch**

**Condition:** Guild.edit() called without try-catch

**Throws:** `DiscordAPIError (50013 Missing MANAGE_GUILD permission, 50035 Invalid options)`

**Required Handling:**

MUST wrap await guild.edit() in try-catch block

📖 [Source](https://discord.js.org/docs/packages/discord.js/main/Guild:Class#edit)

---

### `Guild.leave()`

Leaves guild

**Import:**
```typescript
import discord from 'discord';
discord.Guild.leave(...);
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - discord-guild-leave-no-try-catch**

**Condition:** Guild.leave() called without try-catch

**Throws:** `DiscordAPIError or network errors`

**Required Handling:**

MUST wrap await guild.leave() in try-catch block

📖 [Source](https://discord.js.org/docs/packages/discord.js/main/Guild:Class#leave)

---

### `Guild.fetchAuditLogs()`

Fetches guild audit logs

**Import:**
```typescript
import discord from 'discord';
discord.Guild.fetchAuditLogs(...);
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - discord-guild-fetchauditlogs-no-try-catch**

**Condition:** Guild.fetchAuditLogs() called without try-catch

**Throws:** `DiscordAPIError (50013 Missing VIEW_AUDIT_LOG permission) or network errors`

**Required Handling:**

MUST wrap await guild.fetchAuditLogs() in try-catch block

📖 [Source](https://discord.js.org/docs/packages/discord.js/main/Guild:Class#fetchAuditLogs)

---

### `Guild.fetchOwner()`

Fetches guild owner

**Import:**
```typescript
import discord from 'discord';
discord.Guild.fetchOwner(...);
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - discord-guild-fetchowner-no-try-catch**

**Condition:** Guild.fetchOwner() called without try-catch

**Throws:** `DiscordAPIError or network errors`

**Required Handling:**

MUST wrap await guild.fetchOwner() in try-catch block

📖 [Source](https://discord.js.org/docs/packages/discord.js/main/Guild:Class#fetchOwner)

---

### `Guild.fetchWebhooks()`

Fetches all guild webhooks

**Import:**
```typescript
import discord from 'discord';
discord.Guild.fetchWebhooks(...);
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - discord-guild-fetchwebhooks-no-try-catch**

**Condition:** Guild.fetchWebhooks() called without try-catch

**Throws:** `DiscordAPIError (50013 Missing MANAGE_WEBHOOKS permission) or network errors`

**Required Handling:**

MUST wrap await guild.fetchWebhooks() in try-catch block

📖 [Source](https://discord.js.org/docs/packages/discord.js/main/Guild:Class#fetchWebhooks)

---

### `GuildMember.ban()`

Bans member from guild

**Import:**
```typescript
import discord from 'discord';
discord.GuildMember.ban(...);
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - discord-guildmember-ban-no-try-catch**

**Condition:** GuildMember.ban() called without try-catch

**Throws:** `DiscordAPIError (50013 Missing BAN_MEMBERS permission, role hierarchy violation)`

**Required Handling:**

MUST wrap await member.ban() in try-catch block

📖 [Source](https://discord.js.org/docs/packages/discord.js/main/GuildMember:Class#ban)

---

### `GuildMember.kick()`

Kicks member from guild

**Import:**
```typescript
import discord from 'discord';
discord.GuildMember.kick(...);
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - discord-guildmember-kick-no-try-catch**

**Condition:** GuildMember.kick() called without try-catch

**Throws:** `DiscordAPIError (50013 Missing KICK_MEMBERS permission, role hierarchy violation)`

**Required Handling:**

MUST wrap await member.kick() in try-catch block

📖 [Source](https://discord.js.org/docs/packages/discord.js/main/GuildMember:Class#kick)

---

### `GuildMember.timeout()`

Times out member (temporary mute)

**Import:**
```typescript
import discord from 'discord';
discord.GuildMember.timeout(...);
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - discord-guildmember-timeout-no-try-catch**

**Condition:** GuildMember.timeout() called without try-catch

**Throws:** `DiscordAPIError (50013 Missing MODERATE_MEMBERS permission, role hierarchy violation)`

**Required Handling:**

MUST wrap await member.timeout() in try-catch block

📖 [Source](https://discord.js.org/docs/packages/discord.js/main/GuildMember:Class#timeout)

---

### `GuildMember.edit()`

Edits member properties

**Import:**
```typescript
import discord from 'discord';
discord.GuildMember.edit(...);
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - discord-guildmember-edit-no-try-catch**

**Condition:** GuildMember.edit() called without try-catch

**Throws:** `DiscordAPIError (50013 Missing permissions, 50035 Invalid options)`

**Required Handling:**

MUST wrap await member.edit() in try-catch block

📖 [Source](https://discord.js.org/docs/packages/discord.js/main/GuildMember:Class#edit)

---

### `RoleManager.create()`

Creates new role in guild

**Import:**
```typescript
import discord from 'discord';
discord.RoleManager.create(...);
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - discord-rolemanager-create-no-try-catch**

**Condition:** RoleManager.create() called without try-catch

**Throws:** `DiscordAPIError (50013 Missing MANAGE_ROLES permission) or network errors`

**Required Handling:**

MUST wrap await roles.create() in try-catch block

📖 [Source](https://discord.js.org/docs/packages/discord.js/main/RoleManager:Class#create)

---

### `Role.edit()`

Edits role properties

**Import:**
```typescript
import discord from 'discord';
discord.Role.edit(...);
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - discord-role-edit-no-try-catch**

**Condition:** Role.edit() called without try-catch

**Throws:** `DiscordAPIError (50013 Missing MANAGE_ROLES permission, role hierarchy violation)`

**Required Handling:**

MUST wrap await role.edit() in try-catch block

📖 [Source](https://discord.js.org/docs/packages/discord.js/main/Role:Class#edit)

---

### `Role.delete()`

Deletes role from guild

**Import:**
```typescript
import discord from 'discord';
discord.Role.delete(...);
```

#### Postconditions

What happens **after** calling this function:

**🔴 ERROR - discord-role-delete-no-try-catch**

**Condition:** Role.delete() called without try-catch

**Throws:** `DiscordAPIError (50013 Missing MANAGE_ROLES permission, role hierarchy violation)`

**Required Handling:**

MUST wrap await role.delete() in try-catch block

📖 [Source](https://discord.js.org/docs/packages/discord.js/main/Role:Class#delete)

---

## Example: Proper Error Handling

```typescript
import discord.js from 'discord.js';

async function example() {
  try {
    const result = await Client.login(/* args */);
    // Handle success
    return result;
  } catch (error) {
    // Handle error according to contract postconditions
    console.error('Error:', error);
    throw error;
  }
}
```

## See Also

- [Contract Schema Reference](../contract-schema/schema-reference.md)
- [All Supported Packages](./overview.md)
- [How to Use verify-cli](../cli-reference/overview.md)
