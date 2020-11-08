/* eslint-disable react/prop-types */
import React from 'react';
import { NextPage } from 'next';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Head from 'next/head';
import SearchAppBar from '../../components/nav';
import SideDrawer from '../../components/drawer';
import { Category } from '../../lib/interfaces/category.interface';
import CategoriesSheetsList from '../../components/categoriesSheetsList';
import Footer from '../../components/footer';
import { fetchSheetsLight } from '../../services/sheet.service';
import { fetchCategories } from '../../services/category.
ervice';
import { SheetLight } from '../../lib/interfaces/sheet.in
erface';
import { IncomingMessage } from 'http';

interface IProps
{
    sheetsLight: SheetLight[];
    ca

gories: Category[]

}

const useStyles = makeStyl
s(() =>
    createStyles({

 

    root: {
            fontSize: 
0.875rem',
       
    fontFamily:
'\'Avenir\', \'Roboto\', \'Helvet
ca\', \'Arial\', sans-serif',
            fontWeight: 400,
            lineHeight: '1.7
',
            letterSpacing
 '0.01071em',
            backg
ound: 'rgba(62, 72, 110, 0.05)',
      
 },
        content: {
            display: 'flex'

        }

    })
);

const 
heetPage: NextPage<IProps> =
({ sheetsL
ght, c
te

ries }) => 
{
    console.log(sheetsLight, categories)
    const cla e
 = useStyles();
    const [open, setOpen;
 = React.useState(false);

    r
turn (
        <div className={classes.root}>
    

      <Head>
                <title>PSEasy - Fiches
PSE</title>
      
     </Head>

            <CssBaseline />
        
   <div className={

asses.content}>
           
    <SearchAppBar open={open} setOpen={setOpe
} />

                <SideDrawer
                    open={op

}
                    setOp
n={setOpen}
                   
categories={categories}
             
      sheetsLight={sheetsLight}
           
    />

                <CategoriesSheetsList
                  

open={open}
                    categ
ries={categories}
             
      sheetsLight={sheetsLight}
           
    />
            </div>
            <Footer
/>
        </div>

   );
};

const ge
ServerSideProps = asyn
 ( req : Incom
ngMess
ge

=> 
{
    const start = +new Date();

    const apiCalls: Pr i
e<any>[] = [fetchSheetsLight
), fetchCategories()];
    con

 [sheetsLight, categories] = await Promise.all(apiCalls);

    const end = +n
w Date();
    console.log(
        `Data fetched ; Count: ${sheets

ght.length} in ${
          
 (end - start) /
1000
        } seconds`
    );

    return {props : {
    
   sheetsLight: sheetsLight,
   
    categories,
  
 }};
}


export { getServerSi
eProps };
export default SheetPag
;






