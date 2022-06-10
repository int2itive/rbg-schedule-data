var ready = (callback) => {
  if (document.readyState != "loading") callback();
  else document.addEventListener("DOMContentLoaded", callback);
}

ready(() => { 
  /* Do things after DOM has fully loaded */
  const wrapper = document.querySelector('.rbg--schedule-wrap');
  const { length, 0: first, [length - 1]: last } = data; // console.log(first);
  var initial = -1, h = -1;
  const tap = [];
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  for(let key of Object.keys(first)) {
    if (key === "schedule") {
      const dateVal = first["date"]; //console.log(dateVal); // 25/03/2022
      const artistDetail = first[key]; //console.log(artistDetail); // This is the order prior to operation
      const event_date = getInitialDate(dateVal);
      console.log(event_date); // 03/25/2022
      //let schedOrder = artistDetail.map(reviseSchedOrder);
      let schedOrder = artistDetail.reduce(reviseSchedOrder, []);
      let m = first[key];
      // ret = [];

      console.log(schedOrder);
      // let qualifiers = artistDetail.reduce(arrangeSchedOrder, []);
      // let qualFinalised = Array.from(new Set(qualifiers));
      // console.log(qualifiers);
      //qualifiers.map(scheduleTemplate).join('')
    }

  }

  function reviseSchedOrder(re, detail) {
      console.log(re);
      let t, h, m, currentArtist;
      const delim = ":";
      ({ artist: { name }, time } = detail);
      hrsMins = detail.time.split(delim);
      console.log(name);
      const ed = getInitialDate(first["date"]); 
      var [ cvMonth, cvDay, cvYear ] = ed.split("/");
      var nd = new Date(`${cvYear}, ${cvMonth}, ${cvDay}`); // console.log(nd);

      const buildTime = {
        theYear: nd.toLocaleString('en-UK', { year: 'numeric' }),
        theMonth: nd.toLocaleString('en-UK', { month: 'long' }),
        theDay: nd.toLocaleString('en-UK', { day: 'numeric' })
      }

      // This is the date of the event combined with the times of the current artist performance
      const nnd = new Date(`${buildTime.theMonth} ${buildTime.theDay}, ${buildTime.theYear} ${hrsMins[0]}:${hrsMins[1]}:00`);
      console.log(nnd);

      const localTimeString = nnd.toLocaleTimeString(undefined, {
          hour:   '2-digit',
          minute: '2-digit',
          second: '2-digit',
      });

      if (!re.length) { // r.length === 0
          console.log("There are no Records");
          re.push(detail);
      } else {
          initial +=1; console.log("The initial variable is now: "+initial);
          let t;
          h = re.length;
          //console.log(h);
          ({ time: t } = re[initial]); 
          const timeObj = {
            hours: parseInt(t.split(":")[0]),
            mins: parseInt(t.split(":")[1])

          }
              // newHours: time.split(":")[0],
              // newmMins: time.split(":")[1]
          //}

          // console.log(nnd.getTime() > currentArtist.getTime());
          console.log(nnd.getTime());
          if (nnd.getHours() === timeObj["hours"]) {
            console.log("Checking Minute Value...");
            var minCheck = (nnd.getMinutes() > timeObj["mins"])
            if (minCheck) { console.log("Appreaning Later...");
              re.push(detail);
            } else {
              re.splice(initial, 0, detail);
            }
            // currentArtist = nnd;
          } else {
            (nnd.getHours() > timeObj["hours"]) ? re.push(detail) : re.splice(initial, 0, detail);
          }

      }
        console.log(localTimeString);
        return re;
  }

  function getInitialDate(dateArg) {
    const initialDate = swapArrayElements(dateArg.split("/"), 0, 1).join("/");
    var [ convertMonth, convertDay, convertYear ] = initialDate.split("/");
    var mm = new Date(`${convertYear}, ${convertMonth}, ${convertDay}`);
    console.log(mm.toLocaleString('en-GB', options));
    // console.log(mm.toLocaleString('en-UK', { month: 'long' }));
    // console.log(mm.toLocaleString('en-UK', { weekday: 'long' }));
    // var d5 = new Date(event_date).getMonth();
    //var d3 = new Date(Date.parse(initialDate)); console.log(d3); // Fri Mar 25 2022 00:00:00 GMT+0000 (Greenwich Mean Time)
    return initialDate;
  }

  /**
  * Swap the elements in an array at indexes x and y.
  *
  * @param (a) The array.
  * @param (x) The index of the first element to swap.
  * @param (y) The index of the second element to swap.
  * @return {Array} The input array with the elements swapped.
  */

  function swapArrayElements(a, x, y) {
    if (a.length === 1) return a;
    a.splice(y, 1, a.splice(x, 1, a[y])[0]);
    return a;
  };

  const capitalizeString = str => str.replace(/b[a-z]/g, char => char.toUpperCase());
  //capitalizeString('niem vui lap trinh'); /* 'Niem Vui Lap Trinh' */

  // const scheduleFill = `
  //     <div class="card--container">
  //       <div class="schedule--card guest--background">
  //         <section class="rbg--event-detail">

  //           <p class="event--status">Spoken Word/Poetry</p>
  //           <div class="event--main">
  //             <span class="event--time">${time}</span>
  //             <div class="event--act-details">
  //               <h3>Lady Esi</h3>
  //               <p>Guest Performer</p>
  //             </div>
  //             <div class="event--act-meta">
  //               <div class="event--img-wrap">
  //                 <img class="event--act-img" src="../../../etc/assets/rbg/clips/LE-20201030-C0-V-03.jpg" alt="Performer Avatar" />
  //               </div>
  //             </div>
  //           </div>

  //         </section>
  //         <div class="additional-detail">
  //           <div class="rbg--detail-xtra">
  //             <h3>Additional Information</h3>
  //             <div class="rbg--detail-block">
  //               <span class="rbg--flag-cont">
  //                 <svg class="icon">
  //                   <use xlink:href="#gh"></use>
  //                 </svg>
  //               </span>
  //               <p>Most recent appearance: November 31, 2021</p>
  //             </div>
  //           </div>            
  //         </div>
      
  //       </div>
        
  //     </div>`;

});
