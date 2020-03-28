import cleanByUpdateYear from './query/cleanByUpdateYear';
import insertCategories from './query/insertCategories';
import { SheetCreation } from './interfaces/sheet.interface';
import insertSheet from './query/insertSheet';
import updateSheetsCategory from './query/updateSheetsCategory';
import { json } from 'express';
import { fromDateFormated } from './helpers/fromDateFormated';
const fs = require('fs');
const pdf2md = require('@opendocsg/pdf2md');
const path = require('path');

const parseSheets = async (body: string, year : string) => 
{

    const r1 = body.match(/Référence :/g)!.length;
    console.log(`Received ${r1} sheets`);

    await cleanByUpdateYear(year);
    // add end for next regex
    body+= '<table>\n<tbody>\n<tr class="odd">\n<td><blockquote>\n<p>Référence :';

    // extract sheets
    const sheets = [...body.matchAll(/<table>.*?(?=<table>\n<tbody>\n<tr class="odd">\n<td><blockquote>\n<p>Référence :)/gmis)].map(m => m[0]);
    let nbErr=0;
    let header;
    let i = 0;
    for (let sheet of sheets)
    {
        i++;
        try
        {
            sheet = sheet.replace(/ \u00a0+/g, ' ') // delete supp spaces
                .trim();
            const matches = [...sheet.matchAll(/<table>((.|\n)*)?(?=^# )((.|\n)*)/gmi)];

            header = matches[0][1] ;
            let content = matches[0][3];

            let [, reference, , version, , updatedDate] = header.match(/<p>(.*)<\/p>/gmi)!.map(h => h.replace('<p>', '').replace('</p>', ''));
            const title = content.match(/^# (.*)/gm);
            if (!title)
            {
                throw new Error('Sheet with no title');
            }
        
            content = content.replace(title[0], '').replace(/^\n*/, '');

            const sheetCreation: SheetCreation = {
                title : title[0].replace('# ', '').trim(),
                content,
                reference:reference.replace(/ /gi, ''),
                version:version.replace(/N/gi, ''),
                updatedDate: fromDateFormated(updatedDate)
            };
            await insertSheet(sheetCreation);
        }
        catch(e)
        {
            console.error(i,e);
            nbErr++;
            let outputFilePath = './debug/' + year + '-' +i + '.md';
            console.log(`Writing to ${outputFilePath}...`);
      
            fs.writeFileSync(path.resolve(outputFilePath), e+'\n\n\n'+sheet);
        }
    }

    await updateSheetsCategory();

    return {r1, r2 :sheets.length, err : nbErr};
};

const parser = async () => 
{
    console.log('Launch PDF parsing...');
    const startDate = new Date();
    let nbSheet = 0;
    let nbErr = 0;
    // await clean();

    const pdfBuffer = fs.readFileSync('./lib/REF2019_1C.pdf');

    let i = 1;
    pdf2md(pdfBuffer, undefined)
        .then(async (text: string) => 
        {
            const matchs = [...text.matchAll(/^(#{4}\s[A-Z](.|\n)*?(?=[A-Z]|#{5}))((.|\n)*?(?=^####\s))/gm)];
            console.log(`PDF parsed with success. ${matchs ? matchs.length : '0'} regex matchs founds`);

            // regroup titles on several lines
            // matchs.forEach(m => {
            for (const m of matchs) 
            {
                nbSheet++;
                const title = m[1]
                    .replace(/[#\n]*/g, '')
                    .replace(/-$/g, '')
                    .trim();
                try 
                {
                    // regroup titles on several lines
                    const id = i++;
                    let refString = m[3] ? m[3].match(/^ Référence.*/gm) : '';
                    refString = refString ? refString[0] : (refString = '');
                    let content = m[3]
                        .replace(/^ Référence.*/gm, '') // Remove ref line
                        .replace(/[\t]*/g, '') // Delete tabulations
                        .replace(/###/g, '') // Up titles : be careful : max : h2
                        .replace(/(.{1})(7)(.{1})/g, '$1ti$3')
                        .replace(/(.{1})(F)(.{1})/g, '$1tt$3')
                        .replace(/(#+ [A-z].*)(\n\n#+)( [a-z])/g, '$1$3') // uncut titles
                        .replace(/\^/g, '')
                        .replace(/ \u00a0+/g, ' ') // delete supp spaces
                        .trim();

                    const refM = [
                        ...refString.matchAll(/^\s*Référence\s*:\s*(.*)\s*Version\s*:\s*(.*)\s*Mise\s*à\s*jour\s*:\s*(.*)/gm)
                    ][0];
                    const reference = refM[1].replace(/[\s\t]*/g, '').trim();
                    const version = refM[2].trim();
                    const updatedDate = new Date(); //refM[3].trim();

                    const sheet: SheetCreation = {
                        id: id.toString(),
                        title,
                        content,
                        reference,
                        version,
                        updatedDate
                    };
                     //await insertSheet(sheet).catch(e => nbErr++);
                }
                catch (e) 
                {
                    nbErr++;
                    console.error(`Error on sheet '${title}' (${i}) : ${e}`);
                }
            }
            // await updateSheetsCategory();

            // let outputFile = "./file" + i + ".md";
            // console.log(`Writing to ${outputFile}...`);
            // fs.writeFileSync(path.resolve(outputFile), text);
            //  console.log("Done.");
            //   console.log(text);

            //   const matchs = [...text.matchAll(/\*\*([0-9].[0-9])\s(.*)\*\*/g)];

            //   const exp = matchs.map(m => ({
            //     num: m[1],
            //     name: m[2].replace("– ", "").toLowerCase()
            //   }));

            //   // delete doublons

            //   // insert in BD
            //   insertCategories(exp);
            //   console.log(exp);

            //       ^#{1}\s((.|\n)*)#
            // \*\*([0-9].[0-9])\s(.*)\*\*
            // \n\n((.|\n)*)^####

            // const sheets = text.split(" Référence	  :");
            // sheets.shift();
            // console.log("sheets nb : ", sheets.length);
            // console.log(sheets.match(/%^#{4}\s([A-Z].*\n\n.*)/gm)]) // ^#{4}\s([A-Z].*\n\n.*)
            // sheets.forEach(s => console.log(s.match(/^(.*)/g)));
            // sheets.forEach(s => console.log(s.match(/%^#{4}\s([A-Z].*\n\n.*)/gm)));
        })
        .then(() =>
            console.log(`Process ended in ${(+new Date() - +startDate) / 1000} sec for ${nbSheet} sheets and ${nbErr} errors`)
        )
        .catch((err: any) => 
        {
            nbErr++;
            console.error(err);
        });
};

export { parser, parseSheets };
