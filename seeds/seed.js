import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Composer from '../models/Composer.js';
import "../db-connect.js";
import fetch from "node-fetch";

dotenv.config();

console.log("seed running...");


(async function () {
  try {
    await Composer.deleteMany({});
    console.log(`All Composers have been deleted.`);
  } catch (err) {
    console.log(err);
  }
  
  const dumpData = await(await fetch('https://api.openopus.org/work/dump.json')).json();

  const composerPromises = dumpData.composers.map((item)=>{
    const completeName = item.complete_name;
    const filteredName = completeName.replace(/[-']/g, " ").split(" ").filter(item=>{
      return item.length>3;
    }).join(" ");
    return fetch(`https://api.openopus.org/composer/list/search/${filteredName}.json`)
    .then(res=>res.json())
    .then(addData=>{
      if(addData.composers.length>1){
        addData.composers.filter(composer=>{
          return composer.name === item.name;
        });
      }
      const newComposer = {...item, composerId:addData.composers[0].id, portrait:addData.composers[0].portrait};
      const composer  = new Composer(newComposer);
      return composer.save()
    })
  });

  await Promise.all(composerPromises);

  mongoose.connection.close();
})();
