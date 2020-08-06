class Query {

    getTeacherQuery() {
        let query = "SELECT DISTINCT day.day_name, lesson.lesson_number, parity.parity_name, study_subject.study_subject_name, type_lesson.type_lesson_name, classroom.classroom_name FROM `timetable`, `day`, `parity`, `lesson`, `study_subject`, `type_lesson`, `classroom`WHERE day.id = day_id AND lesson.id = lesson_id AND study_subject.id = study_subject_id AND type_lesson.id = type_lesson_id AND classroom.id = classroom_id AND teacher_id = (SELECT teacher.id FROM `teacher` WHERE teacher.teacher_name = ?)";
        return query;
    }

    getTimetableQuery() {
        let query = "SELECT day.day_name, lesson.lesson_number, parity.parity_name, study_subject.study_subject_name, type_lesson.type_lesson_name, teacher.teacher_name, classroom.classroom_name FROM `timetable`, `type_lesson`, `teacher`, `day`, `classroom`, `parity`, `lesson`, `study_subject` WHERE day_id = day.id AND lesson_id = lesson.id AND parity_id = parity.id AND study_subject_id = study_subject.id AND type_lesson_id = type_lesson.id AND teacher_id = teacher.id AND classroom_id = classroom.id AND team_id = (SELECT team.id FROM `team` WHERE team.team_name = ?) ORDER BY day.id ASC, lesson.lesson_number ASC";
        return query;
    }

    getDailyTimetable() {
        let query = "SELECT day.day_name, lesson.lesson_number, parity.parity_name, study_subject.study_subject_name, type_lesson.type_lesson_name, teacher.teacher_name, classroom.classroom_name FROM `timetable`, `type_lesson`, `teacher`, `day`, `classroom`, `parity`, `lesson`, `study_subject` WHERE day_id = day.id AND lesson_id = lesson.id AND parity_id = parity.id AND study_subject_id = study_subject.id AND type_lesson_id = type_lesson.id AND teacher_id = teacher.id AND classroom_id = classroom.id AND team_id = (SELECT team.id FROM `team` WHERE team.team_name = ?) AND day_name = ? ORDER BY lesson.lesson_number";
        return query;
    }

    getClassroomTable() {
        let query = "SELECT DISTINCT day.day_name, lesson.lesson_number, parity.parity_name, study_subject.study_subject_name, type_lesson.type_lesson_name, teacher.teacher_name FROM `timetable`, `day`, `lesson`, `parity`, `study_subject`, `type_lesson`, `teacher` WHERE day.id = day_id AND lesson.id = lesson_id AND study_subject.id = study_subject_id AND type_lesson.id = type_lesson_id AND parity.id = parity_id AND teacher.id = teacher_id AND classroom_id = (SELECT classroom.id FROM `classroom` WHERE classroom.classroom_name = ?) ORDER BY day.id ASC, lesson.lesson_number ASC;"
        return query;
    }

    getClassroomTimetable() {
        let query = "SELECT DISTINCT day.day_name, lesson.lesson_number, parity.parity_name, study_subject.study_subject_name, type_lesson.type_lesson_name, teacher.teacher_name FROM `timetable`, `day`, `lesson`, `parity`, `study_subject`, `type_lesson`, `teacher` WHERE day.id = day_id AND lesson.id = lesson_id AND study_subject.id = study_subject_id AND type_lesson.id = type_lesson_id AND parity.id = parity_id AND teacher.id = teacher_id AND classroom_id = (SELECT classroom.id FROM `classroom` WHERE classroom.classroom_campus = ? AND classroom.classroom_name LIKE ?) ORDER BY day.id ASC, lesson.lesson_number ASC;"
        return query;
    }

    getGropus() {
        let query = "SELECT team.team_name FROM `team` WHERE ?"
        return query;
    }

    getTeachers() {
        let query = "SELECT teacher.teacher_name FROM `teacher` WHERE ?"
        return query;
    }
    
    getClassrooms() {
        let query = "SELECT classroom.classroom_name FROM `classroom` WHERE ?"
        return query;
    }

    setUserName() {
        let query = "INSERT INTO users (name) VALUES (?)"
        return query;
    }

    setUserGroup() {
        let query = "UPDATE users SET group_name = ? WHERE name = ?"
        return query;
    }

    setUserTime() {
        let query = "UPDATE users SET subscribe_time = ? WHERE name = ?"
        return query;
    }

    getUserTime() {
        let query = "SELECT users.subscribe_time FROM `users` WHERE name = ?"
        return query;
    }

    checkUserName() {
        let query = "SELECT * FROM `users` WHERE users.name = ?"
        return query;
    }

    getUserGroup() {
        let query = "SELECT * FROM `users` WHERE users.name = ?"
        return query;
    }

    concatClassroomQuery (campus, classroom) {
        let query = "SELECT DISTINCT day.day_name, lesson.lesson_number, parity.parity_name, study_subject.study_subject_name, type_lesson.type_lesson_name, teacher.teacher_name FROM `timetable`, `day`, `lesson`, `parity`, `study_subject`, `type_lesson`, `teacher` WHERE day.id = day_id AND lesson.id = lesson_id AND study_subject.id = study_subject_id AND type_lesson.id = type_lesson_id AND parity.id = parity_id AND teacher.id = teacher_id AND classroom_id = (SELECT classroom.id FROM `classroom` WHERE classroom.classroom_campus = " + campus + " AND classroom.classroom_name LIKE " + "'%" + classroom + "%') ORDER BY day.id ASC, lesson.lesson_number ASC;"
        return query;
    }

}

module.exports = Query