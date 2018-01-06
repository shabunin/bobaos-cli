const Baos = require('bobaos');
const Vorpal = require('vorpal');
const DPTS = require('knx-dpts-baos');

//app.on('service', console.log);
let app = null;

const vorpal = Vorpal();
vorpal
  .command('open', 'Open serial port')
  .option('-d, --debug', 'Print debug information on FT12 communication')
  .option('-p, --port <str>', 'Optional. Default is "/dev/ttyAMA0". Serialport device.')
  .option('-i, --ind', 'Optional. Log *.Ind service')
  .action(function (args, callback) {
    try {
      let debug = false;
      let device = '/dev/ttyAMA0';
      let indication = false;
      if (typeof args.options.debug !== 'undefined') {
        debug = args.options.debug;
      }
      if (typeof args.options.port !== 'undefined') {
        device = args.options.port;
      }
      if (typeof args.options.ind !== 'undefined') {
        indication = args.options.ind
      }

      let params = {
        debug: debug,
        serialPort: {device: device}
      };
      // create bobaos instance
      app = new Baos(params);
      // register callback
      app.on('service', function (data) {
        if (indication) {
          console.log(data)
        } else {
          if (data.direction !== 'indication') {
            console.log(data)
          }
        }
      });
    } catch (e) {
      console.log(e);
    } finally {
      setTimeout(callback, 500);
    }
  });

vorpal
  .command('getDatapointDescription', 'GetDatapointDescription.Req service')
  .option('-s, --start <number>', 'Required. Id of first datapoint')
  .option('-n, --number <number>', 'Optional. Default = 1')
  .action(function (args, callback) {
    try {
      let number = 1;
      if (typeof args.options.start === 'undefined') {
        throw new Error('Please specify datapoint start');
      }
      if (typeof args.options.number !== 'undefined') {
        number = args.options.number;
      }
      let start = args.options.start;
      app.getDatapointDescription(start, number);
    } catch (e) {
      console.log(e)
    } finally {
      setTimeout(callback, 500);
    }
  });

vorpal
  .command('setDatapointValue', 'SetDatapointValue.Req service with command "set and send to bus"')
  .option('-s, --start <number>', 'Required. Id of datapoint')
  .option('-v, --value <str>', 'Required.')
  .option('-t, --type <str>', 'Required. DPT type of datapoint: dpt1-dpt18')
  .action(function (args, callback) {
    try {
      if (typeof args.options.start === 'undefined') {
        throw new Error('Please specify datapoint start');
      }
      if (typeof args.options.value === 'undefined') {
        throw new Error('Please specify datapoint value');
      }
      if (typeof args.options.type === 'undefined') {
        throw new Error('Please specify datapoint type');
      }
      let start = args.options.start;
      let value = args.options.value;
      let type = args.options.type;
      if (!Object.prototype.hasOwnProperty.call(DPTS, type)) {
        throw new TypeError('Please specify correct datapoint type')
      }
      let valueBuff = DPTS[type].fromJS(value);
      app.setDatapointValue(start, valueBuff);
    } catch (e) {
      console.log(e);
    } finally {
      setTimeout(callback, 500);
    }
  });

vorpal
  .command('readDatapointFromBus', 'SetDatapointValue.Req service with command "read via bus"')
  .option('-s, --start <number>', 'Required. Id of first datapoint')
  .option('-l, --length <number>', 'Required. Length of datapoint value')
  .action(function (args, callback) {
    try {
      if (typeof args.options.start === 'undefined') {
        throw new Error('Please specify datapoint start');
      }
      if (typeof args.options.length === 'undefined') {
        throw new Error('Please specify datapoint start');
      }
      let start = args.options.start;
      let length = args.options.length;
      app.readDatapointFromBus(start, length);
    } catch (e) {
      console.log(e);
    } finally {
      setTimeout(callback, 500);
    }
  });

vorpal
  .command('getDatapointValue', 'GetDatapointValue.Req service')
  .option('-s, --start <number>', 'Required. Id of first datapoint')
  .option('-n, --number <number>', 'Optional. Default = 1')
  .action(function (args, callback) {
    try {
      let number = 1;
      if (typeof args.options.start === 'undefined') {
        throw new Error('Please specify datapoint start');
      }
      if (typeof args.options.number !== 'undefined') {
        number = args.options.number;
      }
      let start = args.options.start;
      app.getDatapointValue(start, number);
    } catch (e) {
      console.log(e);
    } finally {
      setTimeout(callback, 500);
    }
  });

vorpal
  .command('getParameterByte', 'GetParameterByte.Req service')
  .option('-s, --start <number>', 'Required. Id of first datapoint')
  .option('-n, --number <number>', 'Optional. Default = 1')
  .action(function (args, callback) {
    try {
      let number = 1;
      if (typeof args.options.start === 'undefined') {
        throw new Error('Please specify datapoint start');
      }
      if (typeof args.options.number !== 'undefined') {
        number = args.options.number;
      }
      let start = args.options.start;
      app.getParameterByte(start, number);
    } catch (e) {
      console.log(e);
    } finally {
      setTimeout(callback, 500);
    }
  });

vorpal
  .delimiter('bobaos>')
  .show();
