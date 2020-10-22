const Scene = require('telegraf/scenes/base')
const parseTime = require('parse-loose-time')
const dataBase = require('./data/DataBase')
const queryClass = require('./data/query')
const textClass = require('./data/text')
const logic = require('./data/Logic')
const query = new queryClass();
const text = new textClass();

var subscribeFlag = false;
var enterTeacherFindFlag = false;
var groupChooseFlag = false;
var findClassroom = '';
var teachersMassive;
var course;
var institute;

async function showGroups(ctx, course, institute) {
    var group = await dataBase.withTwoAurguments(course, institute ,query.getGropus())
    var groupList = ""
    for (let i = 0; i < group.length; i++) {
        groupList = groupList + i + " - " + group[i].team_name + "\n";
    }
    if (groupList.length == 0) {
        await ctx.reply(text.getCantFindGroupText());
        await ctx.reply(text.getMenuText());
        ctx.scene.leave();
    } else {
        await ctx.reply(groupList);
    }
    return;
}
async function chooseCourse(ctx, group) {
    await ctx.telegram.sendMessage(ctx.chat.id, text.getGroupCourseText(),
        {
            reply_markup: {
            inline_keyboard: [
                [{text: "1 курс", callback_data: "first"}],
                [{text: "2 курс", callback_data: "second"}],
                [{text: "3 курс", callback_data: "third"}],
                [{text: "4 курс", callback_data: "fourth"}],
                [{text: "5 курс", callback_data: "fifth"}],
                [{text: "6 курс", callback_data: "sixth"}],
            ]
        }
        })

    group.action('first', async (ctx) => {
        course = '1';
        await ctx.reply(text.getGroupChooseText());
        groupChooseFlag = true;
        showGroups(ctx, course, institute);
        return;
    })

    group.action('second', async (ctx) => {
        course = '2';
        await ctx.reply(text.getGroupChooseText());
        groupChooseFlag = true;
        showGroups(ctx, course, institute);
        return;
    })

    group.action('third', async (ctx) => {
        course = '3';
        await ctx.reply(text.getGroupChooseText());
        groupChooseFlag = true;
        showGroups(ctx, course, institute);
        return;
    })

    group.action('fourth', async (ctx) => {
        course = '4';
        await ctx.reply(text.getGroupChooseText());
        groupChooseFlag = true;
        showGroups(ctx, course, institute);
        return;
    })

    group.action('fifth', async (ctx) => {
        course = '5';
        await ctx.reply(text.getGroupChooseText());
        groupChooseFlag = true;
        showGroups(ctx, course, institute);
        return;
    })

    group.action('sixth', async (ctx) => {
        course = '6';
        await ctx.reply(text.getGroupChooseText());
        groupChooseFlag = true;
        showGroups(ctx, course, institute);
        return;
    })
}
async function getTimetableClassroom(campus, classroom, ctx) {
    if (classroom != "Манеж") {
        var classroomName = classroom + "/" + campus + "к";
    } else {
        var classroomName = classroom;
    }
    let showMessage = await dataBase.withOneAurguments(campus, query.concatClassroomQuery(campus, classroom));
    if (showMessage.length == 0) {
        await ctx.reply(tetx.getCantFindClassroom());
        findClassroom = '';
    } else {
        await ctx.reply('Расписание  ' + classroomName + " кабинета " + ":")
        for (var i = 0; i < showMessage.length; i++) {
            await ctx.reply("👀День недели: " + showMessage[i].day_name + 
                        "\n#️⃣ " + showMessage[i].lesson_number + " пара" + 
                        "\n🌐Чётность: " + showMessage[i].parity_name + 
                        "\n📘Название предмета: " + showMessage[i].study_subject_name + "(" + showMessage[i].type_lesson_name + ")" + 
                        "\n🧑‍🏫Преподаватель: " + showMessage[i].teacher_name);
        }
        findClassroom = '';
    }
}
async function getTimetableDay (group, day, ctx) {
    let showMessage = await dataBase.withTwoAurguments(group, day, query.getDailyTimetable());
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
            await ctx.telegram.sendMessage(ctx.chat.id, 'Выберите институт',
            {
                reply_markup: {
                inline_keyboard: [
                    [{text: "ИМИТиФ", callback_data: "imitif"}, {text: "ИГЗ", callback_data: "igz"}],
                    [{text: "ИЕН", callback_data: "ien"}, {text: "ИИиД", callback_data: "iiid"}],
                    [{text: "ИИиС", callback_data: "iiis"}, {text: "ИНиГ", callback_data: "inig"}],
                    [{text: "ИППСТ", callback_data: "ippst"}, {text: "ИПСУБ", callback_data: "ipsub"}],
                    [{text: "ИСК", callback_data: "isk"}, {text: "ИУФФУиЖ", callback_data: "iuffuizh"}],
                    [{text: "ИФКиС", callback_data: "ifkis"}, {text: "ИЭиУ", callback_data: "ieiu"}],
                    [{text: "ИЯЛ", callback_data: "iyal"}, {text: "Выйти", callback_data: "leave"}],
                ]
            }
            })
        })

        group.action('imitif', async (ctx) => {
            institute = 'ИМИТиФ';
            await chooseCourse(ctx, group);
        })

        group.action('igz', async (ctx) => {
            institute = 'ИГЗ';
            await chooseCourse(ctx, group);
        })

        group.action('ien', async (ctx) => {
            institute = 'ИЕН';
            await chooseCourse(ctx, group);
        })

        group.action('iiid', async (ctx) => {
            institute = 'ИИиД';
            await chooseCourse(ctx, group);
        })

        group.action('iiis', async (ctx) => {
            institute = 'ИИиС';
            await chooseCourse(ctx, group);
        })

        group.action('inig', async (ctx) => {
            institute = 'ИНиГ';
            await chooseCourse(ctx, group);
        })

        group.action('ippst', async (ctx) => {
            institute = 'ИППСТ';
            await chooseCourse(ctx, group);
        })

        group.action('ipsub', async (ctx) => {
            institute = 'ИПСУБ';
            await chooseCourse(ctx, group);
        })

        group.action('isk', async (ctx) => {
            institute = 'ИСК';
            await chooseCourse(ctx, group);
        })

        group.action('iuffuizh', async (ctx) => {
            institute = 'ИУФФУиЖ';
            await chooseCourse(ctx, group);
        })

        group.action('ifkis', async (ctx) => {
            institute = 'ИФКиС';
            await chooseCourse(ctx, group);
        })

        group.action('ieiu', async (ctx) => {
            institute = 'ИЭиУ';
            await chooseCourse(ctx, group);
        })

        group.action('iyal', async (ctx) => {
            institute = 'ИЯЛ';
            await chooseCourse(ctx, group);
        })
        
        group.action('leave', async (ctx) => {
            await ctx.reply(text.getMenuText())
            await ctx.scene.leave()
        })

        group.command('leave', async (ctx) => {
            await ctx.reply(text.getMenuText())
            await ctx.scene.leave()
        })

        group.on('text', async (ctx) => {
            if (groupChooseFlag == true) {
                const answer = ctx.message.text;
                var group = await dataBase.withTwoAurguments(course, institute ,query.getGropus())
                if (answer <= group.length && answer >= 0) {
                    let chooseGroup = group[answer].team_name;
                    logic.setGroup(ctx.message.from.username, chooseGroup);
                    await ctx.reply(text.getYourGroupText() + chooseGroup);
                    await ctx.scene.leave()
                    await ctx.reply(text.getMenuText())
                } else {
                    ctx.reply(text.getLeaveText());
                }
            } else {
                ctx.reply(text.getLeaveText());
            }     
        })
        return group;
    }
    GenSubscribeScene() {
        const subscribe = new Scene('subscribe');
        subscribe.enter(async (ctx) => {
            await ctx.reply(text.getGreetingSubscribeText())
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
                        if (typeof subscribeHour == "undefined" || typeof subscribeMinute == "undefined") {
                            await ctx.reply(text.getSubscribeWrongTimeText());
                            await ctx.reply(text.getMenuText());
                            await ctx.scene.leave();
                        } else {
                            let time = subscribeHour + ':' + subscribeMinute;
                            logic.setTimeUser(time);
                            if (subscribeMinute < 10) {
                                await ctx.reply(text.getSubscribeTimeText() + subscribeHour + ':0' + subscribeMinute);
                            } else {
                                await ctx.reply(text.getSubscribeTimeText() + subscribeHour + ':' + subscribeMinute);
                            }
                            subscribeFlag = true;
                            await checkTime(subscribeHour, subscribeMinute, ctx);
                            await ctx.reply(text.getMenuText())
                            await ctx.scene.leave();
                        }
                    } catch(e) {
                        console.log("Ошибка - " + e);
                        await ctx.reply(text.getTryAgainText());
                        ctx.reply(text.getLeaveText());
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
                            if (today == 0) {
                                await ctx.reply(text.getItsSundayText());
                            } else {
                                await getTimetableDay(chooseGroup, days[today], ctx);
                            }
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
            await ctx.reply('Введите фамилию преподавателя:');
            teacher.on('text', async (ctx) => {
                const answer = ctx.message.text;
                var teachers = await dataBase.withoutAurguments(query.concatTeacherQuery(answer));
                if (teachers.length > 1) {
                    await ctx.reply('Выберите нужного преподавателя')
                    var teacherList = "";
                    for (var i = 0; i < teachers.length; i++) {
                            teacherList = teacherList + i + " - " + teachers[i].teacher_name + "\n";
                        }
                    await ctx.reply(teacherList);
                } else {
                    var showMessage = await dataBase.withOneAurguments(teachers[0].teacher_name, query.getTeacherQuery());
                    test = showMessage;
                    for (var i = 0; i < showMessage.length; i++) {
                        await ctx.reply("👀День недели: " + showMessage[i].day_name + 
                                    "\n#️⃣ " + showMessage[i].lesson_number + " пара" + 
                                    "\n🌐Чётность: " + showMessage[i].parity_name + 
                                    "\n📘Название предмета: " + showMessage[i].study_subject_name + "(" + showMessage[i].type_lesson_name + ")" + 
                                    "\n🚪Кабинет: " + showMessage[i].classroom_name);
                    }
                }
            })
        })
        
        teacher.on('text', async (ctx) => {
            const answer = ctx.message.text;
            if (enterTeacherFindFlag == true) {
                if (answer <= teachersMassive.length && answer >= 0) {
                    var chooseTeacher = teachersMassive[answer].teacher_name;
                    await ctx.reply('Расписание ' + chooseTeacher);
                    var showMessage = await dataBase.withOneAurguments(chooseTeacher, query.getTeacherQuery());
                    for (var i = 0; i < showMessage.length; i++) {
                    await ctx.reply("👀День недели: " + showMessage[i].day_name + 
                                "\n#️⃣ " + showMessage[i].lesson_number + " пара" + 
                                "\n🌐Чётность: " + showMessage[i].parity_name + 
                                "\n📘Название предмета: " + showMessage[i].study_subject_name + "(" + showMessage[i].type_lesson_name + ")" + 
                                "\n🚪Кабинет: " + showMessage[i].classroom_name);
                    }
                    enterTeacherFindFlag = false;
                    await ctx.reply(text.getMenuText());
                    await ctx.scene.leave();
                } else {
                    ctx.reply("Ты ошибся, друх");
                    await ctx.reply(text.getMenuText());
                    await ctx.scene.leave();
                }
            } else {
                const answer = ctx.message.text;
                var teachers = await dataBase.withoutAurguments(query.concatTeacherQuery(answer));
                teachersMassive = teachers;
                if (teachers.length > 1) {
                    enterTeacherFindFlag = true;
                    await ctx.reply('Выберите нужного преподавателя')
                    var teacherList = "";
                    for (var i = 0; i < teachers.length; i++) {
                            teacherList = teacherList + i + " - " + teachers[i].teacher_name + "\n";
                        }
                    await ctx.reply(teacherList);
                } else {
                    if (teachers.length == 0) {
                        enterTeacherFindFlag = false;
                        await ctx.reply('Преподаватель с такой фамилией не найден');
                        await ctx.reply(text.getMenuText());
                        await ctx.scene.leave();
                    } else {
                        var showMessage = await dataBase.withOneAurguments(teachers[0].teacher_name, query.getTeacherQuery());
                        for (var i = 0; i < showMessage.length; i++) {
                        await ctx.reply("👀День недели: " + showMessage[i].day_name + 
                                    "\n#️⃣ " + showMessage[i].lesson_number + " пара" + 
                                    "\n🌐Чётность: " + showMessage[i].parity_name + 
                                    "\n📘Название предмета: " + showMessage[i].study_subject_name + "(" + showMessage[i].type_lesson_name + ")" + 
                                    "\n🚪Кабинет: " + showMessage[i].classroom_name);
                        }
                        enterTeacherFindFlag = false;
                        await ctx.reply(text.getMenuText());
                        await ctx.scene.leave();
                    }
                    
                }
            }
            
        })
        
        return teacher
    }
    GenClassroomScene() {
        const classroom = new Scene('classroom');
        
        classroom.enter(async (ctx) => {
            await ctx.reply(text.getChooseClassroomText());
            await classroom.on('text', async (ctx) => {
                findClassroom = ctx.message.text;
                await ctx.telegram.sendMessage(ctx.chat.id, text.getChooseCampusText(),
            {
                reply_markup: {
                inline_keyboard: [
                    [{text: "1к", callback_data: "first"}],
                    [{text: "2к", callback_data: "second"}],
                    [{text: "3к", callback_data: "third"}],
                    [{text: "4к", callback_data: "fourth"}],
                    [{text: "5к", callback_data: "fifth"}],
                    [{text: "6к", callback_data: "sixth"}],
                    [{text: "7к", callback_data: "seventh"}],
                    [{text: "Манеж", callback_data: "ofp"}],
                    [{text: "Выйти", callback_data: "leave"}],
                ]
            }
            })
            })
        })

        classroom.action('first', async (ctx) => {
            await getTimetableClassroom("1", findClassroom, ctx);
            await ctx.reply(text.getMenuText());
            await ctx.scene.leave();
        })

        classroom.action('secnond', async (ctx) => { 
            await getTimetableClassroom("2", findClassroom, ctx);
            await ctx.reply(text.getMenuText());
            await ctx.scene.leave();
        })

        classroom.action('third', async (ctx) => { 
            await getTimetableClassroom("3", findClassroom, ctx);
            await ctx.reply(text.getMenuText());
            await ctx.scene.leave();
        })

        classroom.action('fourth', async (ctx) => { 
            await getTimetableClassroom("4", findClassroom, ctx);
            await ctx.reply(text.getMenuText());
            await ctx.scene.leave();
        })
        
        classroom.action('fifth', async (ctx) => { 
            await getTimetableClassroom("5", findClassroom, ctx);
            await ctx.reply(text.getMenuText());
            await ctx.scene.leave();
        })
        
        classroom.action('sixth', async (ctx) => { 
            await getTimetableClassroom("6", findClassroom, ctx);
            await ctx.reply(text.getMenuText());
            await ctx.scene.leave();
        })
        
        classroom.action('seventh', async (ctx) => { 
            await getTimetableClassroom("7", findClassroom, ctx);
            await ctx.reply(text.getMenuText());
            await ctx.scene.leave();
        })

        classroom.action('ofp', async (ctx) => { 
            await getTimetableClassroom("0", "Манеж", ctx);
            await ctx.reply(text.getMenuText());
            await ctx.scene.leave();
        })
        
        classroom.action('leave', async (ctx) => { 
            await ctx.reply(text.getMenuText());
            await ctx.scene.leave();
        })

        return classroom;
    }
    GenTimetableScene() {
        const timetable = new Scene('timetable');
        var chooseGroup;
        timetable.enter(async (ctx) => {
            if (await logic.checkGroup(ctx.message.from.username) == false) {
                await ctx.reply(text.getGroupChooseText());
                await ctx.reply(text.getMenuText());
                await ctx.scene.leave();    
            } else {
                let group  = await dataBase.withOneAurguments(ctx.message.from.username, query.getUserGroup())
                chooseGroup = group[0].group_name;
                await ctx.reply(text.getYourGroupText() + chooseGroup);
                await ctx.reply(text.getTimetableMenuText());
            }
        })

        timetable.command('leave', async (ctx) => {
            await ctx.reply(text.getMenuText());
            await ctx.scene.leave();
        })

        timetable.command('tomorrow', async (ctx) => {
            var today = new Date().getDay()
            var days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']
            if (days[today] === 'Суббота') {
                await ctx.reply(text.getTomorrowIsSundayText());
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
            await ctx.telegram.sendMessage(ctx.chat.id, text.getChooseDayOfWeekText(),
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
            ctx.reply(text.getLeaveText());
        })

        return timetable;
    }
}

module.exports = SceneGenerator