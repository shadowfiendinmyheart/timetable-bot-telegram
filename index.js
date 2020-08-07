const Telegraf = require('telegraf')
const config = require('config')
const SceneGenerator = require('./Scenes')
const textClass = require('./data/text')
const logic = require('./data/Logic')
const {
    Extra,
    Markup,
    Stage,
    session
  } = Telegraf
const bot = new Telegraf(config.get('Telegraf.token'));
const curScene = new SceneGenerator()
const timtableScene = curScene.GenTimetableScene()
const teacherScene = curScene.GenTeacherScene()
const classroomScene = curScene.GenClassroomScene()
const groupScene = curScene.GenGroupScene()
const subscribeScene = curScene.GenSubscribeScene()
const text = new textClass();

bot.use(Telegraf.log())

const stage = new Stage([timtableScene, teacherScene, classroomScene, groupScene, subscribeScene])

bot.use(session())
bot.use(stage.middleware())

bot.start(async (ctx) => {
  ctx.reply('Приветствую, ' + ctx.message.from.username + ', я бот, который подскажет тебе расписание в УДГУ(ИМИТИФ): ')
  logic.setName(ctx.message.from.username);
  ctx.reply(text.getMenuText());
})

bot.command('teacher', async (ctx) => {
  ctx.scene.enter('teacher')
})

bot.command('timetable', async (ctx) => {
  if (await logic.checkGroup(ctx.message.from.username) == true) {
    ctx.scene.enter('timetable')
  } else {
    ctx.reply('Выбери свою группу:');
    ctx.scene.enter('group')
  }
})

bot.command('group', async (ctx) => {
  ctx.reply('Выбери свою группу:');
  ctx.scene.enter('group')
})

bot.command('subscribe', async (ctx) => {
  if (await logic.checkGroup(ctx.message.from.username) == true) {
    ctx.scene.enter('subscribe')
  } else {
    ctx.reply('Выбери свою группу:');
    ctx.scene.enter('group')
  }
})

bot.command('classroom', async (ctx) => {
  ctx.scene.enter('classroom')
})

bot.help(async (ctx) => {
  ctx.reply('По всем вопросам - @shadowfiend15yo');
})

bot.launch()