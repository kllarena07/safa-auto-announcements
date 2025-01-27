const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/schedule', (req, res) => {
  const data = req.body;
  const event = data.event;

  const userTimezone = 'America/New_York'; // Replace with your desired timezone
  const eventTime = new Date(event).toLocaleString('en-US', { timeZone: userTimezone });
  const oneWeekBefore = new Date(event);
  oneWeekBefore.setDate(oneWeekBefore.getDate() - 7);

  const fiveDaysBefore = new Date(event);
  fiveDaysBefore.setDate(fiveDaysBefore.getDate() - 5);

  const threeDaysBefore = new Date(event);
  threeDaysBefore.setDate(threeDaysBefore.getDate() - 3);

  const oneDayBefore = new Date(event);
  oneDayBefore.setDate(oneDayBefore.getDate() - 1);

  const oneHourBefore = new Date(event);
  oneHourBefore.setHours(oneHourBefore.getHours() - 1);
  
  console.log(event);
  console.log(eventTime);

  console.log('One week before:', oneWeekBefore.toLocaleString('en-US', { timeZone: userTimezone }));
  console.log('Five days before:', fiveDaysBefore.toLocaleString('en-US', { timeZone: userTimezone }));
  console.log('Three days before:', threeDaysBefore.toLocaleString('en-US', { timeZone: userTimezone }));
  console.log('One day before:', oneDayBefore.toLocaleString('en-US', { timeZone: userTimezone }));
  console.log('One hour before:', oneHourBefore.toLocaleString('en-US', { timeZone: userTimezone }));

  res.status(200).send('Data received');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
