import chalk from 'chalk';
import inquirer from 'inquirer';

const SECONDS_IN_YEAR = 31536000;

const log = console.log;

function isValidTime(time, maxTime) {
  return time <= maxTime && time >= 0
};

function convertHoursToSeconds(hours) {
  return hours * 3600;
};

function convertMinutesToSeconds(minutes) {
  return minutes * 60;
};

function calculateUptime(downtimeInSeconds) {
  const uptimeInYear = SECONDS_IN_YEAR - downtimeInSeconds;
  const percentangeUptimeInYear = ((uptimeInYear / SECONDS_IN_YEAR) * 100).toFixed(3);
  return percentangeUptimeInYear;
};

async function main() {
  console.clear();
  log(chalk.green('Hello! Calculate the uptime of your application.'));
  log(chalk.green('Input the downtime in hours (24 format), minutes (60 format) and seconds (60 format)'));

  const answers = await inquirer
    .prompt([
      {
        type: 'number',
        name: 'hours',
        message: 'How long (hours) your system is down?',
        validate: value => {
          if (isValidTime(Number(value), 24)) {
            return true;
          }

          return 'Please enter a valid hour';
        },
        default: 0
      },
      {
        type: 'number',
        name: 'minutes',
        message: 'How long (minutes) your system is down?',
        validate: value => {
          if (isValidTime(Number(value), 60)) {
            return true;
          }

          return 'Please enter a valid minute';
        },
        default: 0
      },
      {
        type: 'number',
        name: 'seconds',
        message: 'How long (seconds) your system is down?',
        validate: value => {
          if (isValidTime(Number(value), 60)) {
            return true;
          }

          return 'Please enter a valid second';
        },
        default: 0
      }
    ]);

  const { hours, minutes, seconds } = answers;
  const downtimeInSeconds = convertHoursToSeconds(hours) + convertMinutesToSeconds(minutes) + seconds;

  const uptimePercentageInYear = calculateUptime(downtimeInSeconds);


  log(chalk.green(`Your uptime is ${uptimePercentageInYear}% in a year`));
}

main();