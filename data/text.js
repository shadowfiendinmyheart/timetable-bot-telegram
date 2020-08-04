class Text {

    getMenuText() {
        let text = "Меню:\n/timetable - узнать расписание\n/teacher - узнать расписание преподавателя\n/classroom - узнать расписание кабинета\n/group - выбрать/изменить группу\n/subscribe - подписать на рассылку расписания своей группы"
        return text
    }

    getQuitText() {
        let text = "Выйти в меню - /leave"
        return text;
    }

    getTimetableMenuText() {
        let text = "/week - Получить расписание на всю неделю\n/day - На определённый день\n/tomorrow - На завтра\n/leave - выйти в меню"
        return text;
    }
}

module.exports = Text