import { db } from "../db/database.js";
import fs from "fs";

function exportRange(range) {
  db.all(
    "SELECT * FROM trending_repos WHERE range = ?",
    [range],
    (err, rows) => {
      if (err) {
        console.error(err);
        return;
      }

      fs.writeFileSync(
        `./mock/trending_${range}.json`,
        JSON.stringify(rows, null, 2)
      );

      console.log(`Exported ${range}`);
    }
  );
}

exportRange("week");
exportRange("month");
exportRange("all");