const Scene = require('telegraf/scenes/base')
const parseTime = require('parse-loose-time')
const dataBase = require('./data/DataBase')
const queryClass = require('./data/query')
const textClass = require('./data/text')
const logic = require('./data/Logic')
const query = new queryClass();
const text = new textClass();

var subscribeFlag = false;

async function getTimetableDay (group, day, ctx) {
    var showMessage = await dataBase.withTwoAurguments(group, day, query.getDailyTimetable());
    await ctx.reply('Расписание на ' + day + ":")
    for (i = 0; i < showMessage.length; i++) {
        await ctx.reply("\n#️⃣ " + showMessage[i].lesson_number + " пара" +
                "\n🌐Чётность: " + showMessage[i].parity_name + 
                "\n📘Название предмета: " + showMessage[i].study_subject_name + "(" + showMessage[i].type_lesson_name + ")" + 
                "\n🧑‍🏫Преподаватель: " + showMessage[i].teacher_name + 
                "\n🚪Кабинет: " + showMessage[i].classroom_name);
    }
}

class SceneGenerator {

    GenGroupScene() {
        const group = new Scene('group');
        group.enter(async (ctx) => {
            let group = await dataBase.withoutAurguments(query.getGropus())
            var groupList = ""
            for (let i = 0; i < group.length; i++) {
                groupList = groupList + i + " - " + group[i].team_name + "\n";
            }
            await ctx.reply(groupList)
        })

        group.command('leave', async (ctx) => {
            await ctx.reply(text.getMenuText())
            await ctx.scene.leave()
        })

        group.on('text', async (ctx) => {
            const answer = ctx.message.text;
            var group = await dataBase.withoutAurguments(query.getGropus())
            if (answer <= group.length && answer >= 0) {
                let chooseGroup = group[answer].team_name;
                logic.setGroup(ctx.message.from.username, chooseGroup);
                await ctx.reply('Твоя группа - ' + chooseGroup)
                await ctx.scene.leave()
                await ctx.reply(text.getMenuText())
            } else {
                ctx.reply('Не понимаю тебя, если хочешь сбежать, просто напиши /leave')
            }
        })
        return group;
    }

    GenSubscribeScene() {
        const subscribe = new Scene('subscribe');
        subscribe.enter(async (ctx) => {
            await ctx.reply('Выбери удобное время, чтобы получать расписание ежедневно.\nЧтобы отказаться от рассылки нажиите - /cancel')
        })

        subscribe.on('text', async (ctx) => {
            const answer = ctx.message.text;
            var subscribeHour = 0;
            var subscribeMinute = 0;

            if (answer == '/leave') {
                await ctx.reply(text.getMenuText())
                await ctx.scene.leave()
            } else {
                if (answer =='/cancel') {
                    subscribeFlag = false;
                    await ctx.reply(text.getMenuText())
                    await ctx.scene.leave();
                } else {
                    try {
                        subscribeHour = await parseTime(answer).hour;
                        subscribeMinute = await parseTime(answer).minute;
                        let time = subscribeHour + ':' + subscribeMinute;
                        logic.setTimeUser(time, ctx.message.from.username);
                        if (subscribeMinute < 10) {
                            ctx.reply('Каждый день вы будете получать расписание в это время - ' + subscribeHour + ':0' + subscribeMinute);
                        } else {
                            ctx.reply('Каждый день вы будете получать расписание в это время - ' + subscribeHour + ':' + subscribeMinute);
                        }
                        subscribeFlag = true;
                        await checkTime(subscribeHour, subscribeMinute, ctx);
                        await ctx.reply(text.getMenuText())
                        await ctx.scene.leave();
                    } catch(e) {
                        console.log("WARNING: я поймал ошибку бро, вот она - " + e);
                        await ctx.reply("Попробуй снова....")
                    }
                }  
            }
        })

        async function checkTime(subscribeHour, subscribeMinute, ctx) {
            var checkerTime = setInterval(() => {
                if (subscribeFlag == false) {
                    clearInterval(checkerTime);
                } else {
                    var todayDate = new Date();
                    var hour = todayDate.getHours();
                    var minute = todayDate.getMinutes();
                    var days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']
                    console.log("request from " +  ctx.message.from.username + " - " + hour + ":" + minute);
                    if (subscribeHour == hour && subscribeMinute == minute) {
                        async function go() {
                            let group = await dataBase.withOneAurguments(ctx.message.from.username, query.getUserGroup())
                            let chooseGroup = group[0].group_name;
                            var today = todayDate.getDay();
                            await getTimetableDay(chooseGroup, days[today], ctx);
                        }
                        go();
                    }
                }
            }, 60000)
        }

        return subscribe;
    }

