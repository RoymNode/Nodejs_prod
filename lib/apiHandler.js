// 1. Import 'http' module
const http = require('http');
const path = require('path');
const url = require('url');
const { isNumberObject } = require('util/types');

// 'Customers' - Resources database
let customers = [
    {
        id: 1,
        name: "John Doe",
        address: "123 Main St, Springfield",
        numberOfAccounts: 2,
        balance: 1500.75
    },
    {
        id: 2,
        name: "Jane Smith",
        address: "456 Oak St, Metropolis",
        numberOfAccounts: 1,
        balance: 2500.50
    },
    {
        id: 3,
        name: "Alice Johnson",
        address: "789 Pine St, Gotham",
        numberOfAccounts: 3,
        balance: 3500.00
    },
    {
        id: 4,
        name: "Bob Brown",
        address: "101 Maple St, Star City",
        numberOfAccounts: 4,
        balance: 4500.25
    },
    {
        id: 5,
        name: "Charlie Davis",
        address: "202 Birch St, Central City",
        numberOfAccounts: 1,
        balance: 5500.75
    },
    {
        id: 6,
        name: "Diana Evans",
        address: "303 Cedar St, Coast City",
        numberOfAccounts: 2,
        balance: 6500.50
    },
    {
        id: 7,
        name: "Ethan Foster",
        address: "404 Elm St, Bludhaven",
        numberOfAccounts: 3,
        balance: 7500.00
    },
    {
        id: 8,
        name: "Fiona Green",
        address: "505 Spruce St, Keystone City",
        numberOfAccounts: 4,
        balance: 8500.25
    },
    {
        id: 9,
        name: "George Harris",
        address: "606 Ash St, Smallville",
        numberOfAccounts: 1,
        balance: 9500.75
    },
    {
        id: 10,
        name: "Hannah Martin",
        address: "707 Walnut St, Fawcett City",
        numberOfAccounts: 2,
        balance: 10500.50
    },
    {
        id: 11,
        name: "Isaac Nelson",
        address: "808 Chestnut St, Hub City",
        numberOfAccounts: 3,
        balance: 11500.00
    },
    {
        id: 12,
        name: "Jackie O'Neill",
        address: "909 Poplar St, Midway City",
        numberOfAccounts: 4,
        balance: 12500.25
    },
    {
        id: 13,
        name: "Karen Phillips",
        address: "1010 Beech St, Ivy Town",
        numberOfAccounts: 1,
        balance: 13500.75
    },
    {
        id: 14,
        name: "Liam Quinn",
        address: "1111 Cypress St, Opal City",
        numberOfAccounts: 2,
        balance: 14500.50
    },
    {
        id: 15,
        name: "Megan Roberts",
        address: "1212 Holly St, Happy Harbor",
        numberOfAccounts: 3,
        balance: 15500.00
    },
    {
        id: 16,
        name: "Nathan Scott",
        address: "1313 Redwood St, Ivy City",
        numberOfAccounts: 4,
        balance: 16500.25
    },
    {
        id: 17,
        name: "Olivia Turner",
        address: "1414 Willow St, Monument Point",
        numberOfAccounts: 1,
        balance: 17500.75
    },
    {
        id: 18,
        name: "Patrick Underwood",
        address: "1515 Alder St, Platinum Flats",
        numberOfAccounts: 2,
        balance: 18500.50
    },
    {
        id: 19,
        name: "Quincy Vaughn",
        address: "1616 Sequoia St, New Carthage",
        numberOfAccounts: 3,
        balance: 19500.00
    },
    {
        id: 20,
        name: "Rachel White",
        address: "1717 Fir St, Coral City",
        numberOfAccounts: 4,
        balance: 20500.25
    }
];

// 2. Create a server
const handleApiRequest = (request, response) => {
    // API structure
    // api/v1/customers - GET ALL
    // api/v1/customers/{id} - GET (one)
    // api/v1/customers - POST --> {body: {...}}
    // api/v1/customers/{id} - PUT --> {body: {id:, name:, address:, ...}}
    // api/v1/customers/{id} - PATCH --> {body: {id:, name:}}
    // api/v1/customers/{id} - DELETE

    // 1. Break down URL to components
    const parsedUrl = url.parse(request.url, true);
    const pathname = parsedUrl.pathname; // --> api/v1/customers
    const method = request.method; // --> GET
    let maxValue = Math.max.apply(null, customers.map(function (o) { return o.id; }));
    const urlSegments = pathname.split('/');
    const lastPart = urlSegments[urlSegments.length - 1];
    const lastLastPart = urlSegments[urlSegments.length - 2];

    // --customers--GET--
    // --customers--x--GET--
    // --customers--POST--
    if (pathname.startsWith('/api/v1')) {
    let route = '';
    if (lastPart === 'customers' || lastLastPart === 'customers') {
        route = lastLastPart === 'customers' ? '--customers--x--' : '--customers--';
    }
    const param = `${route}${method}--`;
    switch (`${route}${method}--`) {
        case '--customers--GET--':
            response.writeHead(200, {'Content-Type': 'application/json'});
            response.end(JSON.stringify(customers));
        break;
        case '--customers--POST--':
            var body = '';
            request.on('data', function (data) {
                body += data;
            });
            request.on('end', function () {
                const reqBody = JSON.parse(body);
                const newCustomer = {id: ++maxValue, name: reqBody.name, address: reqBody.address, numberOfAccounts: reqBody.numberOfAccounts, balance: reqBody.balance};
                customers.push(newCustomer)
                response.writeHead(201, {'Content-Type': 'application/json'});
                response.end(JSON.stringify(newCustomer));
            });
        break;
        case '--customers--x--GET--':
            const customer = customers.find(c => c.id == lastPart);
            if (customer) {
                response.writeHead(200, {'Content-Type': 'application/json'});
                response.end(JSON.stringify(customer));
            } else {
                response.writeHead(404, {'Content-Type': 'application/json'});
                response.end(JSON.stringify(`Custome with id: ${lastPart} not found!`));
            }
        break;
        case '--customers--x--PUT--':
            var body = '';
            request.on('data', function (data) {
                body += data;
            });
            request.on('end', function () {
                const reqBody = JSON.parse(body);
                const arrIdx = customers.findIndex(c => c.id == lastPart);
                if (arrIdx >= 0) {
                    customers[arrIdx].name = reqBody.name;
                    customers[arrIdx].address = reqBody.address;
                    customers[arrIdx].numberOfAccounts = reqBody.numberOfAccounts;
                    customers[arrIdx].balance = reqBody.balance;

                    response.writeHead(200, {'Content-Type': 'application/json'});
                    response.end(JSON.stringify(customers[arrIdx]));
                } else {
                    response.writeHead(404, {'Content-Type': 'application/json'});
                    response.end(JSON.stringify(`Custome with id: ${lastPart} not found!`));
                } 
            });
        break;
        case '--customers--x--DELETE--':
            const customer1 = customers.find(c => c.id == lastPart);
            const arrIdx = customers.findIndex(c => c.id == lastPart);
            if (customer1) {
                customers.splice(arrIdx, 1);
                response.writeHead(204);
                response.end();
            } else {
                response.writeHead(404, {'Content-Type': 'application/json'});
                response.end(JSON.stringify(`Custome with id: ${lastPart} not found!`));
            }
        break;
    }
    } else {
        response.writeHead(404, {'Content-Type': 'application/json'});
        response.end(JSON.stringify(`Resource not found`));
    }
};

module.exports = { handleApiRequest };