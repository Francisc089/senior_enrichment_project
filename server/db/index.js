const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL, { logging : false });

//Models
const School = conn.define('school', {
  name : {
    type : Sequelize.STRING,
    allowNull : false
  }, 
  address : {
    type: Sequelize.STRING,
    allowNull : false
  },
  description : {
    type : Sequelize.TEXT,
  allowNull : false
}
});

const Student = conn.define('student', {
  firstName : {
    type : Sequelize.STRING,
    allowNull : false
  },
  lastName : {
    type: Sequelize.STRING,
    allowNull : false
  },
  gpa : {
    type : Sequelize.DECIMAL,
    defaultValue : null,
    validate : {
      min : 0.0,
      max : 4.0,
      isDecimal : true
    }
  }
});

//Associations
Student.belongsTo(School); //use student.setSchool() to set school
School.hasMany(Student);

//SyncAndSeed
const syncAndSeed = () => {
  //variables hold the promise results
  let fullstack, hardKnocks, acmeSchool, elmer, annie, elon;
  return conn.sync({ force : true })
    .then(() => Promise.all([
      School.create({ name : 'Fullstack Academy', address : '5 Hanover Sq, New York, NY 10004', description : 'Best place to learn code' }),
      School.create({ name : 'School of Hard Knocks', address : 'The mean streets of Earth', description : "It's a hard knock life for us" }),
      School.create({ name : 'Acme School of Tom Foolery', address : 'Looney Tunes st, Acme City, Disney 42068', description : "Where the Tunes go to get Looney" })
    ]))
    .then((schools) => {
      [ fullstack, hardKnocks, acmeSchool ] = schools;
      return Promise.all([
      Student.create({ firstName : 'Elmer', lastName : 'Fudd', gpa : 2.54 }),
      Student.create({ firstName : 'Annie', lastName : 'Ruok', gpa : 3.01 }),
      Student.create({ firstName : 'Elon', lastName : 'Bezos', gpa : 4.0 })
      ]);
    })
    .then((students) => {
      [ elmer, annie, elon ] = students;
      return Promise.all([
      elmer.setSchool(acmeSchool),
      annie.setSchool(hardKnocks),
      elon.setSchool(fullstack)
      ]);
    })
};

module.exports = {
  syncAndSeed,
  models : {
    Student,
    School
  }
};