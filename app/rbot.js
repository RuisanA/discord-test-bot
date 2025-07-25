const http = require("http");
const { Client, Intents, VoiceStateManager , Permissions, MessageAttachment,　MessageEmbed, MessageActionRow, MessageButton,　Guild, GuildMember, ApplicationCommandOptionType, MessageMentions, MessageSelectMenu, MessageActionRowOptions, MessageSelectMenuOptions} = require("discord.js");
const { REST } = require('@discordjs/rest');
const { Pagination } = require("discordjs-button-embed-pagination");
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } = require('@discordjs/voice');
function isValidURL(url) {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}
const newbutton = (buttondata) => {
  return {
    components: buttondata.map((data) => {
      return {
        custom_id: data.id,
        label: data.label,
        style: data.style || 1,
        url: data.url,
        emoji: data.emoji,
        disabled: data.disabled,
        type: 2,
      };
    }),
    type: 1,
  };
};
const { Routes } = require('discord-api-types/v9');
const { clientId,token } = require('./config.json');
const { adminid } = require('./config.json');
const { readdirSync } = require('fs');
const fs = require("fs");
const ms = require("ms");
const { join } = require('path');
const akinator = require("discord.js-akinator");
const dotenv = require('dotenv');
const moment = require('moment');
const Discord = require("discord.js");
const ClientId = '1098536632161947658'
dotenv.config();

const express = require("express");
const app = express();

const admin_list = ["983317416283086909"]

const client = new Client({
  intents: [Intents.FLAGS.GUILDS,
          　Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_VOICE_STATES],
});

  client.on('ready', client => {
  console.log(`==== ログイン: ${client.user.tag} ====`)
  client.user.setActivity({
    type: 'PLAYING',
    name: `R SERVER/配布`
  });
    const embed = new MessageEmbed()
  .setTitle("BOT ONLINE ログ")
  .setDescription(">>> ```diff\nBOTが起動されました　　　　　``````diff\n+ BOT導入サーバー数:" + client.guilds.cache.size + "\n+ ユーザー数:" + client.users.cache.size + "```" + moment().format("YYYY-MM-DD HH:mm:ss"))
  .setThumbnail(client.user.displayAvatarURL())
  .setColor("RANDOM")
  client.channels.cache.get("1209002367886827520").send({ embeds: [ embed ] })
  client.guilds.cache.size
  client.user.setStatus('online');
});

const prefix = "r.";

client
  .on("debug", console.log)
  .on("warn", console.log)

client.on('ready', async () => {
  try {
    await client.application.commands.create({
      name: 'embed',
      description: '埋め込みを作成します',
      options: [
        {
          name: 'title',
          type: 'STRING',
          description: 'タイトルを指定してください',
          required: true,
        },
        {
          name: 'description',
          type: 'STRING',
          description: '説明を指定してください',
          required: true,
        },
        {
          name: 'color',
          type: 'STRING',
          description: 'カラーを指定してください',
          required: true,
        },
        {
          name: 'image',
          type: 'STRING',
          description: '画像を指定してください',
          required: false,
        },
      ],
    });
  } catch (error) {
    console.error(error);
  }
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand() || interaction.commandName !== 'embed') return;
if(!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply({ content: "サーバー管理者しか使えません", ephemeral: true })
  const title = interaction.options.getString('title');
  const description = interaction.options.getString('description');
  const color = interaction.options.getString('color');
  const image = interaction.options.getString('image');

  const embed = new MessageEmbed()
    .setTitle(title)
    .setDescription(description)
    .setColor(color);

  if (image) {
    const imagePath = `path/to/your/images/folder/${image}`;
    const imageAttachment = new MessageAttachment(imagePath);
    embed.setImage(`attachment://${image}`);
    interaction.reply({
      embeds: [embed],
      files: [imageAttachment],
    });
  } else {
    interaction.reply({ embeds: [embed] });
  }
});

client.once('ready', async () => {
  try {
    await client.application.commands.create({
      name: 'distributionpanel',
      description: '配布パネルを表示します',
      options: [
        // オプションを追加することができます
      ],
    });
  } catch (error) {
    console.error(error);
  }
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;
  if (interaction.commandName === 'distributionpanel2') {
    // 指定したIDを持つユーザーのみ実行できるようにする
    const allowedUserId = '1178414826184265819';// 実際のIDに置き換える
    if (interaction.user.id !== allowedUserId) {
      return interaction.reply({ content: 'このコマンドはBOTオーナーのみ実行できます', ephemeral: true });
    }
    const embed = new MessageEmbed()
    .setDescription(`配布パネル`)
    .setAuthor('R SERVER 配布サービス','https://media.discordapp.net/attachments/1125145598199353374/1133005242825445396/download.png?width=512&height=512')
    .setImage("https://aserora.net/distribution.png")
    .setColor("RANDOM")
    .setTimestamp()
  const button1 = new MessageButton()
      .setCustomId('script')
      .setLabel('スクリプト')
      .setStyle('PRIMARY');

    const button2 = new MessageButton()
      .setCustomId('mod')
      .setLabel('MODMENU')
      .setStyle('PRIMARY');
    
     const button3 = new MessageButton()
      .setCustomId('gg')
      .setLabel('gameguardian')
      .setStyle('PRIMARY');
    
    const button4 = new MessageButton()
      .setCustomId('kasou')
      .setLabel('仮想空間')
      .setStyle('PRIMARY');
    
    const button5 = new MessageButton()
      .setCustomId('kinou')
      .setLabel('modmenuの機能を確認')
      .setStyle('PRIMARY');

    const actionRow = new MessageActionRow()
      .addComponents(button1, button2, button3, button4, button5);

    await interaction.reply({ embeds: [embed], components: [actionRow] });
  }
  });

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;
  if (interaction.commandName === 'distributionpanel') {
    // 指定したIDを持つユーザーのみ実行できるようにする
    const allowedUserId = '1178414826184265819'; // 実際のIDに置き換える
    if (interaction.user.id !== allowedUserId) {
      return interaction.reply({ content: 'このコマンドはBOTオーナーのみ実行できます', ephemeral: true });
    }

    const embed = new MessageEmbed()
      .setDescription(`配布パネル`)
      .setAuthor('R SERVER 配布サービス', 'https://media.discordapp.net/attachments/1125145598199353374/1133005242825445396/download.png?width=512&height=512')
      .setImage("https://aserora.net/distribution.png")
      .setColor("RANDOM")
      .setTimestamp();

    const button1 = new MessageButton()
      .setCustomId('script')
      .setLabel('スクリプト')
      .setStyle('PRIMARY');

    const button2 = new MessageButton()
      .setCustomId('mod')
      .setLabel('MODMENU')
      .setStyle('PRIMARY');

    const button3 = new MessageButton()
      .setCustomId('gg')
      .setLabel('gameguardian')
      .setStyle('PRIMARY');

    const button4 = new MessageButton()
      .setCustomId('kasou')
      .setLabel('仮想空間')
      .setStyle('PRIMARY');

    const button5 = new MessageButton()
      .setCustomId('kinou')
      .setLabel('modmenuの機能を確認')
      .setStyle('PRIMARY');

    const button6 = new MessageButton()
      .setCustomId('haifuticket')
      .setLabel('お問い合わせチケットを作成')
      .setStyle('PRIMARY');

    // ボタンを2つずつの行に配置
    const row1 = new MessageActionRow().addComponents(button1, button2, button3);
    const row2 = new MessageActionRow().addComponents(button4, button5, button6);

    await interaction.reply({ embeds: [embed], components: [row1, row2] });
  }
});
      
