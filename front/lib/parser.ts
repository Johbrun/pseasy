import clean from "./query/clean";
import insertCategories from "./query/insertCategories";
import { SheetCreation } from "./interfaces/sheet.interface";
import insertSheet from "./query/insertSheet";
const fs = require("fs");
const pdf2md = require("@opendocsg/pdf2md");
const path = require("path");

const parser = async () => {
  console.log("launch parsing");
  const startDate = new Date();
  let nbSheet = 0;
  let nbErr = 0;
  await clean();

  const pdfBuffer = fs.readFileSync("./lib/REF.pdf");

  let i = 1;
  pdf2md(pdfBuffer, undefined)
    .then(async (text: string) => {
      const matchs = [...text.matchAll(/^(#{4}\s[A-Z](.|\n)*?(?=[A-Z]|#{5}))((.|\n)*?(?=^####\s))/gm)];
      console.log(`PDF parsed with success. ${matchs.length} regex matchs founds`);

      // regroup titles on several lines
      // matchs.forEach(m => {
      for (const m of matchs) {
        nbSheet++;
        const title = m[1].replace(/[#\n]*/g, "").trim();
        try {
          // regroup titles on several lines
          const id = i++;
          const refString = m[3].match(/^ Référence.*/gm)[0];
          const content = m[3]
            .replace(/^ Référence.*/gm, "") // Remove ref line
            .replace(/[\t]*/g, "") // Delete tabulations
            .replace(/###/g, "") // Up titles : be careful : max : h2
            .replace(/ +/g, " ") // delete supp spaces
            .replace(/(.{1})(7)(.{1})/g, "$1ti$3")
            .replace(/(.{1})(F)(.{1})/g, "$1tt$3")
            .replace(/\^/g, "")
            .trim();
          const refM = [
            ...refString.matchAll(/^\s*Référence\s*:\s*(.*)\s*Version\s*:\s*(.*)\s*Mise\s*à\s*jour\s*:\s*(.*)/gm)
          ][0];
          const reference = refM[1].replace(/[\s\t]*/g, "").trim();
          const version = refM[2].trim();
          const updatedDate = new Date(); //refM[3].trim();

          const sheet: SheetCreation = {
            id: id.toString(),
            title,
            content: content,
            reference,
            version,
            updatedDate
          };

          await insertSheet(sheet).catch(e => nbErr++);
        } catch (e) {
          nbErr++;
          console.error(`Error on sheet '${title}' (${i}) : ${e}`);
        }
      }

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
    .then(() =>
      console.log(`Process ended in ${(+new Date() - +startDate) / 1000} sec for ${nbSheet} sheets and ${nbErr} errors`)
    )
    .catch((err: any) => {
      nbErr++;
      console.error(err);
    });
};

export default parser;
