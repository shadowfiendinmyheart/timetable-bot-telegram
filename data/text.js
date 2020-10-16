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

    getGroupChooseText() {
        let text = "Выберите свою группу:";
        return text;
    }

    getGroupCourseText() {
        let text = "Укажите свой курс:";
        return text;
    }

    getLeaveText() {
        let text = "Не понимаю тебя, если хочешь выйти, просто напиши - /leave";
        return text;
    }

    getGreetingSubscribeText() {
        let text = "Выберите удобное время, чтобы получать расписание ежедневно.\nЧтобы отказаться от рассылки нажиите - /cancel";
        return text;
    }

    getSubscribeTimeText() {
        let text = "Каждый день вы будете получать расписание в это время - ";
        return text;
    }

    getSubscribeWrongTimeText() {
        let text = "Неверное время";
        return text;
    }

    getTryAgainText() {
        text = "Попробуй снова...";
        return text;
    }

    getYourGroupText() {
        let text = "Твоя группа - ";
        return text;
    }

    getItsSundayText() {
        let text = "Relax, today is SUNDAY ! ! ! (FUCK YEAH)";
        return text;
    }

    getChooseClassroomText() {
        let text = "Введите номер кабинета:";
        return text;
    }

    getChooseCampusText() {
        let text = "Выберите корпус";
        return text;
    }

    getTomorrowIsSundayText() {
        let text = "Расслабься, старичок, завтра выходной";
        return text;
    }

    getChooseDayOfWeekText() {
        let text = "Выберите день недели";
        return text;
    }

}

module.exports = Text