client.on('interactionCreate', async interaction => {
  if (!interaction.isButton()) return;
　if(interaction.customId == "script") {
      interaction.reply({
        ephemeral: true,
  embeds: [
    new MessageEmbed()
      .setTitle("下記のメニューから使用したいスクリプトを選択してください")
          .setImage("https://media.discordapp.net/attachments/1077075295431041205/1094432794760978463/1681003496419.png?width=1077&height=606")
          .setColor("RANDOM")
      .addFields(
        {
          name: "➀ぷにぷに",
          value: "```32bit、64bitどちらも搭載しています。```"
        },
        {
          name: "➁ツムツム",
          value: "```ツムツムスクリプトです端末差で使用できない機能もあります。ご了承ください。```"
        },
        {
          name: "③にゃんこ大戦争",
          value: "```にゃんこ大戦争のスクリプトです。仮想空間は64bitで使用するようにしてください。```"
        },
        {
          name: "④作成用:スクリプトテンプレート",
          value: "```スクリプトを制作したい方向けに作成したスクリプトのテンプレートです。作成がしたいという方是非ダウンロードしてください。```",
        },
        {
          name: "⑤作成用:暗号化スクリプト",
          value: "```スクリプトを暗号化するスクリプトです。スクリプトを暗号化するとユーザーが中身を見ることができなくなります。```",
        },
      )
  ],
  components: [
    {
      type: "ACTION_ROW",
      components: [
        {
          type: "BUTTON",
          customId: "puni",
          label: "①ぷにぷに",
          style: "PRIMARY"
        },
        {
          type: "BUTTON",
          customId: "tumu",
          label: "②ツムツム",
          style: "PRIMARY"
        },
        {
          type: "BUTTON",
          customId: "cat",
          label: "③にゃんこ大戦争",
          style: "PRIMARY"
        },
        {
          type: "BUTTON",
          customId: "tem",
          label: "④スクリプトテンプレート",
          style: "PRIMARY"
        },
        {
          type: "BUTTON",
          customId: "anngou",
          label: "⑤暗号化スクリプト",
          style: "PRIMARY"
        }
      ]
    }
  ]
});
    }
  
  const customId = interaction.customId;
    if (customId === "mod") {
  interaction.reply({
  ephemeral: true,
  embeds: [
    new MessageEmbed()
      .setTitle("注意事項・利用規約")
      .setColor("#F5C518")
      .setDescription("同意確認")
      .addFields(
        {
          name: "規約1",
          value: "```当サーバーが配布しているMODMENU又はスクリプトでアカウントに影響があっても一切の責任を負いかねますことをご了承ください。```"
        },
        {
          name: "規約2",
          value: "```配布を使用する際、販売、自作発言等は禁止です。万が一発見した場合は全ユーザーの利用を停止いたします```"
        }
      )
  ],
  components: [
    {
      type: "ACTION_ROW",
      components: [
        {
          type: "BUTTON",
          customId: "yes",
          label: "同意する",
          style: "SUCCESS"
        },
        {
          type: "BUTTON",
          customId: "no",
          label: "同意しない",
          style: "DANGER"
        }
      ]
    }
  ]
});
      }
  if (interaction.customId == "no") {
   interaction.reply({
        ephemeral: true,
        embeds: [
          new MessageEmbed()
          .setTitle("配布の取得がキャンセルされました")
          .setColor("RANDOM")
        ],
      })
      }
    if (interaction.customId == "yes") {
       interaction.reply({
        ephemeral: true,
  embeds: [
    new MessageEmbed()
          .setImage("https://media.discordapp.net/attachments/1077075295431041205/1094432794760978463/1681003496419.png?width=1077&height=606")
          .setColor("RANDOM")
      .addFields(
        {
          name: "MODMENU配布",
          value: "下のメニューから受け取りたいMODを選択してください。また、拡張子はAPKですのでiPhoneは利用できません。"
        }
      )
  ],
  components: [
  {
    type: "ACTION_ROW",
    components: [
      {
        type: "BUTTON",
        customId: "punipuni",
        label: "ぷにぷにMODMENU",
        style: "SECONDARY"
      },
      {
        type: "BUTTON",
        customId: "supo",
        label: "Spotifyプレミアム APK",
        style: "SECONDARY"
      },
      {
        type: "BUTTON",
        customId: "otokuri",
        label: "オートクリッカーVIP APK",
        style: "SECONDARY"
      }
    ]
  }
]
});
  }
  if (interaction.customId == "punipuni") {
       interaction.reply({
        ephemeral: true,
  embeds: [
    new MessageEmbed()
      .setTitle("ぷにぷにMODMENU 4.115.0")
    .setDescription
    ("👤ダウンロード方法がお分かりの方は```発行```を押してください　　　　　　　　　　　❓ダウンロード方法がわからない方は```How to use Modmenu```を押してください　　　　　　　　　　　🔥検知回避の方法は```検知回避```を押してください")
          .setImage("https://media.discordapp.net/attachments/1077075295431041205/1094432794760978463/1681003496419.png?width=1077&height=606")
          .setColor("RANDOM")
      .addFields(
        {
          name: "⚠️注意事項⚠️",
          value: "```こちらはAndroid専用です。iOSではご利用になりません。MODをダウンロードした後開く前に、(ぷにぷに長押し→iアプリ情報→他のアプリの上に重ねて表示をON)この動作を行ってから開いてください。この動作をしないと開くことができません。```"
        }
        
      )
  ],
  components: [
  {
    type: "ACTION_ROW",
    components: [
      {
        type: "BUTTON",
        customId: "hakkou",
        label: "発行",
        style: "SECONDARY"
      },
      {
        type: "BUTTON",
        customId: "use",
        label: "How to use Modmenu",
        style: "SECONDARY"
      },
      {
        type: "BUTTON",
        customId: "kenti",
        label: "検知回避",
        style: "SECONDARY"
      }
    ]
  }
]
});
  }
    if (interaction.customId === "hakkou") {
      const embed = new MessageEmbed()
      .setTitle("発行停止中")
      .setDescription(`現在MODmenuの配布は中止しています。次イベのMODmenuは<#1209001338571071489>購入できます。`)
      .setColor("RANDOM");
      
      interaction.reply({
        embeds: [embed],
        ephemeral: true
      })
    }
    if (interaction.customId === "hakko") {
  const row = new MessageActionRow().addComponents(
    new MessageButton()
      .setLabel("ダウンロード")
　　.setURL('https://www.mediafire.com/file/5i60nca2qi7o5b7/%25E3%2581%25B7%25E3%2581%25AB%25E3%2581%25B7%25E3%2581%25ABmod_4.118.0.apk/file')
      .setStyle("LINK")
  );

  const embed = new MessageEmbed()
    .setTitle("ぷにぷにMODMENU 4.118.0")
    .setDescription(`次イベント対応MODMENUです`)
    .setColor("RANDOM");

  interaction.reply({
    embeds: [embed],
    components: [row],
    ephemeral: true
  });

  const channelId = '1398145715644923904'; // 送信したいチャンネルのIDに置き換える

  const logMessage =`**発行ログ**
  
ぷにぷにMODmenuが発行されました
  
ユーザー: ${interaction.user.tag}`

  const channel = client.channels.cache.get(channelId);
  if (channel && channel.isText()) {
    channel.send({ embeds: [embed.setDescription(logMessage).setThumbnail(interaction.member.displayAvatarURL()).setColor("RANDOM").setTimestamp()] });
  } else {
    console.log('指定したチャンネルが見つかりませんでした。');
  }
      console.log(`発行user: ${interaction.user.tag}`)
}

  if (interaction.customId == "use") {
    const row = new MessageActionRow().addComponents(
    new MessageButton()
      .setLabel("動画をダウンロード")
      .setURL('https://www.mediafire.com/file/0bas5mgopzgznsr/1125_%281%29%281%29.mov/file')
      .setStyle("LINK")
  );
    
　　　　const embed = new MessageEmbed()
        .setTitle("Modmenu使用方法サンプル動画(提供:hanatyann.)")
        .setDescription(`使用方法またはインストール方法がわからない人向けに作成した動画です。下のボタンからリンクに飛んで動画をダウンロードしてください。`)
        .setColor("RANDOM")
    
    interaction.reply({
    embeds: [embed],
    components: [row],
    ephemeral: true
  });
}
  if (interaction.customId == "kenti") {
    const row = new MessageActionRow().addComponents(
    new MessageButton()
      .setLabel("検知回避の動画はこちら")
      .setURL('https://d.kuku.lu/wgnbys77a')
      .setStyle("LINK")
  );
    
　　　　const embed = new MessageEmbed()
        .setTitle("検知回避について")
        .setDescription(`android12以下の人限定です。BlackBoxという仮想空間をインストールして正規のぷにぷにをその仮想空間に入れてから、modで上書きインストールすると検知回避できるという方法です。詳細のやり方はこちらの動画を見て確認してください。`)
        .setColor("RANDOM")
    
    interaction.reply({
    embeds: [embed],
    components: [row],
    ephemeral: true
  });
}
  if (interaction.customId == "supo") {
    const row = new MessageActionRow().addComponents(
    new MessageButton().setLabel("通常版ダウンロード").setURL('https://www.mediafire.com/file/vew6cdlo5dkzi73/Spotify%E3%83%97%E3%83%AC%E3%83%9F%E3%82%A2%E3%83%A0.apk/file').setStyle("LINK")
  );
    const row2 = new MessageActionRow().addComponents(
    new MessageButton().setLabel("クローン版ダウンロード").setURL('https://www.mediafire.com/file/k1rfvxcrns9rezx/Spotify%E3%83%97%E3%83%AC%E3%83%9F%E3%82%A2%E3%83%A0_%E3%82%AF%E3%83%AD%E3%83%BC%E3%83%B3.apk/file').setStyle("LINK")
  );
      interaction.reply({
        embeds: [
          new MessageEmbed().setTitle("SpotifyプレミアムAPK").setDescription(`Spotifyプレミアム改造済APKです。オフライン再生の機能も利用できるようになりました。広告などもありません。ダウンロードの後、アカウントを作成してない方は作成して利用してください。`).setColor("RANDOM")
        ],
        components: [row,row2],
        ephemeral: true
      });
      }
  if (interaction.customId == "otokuri") {
    const row = new MessageActionRow().addComponents(
    new MessageButton().setLabel("ダウンロード").setURL('https://www.mediafire.com/file/x5jsf5db3w75p70/クリックアシスタント_VIP.apk/file').setStyle("LINK")
  );
      interaction.reply({
        embeds: [
          new MessageEmbed().setTitle("オートクリッカーVIP APK").setDescription(`オートクリッカーVIPAPKです。広告などが発生せず、快適に周回などができるようになっていると思います。`).setColor("RANDOM")
        ],
        components: [row],
        ephemeral: true
      });
      }
  if (interaction.customId == "gg") {
    const row = new MessageActionRow().addComponents(
    new MessageButton()
      .setLabel("ダウンロード")
      .setURL('https://gameguardian.net/download')
      .setStyle("LINK")
  );
      interaction.reply({
        embeds: [
          new MessageEmbed().setTitle("gameguardianはこちら")
                            .setColor("RANDOM")
        ],
        components: [row],
        ephemeral: true
      });
      }
  if(interaction.customId == "kasou") {
      interaction.reply({
        ephemeral: true,
  embeds: [
    new MessageEmbed()
      .setTitle("下記のメニューから使用したい仮想空間を選択してください")
          .setImage("https://media.discordapp.net/attachments/1077075295431041205/1094432794760978463/1681003496419.png?width=1077&height=606")
          .setColor("RANDOM")
      .addFields(
        {
          name: "ぷにぷに仮想空間",
          value: "　"
        },
        {
          name: "にゃんこ大戦争・ツムツム仮想空間",
          value: "　"
        },
      )
  ],
  components: [
    {
      type: "ACTION_ROW",
      components: [
        {
          type: "BUTTON",
          customId: "punipunikasou",
          label: "ぷにぷに仮想空間",
          style: "PRIMARY"
        },
        {
          type: "BUTTON",
          customId: "nyankokasou",
          label: "にゃんこ大戦争・ツムツム仮想空間",
          style: "PRIMARY"
        }
      ]
    }
  ]
});
    }
  if (interaction.customId == "puni1") {
    const row = new MessageActionRow().addComponents(
    new MessageButton()
      .setLabel("ダウンロード")                 
      .setURL('https://www.mediafire.com/file/dig1jecqcavevym/ぷにぷにscript.lua/file')
      .setStyle("LINK")
  );
    const embed = new MessageEmbed()
      .setTitle("ぷにぷにスクリプト")
      .addField('注意事項', '```スクリプト起動後、パスワード入力画面が表示されない場合は、左上の🔲を押し、割り込みと書かれている箇所を押してください。```')
      .setDescription(`スクリプト更新日時 2023/08/01　有効期限日時 2023/08/31 このスクリプトはオンライン形式になっています。メンテナンス時や利用規約に反する行動を発見した場合は利用を停止いたします`)
      .addField('起動パス', '```ruisan767```')
      .setColor("RANDOM")
    
    interaction.reply({
    embeds: [embed],
    components: [row],
    ephemeral: true
  });
    
   const channelId = '1398145715644923904'; // 送信したいチャンネルのIDに置き換える

  const logMessage =`**発行ログ**
  
ぷにぷにscriptが発行されました
  
ユーザー: ${interaction.user.tag}`

  const channel = client.channels.cache.get(channelId);
  if (channel && channel.isText()) {
    channel.send({ embeds: [embed.setDescription(logMessage).setThumbnail(interaction.member.displayAvatarURL()).setColor("RANDOM").setTimestamp()] });
  } else {
    console.log('指定したチャンネルが見つかりませんでした。');
  }
} 
    
  if (interaction.customId == "tumu1") {
    const row = new MessageActionRow().addComponents(
    new MessageButton()
      .setLabel("ダウンロード")
      .setURL('https://www.mediafire.com/file/drywzdwpjopkos2/ツムツムscript.lua/file')
      .setStyle("LINK")
  );
      
    const embed = new MessageEmbed()
    .setTitle("ツムツムスクリプト")
    .setDescription(`起動パスは設定していません。スクリプトはオンライン形式になっています。メンテナンス時や利用規約に反する行動を発見した場合は利用を停止いたします`)
    .setColor("RANDOM")
    
    interaction.reply({
    embeds: [embed],
    components: [row],
    ephemeral: true
  });
    
  const channelId = '1398145715644923904'; // 送信したいチャンネルのIDに置き換える

  const logMessage =`**発行ログ**
  
ツムツムscriptが発行されました
  
ユーザー: ${interaction.user.tag}`

  const channel = client.channels.cache.get(channelId);
  if (channel && channel.isText()) {
    channel.send({ embeds: [embed.setDescription(logMessage).setThumbnail(interaction.member.displayAvatarURL()).setColor("RANDOM").setTimestamp()] });
  } else {
    console.log('指定したチャンネルが見つかりませんでした。');
  }
}
  if (interaction.customId == "cat1"){
    const row = new MessageActionRow().addComponents(
      new MessageButton()
      .setLabel("ダウンロード")
      .setURL("https://www.mediafire.com/file/ovixfcxu0y866n3/%E3%81%AB%E3%82%83%E3%82%93%E3%81%93_RUI.lua/file")
      .setStyle("LINK")
    );
    
    const embed = new MessageEmbed()
    .setTitle("にゃんこ大戦争スクリプト")
    .setDescription(`スクリプト更新日時 2023/08/05　有効期限日時 2023/08/31 このスクリプトはオンライン形式になっています。メンテナンス時や利用規約に反する行動を発見した場合は利用を停止いたします`)
    .addField('起動パス', '```NDrui5796```')
    .setColor("RANDOM")
    
    interaction.reply({
    embeds: [embed],
    components: [row],
    ephemeral: true
  });
    
  const channelId = '1398145715644923904'; // 送信したいチャンネルのIDに置き換える

  const logMessage =`**発行ログ**
  
にゃんこ大戦争scriptが発行されました
  
ユーザー: ${interaction.user.tag}`

  const channel = client.channels.cache.get(channelId);
  if (channel && channel.isText()) {
    channel.send({ embeds: [embed.setDescription(logMessage).setThumbnail(interaction.member.displayAvatarURL()).setColor("RANDOM").setTimestamp()] });
  } else {
    console.log('指定したチャンネルが見つかりませんでした。');
  }
}
  if (interaction.customId == "anngou"){
    const row = new MessageActionRow().addComponents(
      new MessageButton()
      .setLabel("ダウンロード")
.setURL("https://www.mediafire.com/file/3xnfn52jfnc7xom/%E6%9A%97%E5%8F%B7%E5%8C%96%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%97%E3%83%88_RUI.lua/file")
      .setStyle("LINK")
    );
    
    const embed = new MessageEmbed()
    .setTitle("暗号化スクリプト")
    .setColor("RANDOM")
    
    interaction.reply({
    embeds: [embed],
    components: [row],
    ephemeral: true
  });
    
  const channelId = '1398145715644923904'; // 送信したいチャンネルのIDに置き換える

  const logMessage =`**発行ログ**
  
暗号化スクリプトが発行されました
  
ユーザー: ${interaction.user.tag}`

  const channel = client.channels.cache.get(channelId);
  if (channel && channel.isText()) {
    channel.send({ embeds: [embed.setDescription(logMessage).setThumbnail(interaction.member.displayAvatarURL()).setColor("RANDOM").setTimestamp()] });
  } else {
    console.log('指定したチャンネルが見つかりませんでした。');
  }
}
   if (interaction.customId == "tem"){
    const row = new MessageActionRow().addComponents(
      new MessageButton()
      .setLabel("ダウンロード")
.setURL("https://www.mediafire.com/file/rm1w2c4wcezru2e/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%97%E3%83%88%E3%83%86%E3%83%B3%E3%83%97%E3%83%AC%E3%83%BC%E3%83%88__%E4%BD%9C%E6%88%90%E8%80%85-RUI.lua/file")
      .setStyle("LINK")
    );
    
    const embed = new MessageEmbed()
    .setTitle("スクリプトテンプレート")
    .setColor("RANDOM")
    
    interaction.reply({
    embeds: [embed],
    components: [row],
    ephemeral: true
  });
    
  const channelId = '1398145715644923904'; // 送信したいチャンネルのIDに置き換える

  const logMessage =`**発行ログ**
  
スクリプトテンプレートが発行されました
  
ユーザー: ${interaction.user.tag}`

  const channel = client.channels.cache.get(channelId);
  if (channel && channel.isText()) {
    channel.send({ embeds: [embed.setDescription(logMessage).setThumbnail(interaction.member.displayAvatarURL()).setColor("RANDOM").setTimestamp()] });
  } else {
    console.log('指定したチャンネルが見つかりませんでした。');
  }
}
  if(interaction.customId == "punipunikasou") {
      interaction.reply({
        ephemeral: true,
  embeds: [
    new MessageEmbed()
      .setTitle("下記のメニューから使用したい仮想空間を選択してください")
          .setImage("https://media.discordapp.net/attachments/1077075295431041205/1094432794760978463/1681003496419.png?width=1077&height=606")
          .setColor("RANDOM")
      .addFields(
        {
          name: "x8sandbox",
          value: "　"
        },
        {
          name: "F1VM",
          value: "　"
        },
        {
          name: "Blackbox",
          value: "　"
        },
      )
  ],
  components: [
    {
      type: "ACTION_ROW",
      components: [
        {
          type: "BUTTON",
          customId: "x8",
          label: "x8sandbox",
          style: "PRIMARY"
        },
        {
          type: "BUTTON",
          customId: "f1",
          label: "F1VM",
          style: "PRIMARY"
        },
        {
          type: "BUTTON",
          customId: "black",
          label: "Blackbox",
          style: "PRIMARY"
        }
      ]
    }
  ]
});
    }
    if (interaction.customId == "x8") {
       const row = new MessageActionRow().addComponents(
    new MessageButton().setLabel("ダウンロード").setURL('https://www.mediafire.com/file/ifjj8o69cihao86/X8_Sandbox_VIP_gb.apk/file').setStyle("LINK")
  );
      interaction.reply({
        embeds: [
          new MessageEmbed()
          .setTitle("x8sandbox")
          .addField('VIP版です', '広告スキップやVIP機能がしようできます。')
          .setDescription(`64bitにしたい場合は設定から64appssupportをONにしてください`)
          .setColor("RANDOM")
        ],
        components: [row],
    ephemeral: true
  });
    }
    if (interaction.customId == "f1") {
      const row = new MessageActionRow().addComponents(
    new MessageButton().setLabel("ダウンロード").setURL('https://www.mediafire.com/file/2ichlyz5aq0nr7s/F1_VM_Global_Stable.apk/file').setStyle("LINK")
  );
      interaction.reply({
        embeds: [
          new MessageEmbed()
          .setTitle("F1VM")
          .setDescription(`VIP版です広告スキップやVIP機能がしようできます。`)
          .setColor("RANDOM")
        ],
        components: [row],
    ephemeral: true
  });
    }
    if (interaction.customId == "black") {
      const row = new MessageActionRow().addComponents(
    new MessageButton().setLabel("ダウンロード").setURL('https://www.mediafire.com/file/51hbfmoxri9mvl1/BlackBox_64bit.apk/file').setStyle("LINK")
  );
      interaction.reply({
        embeds: [
          new MessageEmbed()
          .setTitle("BlackBox")
          .setDescription(`64bitの仮想空間です。`)
          .setColor("RANDOM")
        ],
        components: [row],
    ephemeral: true
  });
    }
  if(interaction.customId == "nyankokasou") {
      interaction.reply({
        ephemeral: true,
  embeds: [
    new MessageEmbed()
      .setTitle("下記のメニューから使用したい仮想空間を選択してください")
          .setImage("https://media.discordapp.net/attachments/1077075295431041205/1094432794760978463/1681003496419.png?width=1077&height=606")
          .setColor("RANDOM")
      .addFields(
        {
          name: "KGO Multi Space",
          value: "　"
        },
        {
          name: "Clone App",
          value: "　"
        },
        {
          name: "Multiple Accounts",
          value: "　"
        },
         {
          name: "DualSpace 64bit",
          value: "　"
        },
      )
  ],
  components: [
    {
      type: "ACTION_ROW",
      components: [
        {
          type: "BUTTON",
          customId: "kgo",
          label: "KGO Multi Space",
          style: "PRIMARY"
        },
        {
          type: "BUTTON",
          customId: "clone",
          label: "Clone App",
          style: "PRIMARY"
        },
        {
          type: "BUTTON",
          customId: "multi",
          label: "Multiple Accounts",
          style: "PRIMARY"
        },
        {
          type: "BUTTON",
          customId: "dual",
          label: "DualSpace 64bit",
          style: "PRIMARY"
        }
      ]
    }
  ]
});
    }
   if (interaction.customId == "kgo") {
      const row = new MessageActionRow().addComponents(
    new MessageButton().setLabel("ダウンロード").setURL('https://www.mediafire.com/file/xl4lharngordzgm/KGO_Multi_Space_1.4.0.apk/file').setStyle("LINK")
  );
      interaction.reply({
        embeds: [
          new MessageEmbed()
          .setTitle("KGO Multi Space")
          .setDescription(`64bitの仮想空間です。主ににゃんこ、ツムツムで使用できます`)
          .setColor("RANDOM")
        ],
        components: [row],
    ephemeral: true
  });
    }
  if (interaction.customId == "clone") {
      const row = new MessageActionRow().addComponents(
    new MessageButton().setLabel("ダウンロード").setURL('https://www.mediafire.com/file/99mi2ssbtehxges/ca_vip.apk/file').setStyle("LINK")
  );
      interaction.reply({
        embeds: [
          new MessageEmbed()
          .setTitle("Clone App")
          .setDescription(`64bitの仮想空間です。主ににゃんこ、ツムツムで使用できます`)
          .setColor("RANDOM")
        ],
        components: [row],
    ephemeral: true
  });
    }
  client.on('interactionCreate', async interaction => {
  if (!interaction.isButton()) return;

  if (interaction.customId === "multi") {
    const row = new MessageActionRow().addComponents(
      new MessageButton().setLabel("ダウンロード1").setURL('https://www.mediafire.com/file/0lfktryrkta1v77/Multiple_Accounts_4.0.4.apk/file').setStyle("LINK"),
    );
    
    const row2 = new MessageActionRow().addComponents(
      new MessageButton().setLabel("ダウンロード").setURL('https://www.mediafire.com/file/cjhmjpmwfztyj9u/Multiple_Accounts_Assist_3.1.4.apk/file').setStyle("LINK")
    );
    interaction.reply({
        embeds: [
            new MessageEmbed()
                .setTitle("Multiple_Accounts")
                .setDescription("https://www.mediafire.com/file/0lfktryrkta1v77/Multiple_Accounts_4.0.4.apk/file")
                .addFields(
        {
          name: "詳細",
          value: "64bitの仮想空間です。主ににゃんこ、ツムツムで使用できます"
        }
      )
                .setColor("RANDOM"),
            new MessageEmbed()
                .setTitle("Multiple_Accounts_Assist")
                .setDescription("https://www.mediafire.com/file/cjhmjpmwfztyj9u/Multiple_Accounts_Assist_3.1.4.apk/file")
          　　　　.addFields(
        {
          name: "詳細",
          value: "Multiple_Accountsで64bitの仮想空間を使用したい場合こちらもインストールしてください"
        }
      )
                .setColor("RANDOM")
        ],
        ephemeral: true
    });
}

    });

    if (interaction.customId == "dual") {
      const row = new MessageActionRow().addComponents(
    new MessageButton().setLabel("ダウンロード").setURL('https://www.mediafire.com/file/ss2c9v1wpqww1gi/%255B64%255D_Yomiya_Virtual.apk/file').setStyle("LINK")
  );
      interaction.reply({
        embeds: [
          new MessageEmbed()
          .setTitle("KGO Dual Spase")
          .setDescription(`64bitの仮想空間です。`)
          .setColor("RANDOM")
        ],
        components: [row],
    ephemeral: true
  });
    }
   if (interaction.customId == "kinou") {
     interaction.reply({
  ephemeral: true,
  embeds: [
    new MessageEmbed()
      .setTitle("MODMENUサンプル画像")
      .setColor("RANDOM")
      .setDescription("希望のゲームを選択してください")
      .addFields(
        {
          name: "ぷにぷに",
          value: "```ぷにぷにMODのサンプル画像を表示します```"
        },
        {
          name: "モンスト",
          value: "```モンストMODのサンプル画像を表示します```"
        },
        {
          name: "にゃんこ大戦争",
          value: "```にゃんこ大戦争MODのサンプル画像を表示します```"
        }
      )
  ],
  components: [
    {
      type: "ACTION_ROW",
      components: [
        {
          type: "BUTTON",
          customId: "punisannpuru",
          label: "ぷにぷに",
          style: "PRIMARY"
        },
        {
          type: "BUTTON",
          customId: "monstsannpuru",
          label: "モンスト",
          style: "PRIMARY"
        },
        {
          type: "BUTTON",
          customId: "nyankomod",
          label: "にゃんこ大戦争",
          style: "PRIMARY"
        }
      ]
    }
  ]
});
}
if (interaction.customId == "punisannpuru") {
  interaction.reply({
        embeds: [
            new MessageEmbed()
                .setTitle("ぷにぷにmodmenuのサンプル画像1")
                .setImage("https://cdn.glitch.global/b54c7a90-8fd2-4a3e-80a4-f932cc3ceb84/Screenshot_2024-09-27-23-39-53-92_877b9e2624ae66eb3b69c29161939622.jpg?v=1727448293623")
                .setColor("RANDOM"),
            new MessageEmbed()
                .setTitle("ぷにぷにmodmenuのサンプル画像2")
                .setImage("https://cdn.glitch.global/b54c7a90-8fd2-4a3e-80a4-f932cc3ceb84/Screenshot_2024-09-27-23-40-09-84_877b9e2624ae66eb3b69c29161939622.jpg?v=1727448313335")  // 2枚目の画像のURLをここに設定
                .setColor("RANDOM"),
          new MessageEmbed()
          .setTitle("ぷにぷにmodmenuのサンプル画像3")
          .setImage("https://cdn.glitch.global/b54c7a90-8fd2-4a3e-80a4-f932cc3ceb84/Screenshot_2024-09-27-23-40-30-48_877b9e2624ae66eb3b69c29161939622.jpg?v=1727448330886")
          .setColor("RANDOM")
        ],
        ephemeral: true
    });
}
if (interaction.customId == "monstsannpuru") {
  interaction.reply({
        embeds: [
            new MessageEmbed()
                .setTitle("モンストmodmenuのサンプル画像")
                .setImage("https://cdn.glitch.global/b54c7a90-8fd2-4a3e-80a4-f932cc3ceb84/Screenshot_2025-01-18-15-32-14-13_cbd562ce82a705f854bb1ae68e4a34f5.jpg?v=1737182180764")
                .setColor("RANDOM"),
        ],
        ephemeral: true
    });
}
if (interaction.customId == "nyankomod") {
  interaction.reply({
        embeds: [
            new MessageEmbed()
                .setTitle("にゃんこ大戦争modmenuのサンプル画像")
                .setImage("https://cdn.glitch.global/a063b1f5-d6e3-455e-b4b0-96bbcea69b27/Screenshot_2024-08-18-05-18-29-48_877b9e2624ae66eb3b69c29161939622.jpg?v=1723926022849")
                .setColor("RANDOM"),
        ],
        ephemeral: true
    });
}
});

