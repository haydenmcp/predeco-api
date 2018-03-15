const { buildSchema } = require('graphql');

module.exports.schema = buildSchema(`
  type Circle {
    x: Int,
    y: Int,
    radius: Int,
    color: String
  },
  type Rectangle {
    x: Int,
    y: Int,
    width: Int,
    height: Int,
    color: String
  },
  type Query {
    circles: [Circle],
    rectangles: [Rectangle]
  }
`);

module.exports.rootValue = {
  circles: () => [{
      x: 30,
      y: 30,
      radius: 20,
      color: 'red'
    },{
      x: 70,
      y: 70,
      radius: 30,
      color: 'green'
    },{
      x: 110,
      y: 100,
      radius: 5,
      color: 'blue'
    },{
      x: 50,
      y: 50,
      radius: 10,
      color: 'purple'
    },{
      x: 205,
      y: 100,
      radius: 10,
      color: 'magenta'
    },{
      x: 55,
      y: 300,
      radius: 15,
      color: 'yellow'
    },{
      x: 400,
      y: 250,
      radius: 50,
      color: 'grey'
    }],
  rectangles: () => [{
    x: 10,
    y: 10,
    height: 10,
    width: 10,
    color: 'cyan'
  },{
    x: 20,
    y: 20,
    height: 10,
    width: 10,
    color: 'green'
  },{
    x: 30,
    y: 30,
    height: 10,
    width: 10,
    color: 'magenta'
  }]};