    GenTeacherScene() {
        const teacher = new Scene('teacher');
        teacher.enter(async (ctx) => {
            await ctx.reply('Выбери ФИО преподавателя')
            var teachers = await dataBase.withoutAurguments(query.getTeachers())
            var teacherList = "";
            for (var i = 0; i < teachers.length; i++) {
                teacherList = teacherList + i + " - " + teachers[i].teacher_name + "\n";
            }
            await ctx.reply(teacherList)
        })

        teacher.on('text', async (ctx) => {
            const answer = ctx.message.text;
            var chooseTeacher;
            var teachers = await dataBase.withoutAurguments(query.getTeachers())
            if (answer == '/leave') {
                await ctx.reply(text.getMenuText())
                await ctx.scene.leave()
            } else {
                if (answer <= teachers.length && answer >= 0) {
                    chooseTeacher = teachers[answer].teacher_name;
                    await ctx.reply('Расписание ' + chooseTeacher)
                    var showMessage = await dataBase.withOneAurguments(chooseTeacher, query.getTeacherQuery());
                    for (var i = 0; i < showMessage.length; i++) {
                    await ctx.reply("👀День недели: " + showMessage[i].day_name + 
                                "\n#️⃣ " + showMessage[i].lesson_number + " пара" + 
                                "\n📘Название предмета: " + showMessage[i].study_subject_name + "(" + showMessage[i].type_lesson_name + ")" + 
                                "\n🚪Кабинет: " + showMessage[i].classroom_name);
                    }
                    await ctx.reply(text.getQuitText())
                } else {
                    ctx.reply("Не понимаю тебя, если хочешь сбежать, просто напиши '/leave'")
                }
            }
        })
        return teacher
    }

    GenClassroomScene() {
        const classroom = new Scene('classroom');
        classroom.enter(async (ctx) => {
            await ctx.reply('Выбери кабинет')
            var classrooms = await dataBase.withoutAurguments(query.getClassrooms())
            var classroomsList = "";
            for (var i = 0; i < classrooms.length; i++) {
                classroomsList = classroomsList + i + " - " + classrooms[i].classroom_name + "\n";
            }
            await ctx.reply(classroomsList)
        })

        classroom.on('text', async (ctx) => {
            const answer = ctx.message.text;
            var chooseClassroom;
            var classrooms = await dataBase.withoutAurguments(query.getClassrooms())
            if (answer == '/leave') {
                await ctx.reply(text.getMenuText())
                await ctx.scene.leave()
            } else {
                if (answer <= classrooms.length && answer >= 0) {
                    chooseClassroom = classrooms[answer].classroom_name;
                    await ctx.reply('Расписание ' + chooseClassroom)
                    var showMessage = await dataBase.withOneAurguments(chooseClassroom, query.getClassroomTable());
                    for (var i = 0; i < showMessage.length; i++) {
                    await ctx.reply("👀День недели: " + showMessage[i].day_name + 
                                "\n#️⃣ " + showMessage[i].lesson_number + " пара" + 
                                "\n📘Название предмета: " + showMessage[i].study_subject_name + "(" + showMessage[i].type_lesson_name + ")" + 
                                "\n🧑‍🏫Преподаватель: " + showMessage[i].teacher_name + 
                                "\n🚶Группа: " + showMessage[i].team_name);
                    }
                    await ctx.reply(text.getQuitText())
                } else {
                    ctx.reply("Не понимаю тебя, если хочешь сбежать, просто напиши '/leave'")
                }
            }
        })

        return classroom
    }

