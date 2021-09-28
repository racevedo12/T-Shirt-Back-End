const User = require("../models/User");
/// Require the Job model
const Item = require("../models/Item");
// Require the data
const seedData = require("./seeds.json");

const getUser = async () => {
  try {
    if (!process.argv[2]) {
      throw new Error(
        "To seed the database provide an email address for an existing user"
      );
    }
    const user = await User.findOne({ email: process.argv[2] });
    if (!user) {
      throw new Error("No matching user found!");
    }
    return user;
  } catch (error) {
    console.error(error);
  }
};

Item.deleteMany()
  .then(getUser)
  .then((user) => {
    const seedDataWithOwner = seedData.map((item) => {
      item.owner = user._id;
      return item;
    });
    return Item.insertMany(seedDataWithOwner);
  })
  .then(console.log)
  .then(console.error)
  .finally(() => {
    process.exit();
  });

// // Delete any existing documents in the jobs collection
// Item.deleteMany()
//   // Use insertMany and pass it the seed data
//   .then(() => Item.insertMany(seedData))
//   // Log the successful results
//   .then(console.log)
//   // Log any errors if things didn't work
//   .catch(console.error)
//   // Use finally, so that this code will run whether or not
//   // things worked and close our connection to the database.
//   .finally(process.exit);
