import clean from "./query/clean";
import insertCategories from "./query/insertCategories";
const fs = require("fs");
const pdf2md = require("@opendocsg/pdf2md");
const path = require("path");

const parser = () => {
  console.log("lauch parsing");
  //   clean();

  const pdfBuffer = fs.readFileSync("./lib/REF.pdf");

  let i = 1;
  pdf2md(pdfBuffer, undefined)
    .then((text: string) => {
      // let outputFile = "./file" + i + ".md";
      // console.log(`Writing to ${outputFile}...`);
      // fs.writeFileSync(path.resolve(outputFile), text);
      //  console.log("Done.");
      //   console.log(text);

      //   const matchs = [...text.matchAll(/\*\*([0-9].[0-9])\s(.*)\*\*/g)];

      //   const exp = matchs.map(m => ({
      //     num: m[1],
      //     name: m[2].replace("– ", "")
      //   }));

      //   // delete doublons

      //   // insert in BD
      //   insertCategories(exp);
      //   console.log(exp);

      //       ^#{1}\s((.|\n)*)#
      // \*\*([0-9].[0-9])\s(.*)\*\*
      // \n\n((.|\n)*)^####

      const sheets = text.split(" Référence	   :");
      sheets.shift();
      console.log("sheets nb : ", sheets.length);
      // console.log(sheets.match(/%^#{4}\s([A-Z].*\n\n.*)/gm)]) // ^#{4}\s([A-Z].*\n\n.*)
      // sheets.forEach(s => console.log(s.match(/^(.*)/g)));
      sheets.forEach(s => console.log(s.match(/%^#{4}\s([A-Z].*\n\n.*)/gm)));
    })
    .catch((err: any) => {
      console.error(err);
    });
};

export default parser;
