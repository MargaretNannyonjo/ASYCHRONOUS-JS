const superagent = require("superagent");
const fs = require("fs");

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject("I could not find the file");
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject("Can't write a file");
      resolve("Success");
    });
  });
};

const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    const breed = data.toString().trim();
    console.log(`Breed: ${breed}`);

    const res = await superagent.get(
      `https://dog.ceo/api/breed/${breed}/images/random`
    );

    await writeFilePro("dog-img.txt", res.body.message);
    console.log("Random dog image saved to the file");
  } catch (err) {
    console.error(err);
  }
};

getDogPic();

///////////////////////////////
////OPT @2

readFilePro(`${__dirname}/dog.txt`)
  .then((data) => {
    const breed = data.toString().trim();

    console.log(`Breed: ${breed}`);

    return superagent.get(`https://dog.ceo/api/breed/${breed}/images/random`);
  })
  .then((res) => {
    return writeFilePro("dog-img.txt", res.body.message);
  })
  .then(() => {
    console.log("Random dog image saved to the file");
  })
  .catch((err) => {
    console.error(err.message);
  });
