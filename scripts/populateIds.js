import fs from "fs";

fs.readFile("./data/MOCK_DATA.json", function (err, data) {
  if (err) throw err;
  const users = JSON.parse(data);

  users.forEach((user, index) => {
    user.id = `${index + 1}`;
  });

  const jsonData = JSON.stringify(users);

  fs.writeFile("./data/db2.json", jsonData, "utf8", (err) => {
    if (err) {
      console.error("Error writing to file", err);
    } else {
      console.log("Data written to file");
    }
  });
});
