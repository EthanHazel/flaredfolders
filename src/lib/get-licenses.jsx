import checker from "license-checker";

export function getLicenses() {
  return new Promise((resolve, reject) => {
    checker.init(
      {
        start: process.cwd(),
        production: true,
        json: true,
      },
      (err, packages) => {
        if (err) {
          reject(err);
        } else {
          resolve(packages);
        }
      },
    );
  });
}
