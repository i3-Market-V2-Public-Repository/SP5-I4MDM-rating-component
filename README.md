# Rating Component

A modular component allowing users to create, manage and aggregate rating objects on Various i3Market transactions. 

## Installation

### Requirements

NodeJS\
npm\
Docker

### Run with Docker
The project currently contains two containers, the main backend service and an internal mongoDB database. Both can be initialized via docker compose.

1) Clone the project
2) Configure the .env file
3) Run both containers with docker compose

``` bash
docker compose up
```
4) The rating backend is running on http://localhost:3001
5) The OAS documentation can be accessed [here](http://localhost:3001/api-docs/)

## Credits
George Benos (gbenos@telesto.gr)\
Edgar Fries (edgar.fries@siemens.com)

## Contributing
Pull requests are welcome.

Please make sure to update tests as appropriate.

## License
[EUPL-1.2](https://choosealicense.com/licenses/eupl-1.2/)