    GenTimetableScene() {
        const timetable = new Scene('timetable');
        var chooseGroup;
        timetable.enter(async (ctx) => {
            if (await logic.checkGroup(ctx.message.from.username) == false) {
                await ctx.reply('Сначала выбери группу')
                await ctx.reply(text.getMenuText())
                await ctx.scene.leave();    
            } else {
                let group  = await dataBase.withOneAurguments(ctx.message.from.username, query.getUserGroup())
                chooseGroup = group[0].group_name;
                await ctx.reply('Твоя группа - ' + chooseGroup);
                await ctx.reply(text.getTimetableMenuText());
            }
        })

        timetable.command('leave', async (ctx) => {
            await ctx.reply(text.getMenuText())
            await ctx.scene.leave()
        })

        timetable.command('tomorrow', async (ctx) => {
            var today = new Date().getDay()
            var days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']
            if (days[today] === 'Суббота') {
                await ctx.reply('Расслабься, старичок, завтра выходной')
            } else {
                await getTimetableDay(chooseGroup, days[today + 1], ctx);
            }
            await ctx.reply(text.getTimetableMenuText())
        })

        timetable.command('week', async (ctx) => {
            ctx.reply('Расписание на неделю: ')
            var showMessage = await dataBase.withOneAurguments(chooseGroup, query.getTimetableQuery());
            for (var i = 0; i < showMessage.length; i++) {
                await ctx.reply("👀День недели: " + showMessage[i].day_name + 
                                "\n#️⃣ " + showMessage[i].lesson_number + " пара" +
                                "\n🌐Чётность: " + showMessage[i].parity_name + 
                                "\n📘Название предмета: " + showMessage[i].study_subject_name + "(" + showMessage[i].type_lesson_name + ")" + 
                                "\n🧑‍🏫Преподаватель: " + showMessage[i].teacher_name + 
                                "\n🚪Кабинет: " + showMessage[i].classroom_name);
            }
            ctx.reply(text.getTimetableMenuText())
        })

        timetable.command('day', async (ctx) => {
            await ctx.telegram.sendMessage(ctx.chat.id, 'Выбери день недели',
            {
                reply_markup: {
                inline_keyboard: [
                    [{text: "Понедельник", callback_data: "monday"}],
                    [{text: "Вторник", callback_data: "tuesday"}],
                    [{text: "Среда", callback_data: "wednsday"}],
                    [{text: "Четверг", callback_data: "thursday"}],
                    [{text: "Пятница", callback_data: "friday"}],
                    [{text: "Суббота", callback_data: "saturday"}],
                ]
            }
        })
        })

        timetable.action('monday', async (ctx) => { 
            await getTimetableDay(chooseGroup, "Понедельник", ctx);
            await ctx.reply(text.getTimetableMenuText())
        })

        timetable.action('tuesday', async (ctx) => { 
            await getTimetableDay(chooseGroup, "Вторник", ctx);
            await ctx.reply(text.getTimetableMenuText())
        })

        timetable.action('wednsday', async (ctx) => { 
            await getTimetableDay(chooseGroup, "Среда", ctx);
            await ctx.reply(text.getTimetableMenuText())
        })

        timetable.action('thursday', async (ctx) => { 
            await getTimetableDay(chooseGroup, "Четверг", ctx);
            await ctx.reply(text.getTimetableMenuText())
        })

        timetable.action('friday', async (ctx) => { 
            await  getTimetableDay(chooseGroup, "Пятница", ctx);
            await ctx.reply(text.getTimetableMenuText())
        })

        timetable.action('saturday', async (ctx) => { 
            await getTimetableDay(chooseGroup, "Суббота", ctx);
            await ctx.reply(text.getTimetableMenuText())
        })
        
        timetable.on('text', async (ctx) => {
            const answer = ctx.message.text;
            ctx.reply('Не понимаю тебя, если хочешь сбежать, просто напиши /leave')
        })

        return timetable;
    }
    
}

module.exports = SceneGenerator