import mongoose from 'mongoose';
import Composer from '../models/Composer.js';
import Work from '../models/Work.js';
import "../db-connect.js";
import fetch from "node-fetch";

console.log("composerSeed.js is running...");


(async function () {
  // * DELETE ALL COMPOSERS
  try {
    await Composer.deleteMany({});
    console.log(`All Composers have been deleted.`);
  } catch (err) {
    console.log(err);
  }

  // * DELETE ALL WORKS
  try {
    await Work.deleteMany({});
    console.log(`All Works have been deleted.`);
  } catch (err) {
    console.log(err);
  }
  
  // * GET DATA DUMP FROM OPEN OPUS
  const dumpData = await(await fetch('https://api.openopus.org/work/dump.json')).json();

  // * SEED COMPOSERS
  const composerPromises = dumpData.composers.map((item)=>{
    const completeName = item.complete_name;
    const filteredName = completeName.replace(/[-']/g, " ").split(" ").filter(item=>item.length>3).join(" ");
    return fetch(`https://api.openopus.org/composer/list/search/${filteredName}.json`)
    .then(res=>res.json())
    .then(addData=>{
      if(addData.composers.length>1){
        addData.composers.filter(composer=>{
          return composer.name === item.name;
        });
      }

      // * SEED WORKS
      return Work.create(item.works)
      .then(createdWorks=>{
        const workIds = createdWorks.map(work=>{
          return work._id;
        })
        const newComposer = {...item, works:workIds, composerId:addData.composers[0].id, portrait:addData.composers[0].portrait};
        const composer  = new Composer(newComposer);
        return composer.save();
      })
    })
  });

  const createdComposers = await Promise.all(composerPromises)

  mongoose.connection.close();
})();