client.once('ready', async () => {
  
  try {
    await client.application.commands.create({
     name: 'panel',
    description: '対応状況パネルを設置',
      options: [
        // オプションを追加することができます
      ],
    });
  } catch (error) {
    console.error(error);
  }
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;
  if (interaction.commandName === 'panel') {
     if(!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply({ content: "サーバー管理者しか使えません", ephemeral: true })
    const embed = new MessageEmbed()
    .setTitle("対応状況")
    .setDescription("現在対応可能です")
.setImage("https://media.discordapp.net/attachments/1133014806966849671/1177633578478223461/1700840113611.png?ex=657337bc&is=6560c2bc&hm=9351a9c177a1d9c9dede6f6a&=&width=680&height=680")
    .setColor("GREEN")
    interaction.reply({ embeds: [ embed ], components: [ newbutton([ { id: "switch", emoji: "🔔" } ]) ] })
     }
});

client.on("interactionCreate", async interaction => {
  if (!interaction.isButton()) {
    return;
  }

  if (interaction.customId == "switch") {
    if (!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply({ content: "サーバー管理者しか使えません", ephemeral: true });

    let content, color, image;
    const description = interaction.message.embeds[0].description;

    if (description == "現在対応可能です") {
      content = "現在対応不可能です";
      color = "RED";
      image = "https://aserora.net/batu.png";
    } else if (description == "現在対応不可能です") {
      content = "現在対応可能です";
      color = "GREEN";
      image = "https://aserora.net/maru.png";
    }
    
    const embed = new MessageEmbed()
    .setTitle("対応状況")
    .setDescription(content)
    .setImage(image)
    .setColor(color)

    const update = new MessageEmbed()
      .setTitle("対応状況")
      .setDescription("対応状況が変更されました <#1177635882770108596>を確認してください。")
      .setColor(color);

    // Replace 'CHANNEL_ID' with the actual channel ID where you want to send the message
    const channel = interaction.client.channels.cache.get('1209002564725641326');

    if (channel && channel.isText()) {
      await channel.send({ embeds: [update] });
    } else {
      console.error("Invalid channel or channel is not a text channel.");
    }

    await interaction.message.edit({ embeds: [embed], components: [newbutton([{ id: "switch", emoji: "🔔" }])] });
    await interaction.deferUpdate();
  }
});

client.on("messageCreate", async (message) => {
  if (message.content === "r.guildinfo") {
    const guildInfo = client.guilds.cache.map((guild) => `${guild.name} (ID: ${guild.id})`);

    const embed = new MessageEmbed()
      .setTitle("導入サーバー")
      .setDescription(guildInfo.join("\n"))
      .setColor("#0099ff");

    message.channel.send({ embeds: [embed] });
  }

  if (message.content.startsWith("r.l")) {
    const args = message.content.split(" ");
    if (args.length !== 2) {
      return message.channel.send("正しい形式: r.shopleave サーバーID");
    }

    const guildId = args[1];
    const guild = client.guilds.cache.get(guildId);

    if (!guild) {
      return message.channel.send(`指定されたサーバーID: ${guildId} は見つかりませんでした。`);
    }

    try {
      await guild.leave();
      message.channel.send(`サーバー ${guild.name} から退出しました。`);
    } catch (error) {
      console.error(`Failed to leave guild: ${error}`);
      message.channel.send(`サーバー ${guild.name} から退出できませんでした。`);
    }
  }
});

client.on("messageCreate", async (message) => {
  if (message.content === "r.service") {

    const embed = new MessageEmbed()
      .setTitle("ぷにぷにスクリプト配布")
      .setDescription(`**スクリプト機能に関して**\nぷにぷにスクリプトの機能内容が確認したい方は\n<#1215243439499644948>にてご確認ください\n\n**スクリプトの使用方法に関して**\nぷにぷにスクリプトの使用方法がわからないよという方は<#1209002564725641326>にてご質問を行うか、個別での詳しいサポートが必要な方は<#1273885219824341044>にてご購入ください\n\n**配布メニュー**`)
      .addFields(
        {
          name: "1,ぷにぷにスクリプト_4.130.0",
          value: "UG,Androidに対応しています"
        },
        {
          name: "2,ぷにぷにLDスクリプト_4.130.0",
          value: "LD,NOXに対応しています"
        },
      )
      .setColor("RANDOM");

    message.channel.send({ 
      embeds: [embed],
      components: [
    {
      type: "ACTION_ROW",
      components: [
        {
          type: "BUTTON",
          customId: "puniscript",
          label: "1,ぷにぷにスクリプト",
          style: "SECONDARY"
        },
        {
          type: "BUTTON",
          customId: "punildscript",
          label: "2,ぷにぷにLDスクリプト",
          style: "SECONDARY"
        }
      ]
    }
  ]
    });
  }
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isButton()) return;
  if (interaction.customId === "puniscript") {
  const row = new MessageActionRow().addComponents(
    new MessageButton()
      .setLabel("ダウンロード")
　　.setURL('https://www.mediafire.com/file/xtizyuhno8fmpk9/%25E3%2581%25B7%25E3%2581%25AB%25E3%2581%25B7%25E3%2581%25ABSCRIPT_4.130.0.lua/file')
      .setStyle("LINK")
  );

  const embed = new MessageEmbed()
    .setTitle("ぷにぷにスクリプト")
    .setDescription(`次イベント対応,UG,Android対応のスクリプトです`)
    .setColor("RANDOM");

  interaction.reply({
    embeds: [embed],
    components: [row],
    ephemeral: true
  });

  const channelId = '1398145715644923904'; // 送信したいチャンネルのIDに置き換える

  const logMessage =`**発行ログ**
  
ぷにぷにスクリプトが発行されました
  
ユーザー: ${interaction.user.tag}`

  const channel = client.channels.cache.get(channelId);
  if (channel && channel.isText()) {
    channel.send({ embeds: [embed.setDescription(logMessage).setThumbnail(interaction.member.displayAvatarURL()).setColor("RANDOM").setTimestamp()] });
  } else {
    console.log('指定したチャンネルが見つかりませんでした。');
  }
      console.log(`発行user: ${interaction.user.tag}`)
}
  
  if (interaction.customId === "punildscript") {
  const row = new MessageActionRow().addComponents(
    new MessageButton()
      .setLabel("ダウンロード")
　　.setURL('https://www.mediafire.com/file/yv6yzivefbq3e3p/%25E3%2581%25B7%25E3%2581%25AB%25E3%2581%25B7%25E3%2581%25ABLD%25E3%2582%25B9%25E3%2582%25AF%25E3%2583%25AA%25E3%2583%2597%25E3%2583%2588_4.130.0.lua/file')
      .setStyle("LINK")
  );

  const embed = new MessageEmbed()
    .setTitle("ぷにぷにLDスクリプト")
    .setDescription(`次イベント対応,LD,NOXのスクリプトです`)
    .setColor("RANDOM");

  interaction.reply({
    embeds: [embed],
    components: [row],
    ephemeral: true
  });

  const channelId = '1398145715644923904'; // 送信したいチャンネルのIDに置き換える

  const logMessage =`**発行ログ**
  
ぷにぷにスクリプトが発行されました
  
ユーザー: ${interaction.user.tag}`

  const channel = client.channels.cache.get(channelId);
  if (channel && channel.isText()) {
    channel.send({ embeds: [embed.setDescription(logMessage).setThumbnail(interaction.member.displayAvatarURL()).setColor("RANDOM").setTimestamp()] });
  } else {
    console.log('指定したチャンネルが見つかりませんでした。');
  }
      console.log(`発行user: ${interaction.user.tag}`)
}
});

process.on("uncaughtException", (error) => {
  console.error("未処理の例外:", error);
  fs.appendFileSync("error.log", `未処理の例外: ${error.stack}\n`);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("未処理の拒否:", reason);
  fs.appendFileSync("error.log", `未処理の拒否: ${reason}\n`);
});
//ここまで

client.login(process.env.DISCORD_TOKEN);
