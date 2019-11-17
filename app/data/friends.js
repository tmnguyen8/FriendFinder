// ===============================================================================
// DATA
// Below data will hold all of the reserved tables.
// Initially we just set it equal to a "dummy" customer.
// But you could have it be an empty array as well.
// ===============================================================================

var friendArray = [
    {
        "name": "goku",
        "photo": "https://comicvine1.cbsistatic.com/uploads/original/11137/111372607/6749946-46108866_2138130396245355_1197692474502530083_n.jpg",
        "scores": [
        "2",
        "2",
        "3",
        "4",
        "4",
        "4",
        "4",
        "3",
        "3",
        "3"
        ],
        "totalScore": "32"
    },
    {
        "name": "gohan",
        "photo": "https://techanimate.com/wp-content/uploads/2017/11/Why-does-Gohan-Have-so-much-Hidden-Power.jpg",
        "scores": [
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "4"
        ],
        "totalScore": "10"
    }
  ];
  
  // Note how we export the array. This makes it accessible to other files using require.
  module.exports = friendArray;
  