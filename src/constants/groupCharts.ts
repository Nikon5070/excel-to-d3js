import { Rows } from '@/types/xlsx';
import { Chart } from 'chart.js';

interface ListCharts {
  type: Chart.ChartType;
  data: Array<number>;
}

export type GroupCharts = Array<ListCharts>;

export const groupCharts: GroupCharts = [
  {
    type: 'bar',
    data: [Rows.ToPayoff, Rows.Paid, Rows.Balance],
  },
  {
    type: 'bar',
    data: [Rows.Holidays, Rows.Vacation, Rows.Hospital, Rows.DayOff],
  },
  {
    type: 'bar',
    data: [Rows.Holidays, Rows.Vacation, Rows.Hospital, Rows.DayOff],
  },
  {
    type: 'bar',
    data: [
      Rows.Salary,
      Rows.CostHolidaysAndVacation,
      Rows.CostSickLeave,
      Rows.LeaveTime,
      Rows.CostPerHour,
    ],
  },
];
