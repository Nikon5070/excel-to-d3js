import { Row } from 'element-ui';

export enum Colums {
  Year = 1,
  January,
  February,
  March,
  April,
  May,
  June,
  July,
  August,
  September,
  October,
  November,
  December
}

/*
*
К выплате
Оплачено
Сальдо
------NULL------
------NULL------
Праздники
Отпуск
Больничные
Отгулы
------NULL------
------NULL------
Оклад
Стоимость праздников и отпускных
Стоимость больничного
Стоимость отгула
Стоимость часа
------NULL------
------NULL------
Выработка
Рабочих дней
План
Факт
Оценка
Попадание в оценку
Бонус / штраф
------NULL------
------NULL------
Оклад, нетто
С бонусом / штрафом
------NULL------
------NULL------
Выплаты
* */


export enum Rows {
  ToPayoff,
  Paid,
  Balance,
  Holidays= 5,
  Vacation,
  Hospital,
  DayOff,
  Salary,
  CostHolidaysAndVacation,
  CostSickLeave,
  LeaveTime,
  CostPerHour,
  Production,
  WorkingDays,
  Plan,
  Fact,
  Assessment,
  HitAssessment,
  BonusPenalty,
  SalaryNett,
  WithBonusPenalty,
  Payouts
}

//
// const ROWSi18n = {
//   'К выплате': Rows.ToPayoff,
//   Оплачено: Rows.Paid,
//   Сальдо: Rows.Balance,
//   Праздники: Rows.Holidays,
//   Отпуск: Rows.Vacation,
//   Больничные: Rows.Hospital,
//   Отгулы: Rows.DayOff,
//   Оклад: Rows.Salary,
//   'Стоимость праздников и отпускных': Rows.CostHolidaysAndVacation,
//   'Стоимость больничного': Rows.CostSickLeave,
//   'Стоимость отгула': Rows.LeaveTime,
//   'Стоимость часа': Rows.CostPerHour,
//   Выработка: Rows.Production,
//   'Рабочих дней': Rows.WorkingDays,
//   План: Rows.Plan,
//   Факт: Rows.Fact,
//   Оценка: Rows.Assessment,
//   'Попадание в оценку': Rows.HitAssessment,
//   'Бонус / штраф': Rows.BonusPenalty,
//   'Оклад, нетто': Rows.SalaryNett,
//   'С бонусом / штрафом': Rows.WithBonusPenalty,
//   Выплаты: Rows.Payouts,
// };
