import cron from 'cron';
import https from 'https';

const URL = 'https://expensify-f43l.onrender.com';

export const job = new cron.CronJob('*/15 * * * *', function () {
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

  // Log memory usage
  const memoryUsage = process.memoryUsage();
  console.log(
    `Memory Usage: RSS=${memoryUsage.rss}, HeapTotal=${memoryUsage.heapTotal}, HeapUsed=${memoryUsage.heapUsed}, External=${memoryUsage.external}`,
  );
});
