import clean from "./query/clean";
import insertCategories from "./query/insertCategories";
import { SheetCreation } from "./interfaces/sheet.interface";
import insertSheet from "./query/insertSheet";
const fs = require("fs");
const pdf2md = require("@opendocsg/pdf2md");
const path = require("path");

const parser = () => {
  console.log("lauch parsing");
  const startDate = new Date();
  //   clean();

  const pdfBuffer = fs.readFileSync("./lib/REF.pdf");

  let i = 1;
  pdf2md(pdfBuffer, undefined)
    .then((text: string) => {
      const matchs = [...text.matchAll(/^(#{4}\s[A-Z](.|\n)*?(?=[A-Z]|#{5}))((.|\n)*?(?=^####\s))/gm)];

      // regroup titles on several lines
      matchs.forEach(m => {
        const title = m[1].replace(/[#\n]*/g, "").trim();
        try {
          // regroup titles on several lines
          const id = i++;
          const refString = m[3].match(/^ Référence.*/gm)[0];
          const content = m[3]
            .replace(/^ Référence.*/gm, "")
            .replace(/[\t]*/g, "")
            .trim();
          const refM = [
            ...refString.matchAll(/^\s*Référence\s*:\s*(.*)\s*Version\s*:\s*(.*)\s*Mise\s*à\s*jour\s*:\s*(.*)/gm)
          ][0];
          const reference = refM[1].replace(/[\s\t]*/g, "").trim();
          const version = refM[2].trim();
          const updatedDate = new Date(); //refM[3].trim();
          const createdAdminDate = new Date();

          const sheet: SheetCreation = {
            id: id.toString(),
            title,
            content: content,
            reference,
            version,
            updatedDate
          };
          insertSheet(sheet);
          // console.log(sheet);
          //console.log(m)
        } catch (e) {
          console.error(`Error on sheet '${title}' (${i}) : ${e}`);
        }
      });

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

      // const sheets = text.split(" Référence	   :");
      // sheets.shift();
      // console.log("sheets nb : ", sheets.length);
      // console.log(sheets.match(/%^#{4}\s([A-Z].*\n\n.*)/gm)]) // ^#{4}\s([A-Z].*\n\n.*)
      // sheets.forEach(s => console.log(s.match(/^(.*)/g)));
      // sheets.forEach(s => console.log(s.match(/%^#{4}\s([A-Z].*\n\n.*)/gm)));
    })
    .catch((err: any) => {
      console.error(err);
    });

  console.log(`Process ended in ${(+new Date() - +startDate) / 1000} sec`);
};

export default parser;
