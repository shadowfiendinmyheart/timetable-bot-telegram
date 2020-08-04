-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Авг 04 2020 г., 15:43
-- Версия сервера: 10.3.13-MariaDB
-- Версия PHP: 7.1.22

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `timetable`
--

-- --------------------------------------------------------

--
-- Структура таблицы `classroom`
--

CREATE TABLE `classroom` (
  `id` int(11) NOT NULL,
  `classroom_name` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `classroom`
--

INSERT INTO `classroom` (`id`, `classroom_name`) VALUES
(1, '234/4к'),
(2, '319/1к'),
(3, '410а/6к'),
(4, 'Манеж'),
(5, '317/6к'),
(6, '240/6к'),
(7, '229/1к'),
(8, '311/6к'),
(9, '218/4к'),
(10, '325/6к'),
(11, '412/6к'),
(12, '321/6к'),
(13, '307/1к'),
(14, '242/6к'),
(15, '504/6к');

-- --------------------------------------------------------

--
-- Структура таблицы `day`
--

CREATE TABLE `day` (
  `id` int(10) NOT NULL,
  `day_name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `day`
--

INSERT INTO `day` (`id`, `day_name`) VALUES
(1, 'Понедельник'),
(2, 'Вторник'),
(3, 'Среда'),
(4, 'Четверг'),
(5, 'Пятница'),
(6, 'Суббота');

-- --------------------------------------------------------

--
-- Структура таблицы `lesson`
--

CREATE TABLE `lesson` (
  `id` int(11) NOT NULL,
  `lesson_number` int(11) NOT NULL,
  `time_start` time NOT NULL,
  `time_finish` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `lesson`
--

INSERT INTO `lesson` (`id`, `lesson_number`, `time_start`, `time_finish`) VALUES
(1, 1, '08:20:00', '09:50:00'),
(2, 2, '10:00:00', '11:30:00'),
(3, 3, '12:10:00', '13:40:00'),
(4, 4, '13:50:00', '15:20:00'),
(5, 5, '15:40:00', '17:10:00'),
(6, 6, '17:30:00', '19:00:00'),
(7, 7, '19:10:00', '20:40:00');

-- --------------------------------------------------------

--
-- Структура таблицы `parity`
--

CREATE TABLE `parity` (
  `id` int(11) NOT NULL,
  `parity_name` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `parity`
--

INSERT INTO `parity` (`id`, `parity_name`) VALUES
(1, 'Числитель'),
(2, 'Знаменатель'),
(3, 'Всегда');

-- --------------------------------------------------------

--
-- Структура таблицы `study_subject`
--

CREATE TABLE `study_subject` (
  `id` int(11) NOT NULL,
  `study_subject_name` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `study_subject`
--

INSERT INTO `study_subject` (`id`, `study_subject_name`) VALUES
(1, 'Теория функций комплексной переменной'),
(2, 'Безопасность жизнедеятельности'),
(3, 'Технологии обработки информации'),
(4, 'Функциональный анализ'),
(5, 'Физическая культура и спорт'),
(6, 'Базы данных'),
(7, 'Иностранный язык'),
(8, 'Практикум по программированию'),
(9, 'Рисунок и живопись'),
(10, 'Теория государства и права'),
(11, 'Бухгалтерский учет и аудит');

-- --------------------------------------------------------

--
-- Структура таблицы `teacher`
--

CREATE TABLE `teacher` (
  `id` int(11) NOT NULL,
  `teacher_name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `teacher`
--

INSERT INTO `teacher` (`id`, `teacher_name`) VALUES
(1, 'Воронецкая М.А.'),
(2, 'Вельм И.М.'),
(3, 'Поярков А.В.'),
(4, 'Родионова А.Г.'),
(5, 'Шумихина И.И.'),
(6, 'Лушников П.В.'),
(7, 'Иванов А.В.'),
(8, 'Анисимов А.Е.'),
(9, 'Логов А.Г.'),
(10, 'Ильина Т.А.'),
(11, 'Трусов А.С.'),
(12, 'Трофимов Н.И.');

-- --------------------------------------------------------

--
-- Структура таблицы `team`
--

CREATE TABLE `team` (
  `id` int(11) NOT NULL,
  `team_name` varchar(10) NOT NULL,
  `team_course` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `team`
--

INSERT INTO `team` (`id`, `team_name`, `team_course`) VALUES
(1, 'ПИ-21(д)', 2),
(2, 'ПИ-21(э)', 2),
(3, 'ПИ-21(ю)', 2),
(4, 'ВМ-21', 2),
(5, 'ИС-21', 2),
(6, 'ИТ-21', 2);

-- --------------------------------------------------------

--
-- Структура таблицы `timetable`
--

CREATE TABLE `timetable` (
  `id` int(11) NOT NULL,
  `day_id` int(11) NOT NULL,
  `lesson_id` int(11) NOT NULL,
  `parity_id` int(11) NOT NULL,
  `team_id` int(11) NOT NULL,
  `study_subject_id` int(11) NOT NULL,
  `type_lesson_id` int(11) NOT NULL,
  `teacher_id` int(11) NOT NULL,
  `classroom_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `timetable`
--

INSERT INTO `timetable` (`id`, `day_id`, `lesson_id`, `parity_id`, `team_id`, `study_subject_id`, `type_lesson_id`, `teacher_id`, `classroom_id`) VALUES
(1, 1, 1, 3, 1, 1, 1, 1, 1),
(2, 1, 2, 1, 1, 2, 2, 2, 2),
(3, 1, 2, 2, 1, 3, 2, 3, 2),
(4, 1, 3, 2, 1, 2, 1, 2, 3),
(5, 2, 1, 3, 1, 4, 1, 4, 1),
(6, 3, 4, 3, 1, 6, 2, 8, 7),
(7, 3, 5, 1, 1, 6, 1, 9, 8),
(8, 3, 5, 2, 1, 3, 3, 3, 5),
(9, 3, 7, 3, 1, 6, 3, 9, 8),
(10, 4, 1, 3, 1, 7, 1, 7, 9),
(12, 5, 2, 3, 1, 8, 3, 8, 5),
(13, 5, 3, 3, 1, 8, 3, 8, 12),
(14, 6, 1, 1, 1, 1, 2, 1, 13),
(15, 6, 2, 3, 1, 9, 2, 12, 14),
(16, 6, 3, 3, 1, 9, 1, 12, 14),
(17, 1, 3, 1, 3, 2, 1, 2, 3),
(18, 2, 1, 3, 3, 1, 1, 1, 15),
(19, 2, 3, 1, 3, 10, 2, 6, 5),
(20, 2, 3, 2, 3, 10, 2, 6, 3),
(21, 2, 4, 3, 3, 7, 1, 7, 6),
(22, 3, 4, 3, 3, 6, 2, 8, 7),
(23, 3, 5, 1, 3, 3, 3, 3, 5),
(24, 3, 5, 2, 3, 6, 1, 9, 8),
(25, 3, 6, 3, 3, 6, 3, 9, 8),
(26, 4, 1, 3, 3, 8, 3, 11, 10),
(27, 4, 1, 3, 3, 8, 3, 11, 10),
(28, 5, 1, 3, 3, 4, 2, 4, 13),
(29, 5, 2, 3, 3, 8, 1, 11, 12),
(30, 5, 3, 3, 3, 10, 1, 6, 9),
(31, 6, 2, 3, 3, 4, 1, 4, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `type_lesson`
--

CREATE TABLE `type_lesson` (
  `id` int(11) NOT NULL,
  `type_lesson_name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `type_lesson`
--

INSERT INTO `type_lesson` (`id`, `type_lesson_name`) VALUES
(1, 'Практика'),
(2, 'Лекция'),
(3, 'Лабораторная работа'),
(4, 'Семинар'),
(5, 'Консультация');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(128) NOT NULL,
  `course` tinyint(10) DEFAULT NULL,
  `institute` varchar(10) DEFAULT NULL,
  `group_name` varchar(10) DEFAULT NULL,
  `subscribe_time` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `name`, `course`, `institute`, `group_name`, `subscribe_time`) VALUES
(13, 'shadowfiend15yo', NULL, NULL, 'ПИ-21(д)', '17:09:00');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `classroom`
--
ALTER TABLE `classroom`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `day`
--
ALTER TABLE `day`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `lesson`
--
ALTER TABLE `lesson`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `parity`
--
ALTER TABLE `parity`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `study_subject`
--
ALTER TABLE `study_subject`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `teacher`
--
ALTER TABLE `teacher`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `team`
--
ALTER TABLE `team`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `timetable`
--
ALTER TABLE `timetable`
  ADD PRIMARY KEY (`id`),
  ADD KEY `day_id` (`day_id`),
  ADD KEY `classroom_id` (`classroom_id`),
  ADD KEY `parity_id` (`parity_id`),
  ADD KEY `study_subject_id` (`study_subject_id`),
  ADD KEY `teacher_id` (`teacher_id`),
  ADD KEY `team_id` (`team_id`),
  ADD KEY `type_lesson_id` (`type_lesson_id`),
  ADD KEY `lesson_id` (`lesson_id`);

--
-- Индексы таблицы `type_lesson`
--
ALTER TABLE `type_lesson`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `classroom`
--
ALTER TABLE `classroom`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT для таблицы `day`
--
ALTER TABLE `day`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT для таблицы `lesson`
--
ALTER TABLE `lesson`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT для таблицы `parity`
--
ALTER TABLE `parity`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `study_subject`
--
ALTER TABLE `study_subject`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT для таблицы `teacher`
--
ALTER TABLE `teacher`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT для таблицы `team`
--
ALTER TABLE `team`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT для таблицы `timetable`
--
ALTER TABLE `timetable`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT для таблицы `type_lesson`
--
ALTER TABLE `type_lesson`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `timetable`
--
ALTER TABLE `timetable`
  ADD CONSTRAINT `timetable_ibfk_1` FOREIGN KEY (`day_id`) REFERENCES `day` (`id`),
  ADD CONSTRAINT `timetable_ibfk_2` FOREIGN KEY (`classroom_id`) REFERENCES `classroom` (`id`),
  ADD CONSTRAINT `timetable_ibfk_3` FOREIGN KEY (`lesson_id`) REFERENCES `lesson` (`id`),
  ADD CONSTRAINT `timetable_ibfk_4` FOREIGN KEY (`parity_id`) REFERENCES `parity` (`id`),
  ADD CONSTRAINT `timetable_ibfk_5` FOREIGN KEY (`study_subject_id`) REFERENCES `study_subject` (`id`),
  ADD CONSTRAINT `timetable_ibfk_6` FOREIGN KEY (`teacher_id`) REFERENCES `teacher` (`id`),
  ADD CONSTRAINT `timetable_ibfk_7` FOREIGN KEY (`team_id`) REFERENCES `team` (`id`),
  ADD CONSTRAINT `timetable_ibfk_8` FOREIGN KEY (`type_lesson_id`) REFERENCES `type_lesson` (`id`),
  ADD CONSTRAINT `timetable_ibfk_9` FOREIGN KEY (`lesson_id`) REFERENCES `lesson` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
