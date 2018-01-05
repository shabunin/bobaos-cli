# bobaos-cli

CLI tool to commicate with KNX BAOS 838 module kBerry.

# Installation

1. Prepare your Raspberry Pi: install raspbian, enable ssh. Or you could download my image [here](https://drive.google.com/file/d/14nKNbaQfCUN9Mu7cFc5JTicbgbWo06kt/view?usp=sharing). In this case you should go directly to step 4. Image is based on 2017-11-29-raspbian-stretch-lite with installed nodejs 8, vim, git, enabled ssh and correct config.txt, cmdline.txt.

2. Install [KNX BAOS Module 838 kBerry](https://www.weinzierl.de/index.php/en/all-knx/knx-module-en/knx-baos-module-838-en) shield to your Raspberry Pi.

3 [Set up serial port](https://github.com/weinzierl-engineering/baos/blob/master/docs/Raspbian.adoc#kberry)

4. Install nodejs, git
```sh
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs git
```
5. Install this package globally:
```sh
sudo npm install -g bobaos-cli
```

# Usage
```sh
bobaos-cli
```
Now we are in interactive shell. First of all, get help:

```
bobaos> help
Commands:

  help [command...]                   Provides help for a given command.
  exit                                Exits application.
  open [options]                      Open serial port
  getDatapointDescription [options]   GetDatapointDescription.Req service
  setDatapointValue [options]         SetDatapointValue.Req service with command "set and send to bus"
  readDatapointFromBus [options]      SetDatapointValue.Req service with command "read via bus"
  getDatapointValue [options]         GetDatapointValue.Req service
  getParameterByte [options]          GetParameterByte.Req service
```

Open port and then send any command you want. Example:

```
bobaos> open
bobaos> getDatapoint
getDatapointDescription  getDatapointValue
bobaos> getDatapointDescription -s 1 -n 10
bobaos> { service: 'GetDatapointDescription.Res',
  direction: 'response',
  error: false,
  start: 1,
  number: 10,
  payload:
    [ { id: 1, valueType: 8, configFlags: 95, dpt: 'dpt9'  },
  { id: 2, valueType: 7, configFlags: 87, dpt: 'dpt5'  },
  { id: 3, valueType: 7, configFlags: 87, dpt: 'dpt5'  },
  { id: 4, valueType: 7, configFlags: 87, dpt: 'dpt5'  },
  { id: 5, valueType: 7, configFlags: 87, dpt: 'dpt5'  },
  { id: 6, valueType: 0, configFlags: 95, dpt: 'dpt1'  },
  { id: 7, valueType: 0, configFlags: 95, dpt: 'dpt1'  },
  { id: 8, valueType: 0, configFlags: 87, dpt: 'dpt1'  },
  { id: 9, valueType: 0, configFlags: 87, dpt: 'dpt1'  },
  { id: 10, valueType: 7, configFlags: 83, dpt: 'dpt5'  } ] }
bobaos>
bobaos> getDatapointValue -s 1 -n 10
bobaos> { service: 'GetDatapointValue.Res',
    direction: 'response',
    error: false,
    start: 1,
    number: 10,
    payload:
      [ { id: 1, state: 16, length: 2, value: <Buffer 0e 36>  },
    { id: 2, state: 16, length: 1, value: <Buffer 00>  },
    { id: 3, state: 16, length: 1, value: <Buffer 00>  },
    { id: 4, state: 0, length: 1, value: <Buffer 00>  },
    { id: 5, state: 16, length: 1, value: <Buffer 00>  },
    { id: 6, state: 0, length: 1, value: <Buffer 00>  },
    { id: 7, state: 0, length: 1, value: <Buffer 00>  },
    { id: 8, state: 0, length: 1, value: <Buffer 00>  },
    { id: 9, state: 0, length: 1, value: <Buffer 00>  },
    { id: 10, state: 0, length: 1, value: <Buffer 00>  } ] }
bobaos>
```

Thats it.
