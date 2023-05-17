const timeFormats = {
  'hh:mm:ss': 'HH:mm:ss',
  'hh:mm': 'HH:mm',
  'dd:mm:hh': 'DD:MM:HH',
};

export const formatDate = (stringDate, timeFormat = 'hh:mm:ss') => {
  const date = new Date(stringDate);

  if (isNaN(date.getTime())) {
    return '';
  }

  const kstOffset = 1 * 60 * 60 * 1000;
  const kstDate = new Date(date.getTime() + kstOffset);
  const year = kstDate.getFullYear();
  const month = String(kstDate.getMonth() + 1).padStart(2, '0');
  const day = String(kstDate.getDate()).padStart(2, '0');
  const hour = String(kstDate.getHours()-1).padStart(2, '0');
  const minute = String(kstDate.getMinutes()).padStart(2, '0');
  const second = String(kstDate.getSeconds()).padStart(2, '0');

  const timePart = timeFormats[timeFormat]
    .replace('HH', hour)
    .replace('mm', minute)
    .replace('ss', second)
    .replace('DD', day)
    .replace('MM', month);

  return `${year}-${month}-${day} ${timePart}`;
};
