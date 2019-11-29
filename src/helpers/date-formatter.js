export default class DateFormatter {

  dateOptions = {
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    timezone: 'UTC',
  };

  _formatDay = (d) => {
    const date = new Date(d).toLocaleString("ru", this.dateOptions);
    return `${date.charAt(0).toUpperCase()}${date.slice(1)}`;
  };

  _getFreeTime = (data) => {
    const res = {};
    Object.keys(data).forEach(day => {
      Object.keys(data[day]).forEach(record => {
        const { is_not_free, begin, end } = data[day][record];
        if (is_not_free) {
          return;
        }
        const time = `${begin}-${end}`;
        if (!res[day]) {
          res[day] = [];
        }
        res[day].push({ id: res[day].length, time });
      });
      // if (res[day]) {
      //   res[day] = { ...res[day] };
      // }
    });
    const sortedKeys = Object.keys(res).sort((a, b) => new Date(a) - new Date(b));
    const sortedData = [];
    sortedKeys.forEach(d => {
      sortedData[sortedData.length] = { day: this._formatDay(d), freeTime: res[d] };
    });
    return sortedData;
  };

  formatData = ({ data }) => {
    const res = this._getFreeTime(data);
    return res;
    // return this._getFreeTime(data);
  };

};
