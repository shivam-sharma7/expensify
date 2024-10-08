import cron from 'cron';
import https from 'https';

const URL = 'https://expensify-f43l.onrender.com';

export const job = new cron.CronJob('*/10 * * * * *', function () {
  https
    .get(URL, (res) => {
      if (res.statusCode === 200) {
        console.log('Get request sent successfully');
      } else {
        console.log('Get request failed');
      }
    })
    .on('error', (e) => {
      console.error('Error while sending req', e);
    });
});
