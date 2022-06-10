var ready = (callback) => {
  if (document.readyState != "loading") callback();
  else document.addEventListener("DOMContentLoaded", callback);
}

ready(() => { 
  /* Do things after DOM has fully loaded */

  const wrapper = document.querySelector('.rbg--schedule-wrap');
  const { length, 0: first, [length - 1]: last } = data;
  var initial = -1, h = -1;
  const options = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };

  for(let key of Object.keys(first)) {
    if (key === "schedule") {
    const dateVal = first["date"]; console.log(dateVal);
    const artistDetail = first[key]; console.log(artistDetail);
    let schedOrder = artistDetail.map(reviseSchedOrder);
    const event_date = getInitialDate(dateVal);
    //console.log(event_date); // 03/25/2022
    var [ convertMonth, convertDay, convertYear ] = event_date.split("/");
    var mm = new Date(`${convertYear}, ${convertMonth}, ${convertDay}`);
    // const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    // console.log(mm.toLocaleString('en-GB', options));
    console.log(mm.toLocaleString('en-UK', { month: 'long' }));
    // console.log(mm.toLocaleString('en-UK', { weekday: 'long' }));
    var d5 = new Date(event_date).getMonth();
    var d3 = new Date(Date.parse(event_date)); console.log(d3); // Fri Mar 25 2022 00:00:00 GMT+0000 (Greenwich Mean Time)
    let nams = first[key].reduce((acc, performer) => [...acc, parseInt(performer.duration.match(/\d+/gi))], []);
    console.log(nams);

    const tap = [];

    let m = first[key],
        ret = [];

    console.log(m);

        let qualifiers = m.reduce(arrangeSchedOrder, []);
        let qualFinalised = Array.from(new Set(qualifiers));
 
        console.log(qualifiers);

        //qualifiers.map(scheduleTemplate).join('')
    }

  }


  function getInitialDate(dtarg) {
    let dlarge = swapArrayElements(dtarg.split("/"), 0, 1).join("/");
    return dlarge;
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

  function reviseSchedOrder(detail) {
        let t, h, m;
        //h += 1; 
        console.log(detail);
        const def = ":";
        hrsMins = detail.time.split(def);
        // console.log(`${detail.artist.name} is on at ${hrsMins[0]}${def}${hrsMins[1]}`);
        // console.log(`${detail.artist.name} is on at ${detail.time}`);
        console.log(first["date"]);
        const ed = getInitialDate(first["date"]); 
        var [ cvMonth, cvDay, cvYear ] = ed.split("/");
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        console.log(`${cvYear}, ${cvMonth}, ${cvDay}`);
        var nd = new Date(`${cvYear}, ${cvMonth}, ${cvDay}`); //console.log(nd);
        const buildTime = {
          theYear: nd.toLocaleString('en-UK', { year: 'numeric' }),
          theMonth: nd.toLocaleString('en-UK', { month: 'long' }),
          theDay: nd.toLocaleString('en-UK', { day: 'numeric' })
        }
        //const nnd = new Date("`${buildTime.theMonth} ${buildTime.theDay}, ${buildTime.theYear} ${hrsMins[0]}:${hrsMins[1]}:00`");
        //const nnd = new Date("`${buildTime.theMonth} ${buildTime.theDay}, ${buildTime.theYear} ${hrsMins[0]}:${hrsMins[1]}:00`");
        const nnd = new Date(`${buildTime.theMonth} ${buildTime.theDay}, ${buildTime.theYear} ${hrsMins[0]}:${hrsMins[1]}:00`);
        const localTimeString = nnd.toLocaleTimeString(undefined, {
            hour:   '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });
        console.log(nnd);
        console.log(localTimeString);
  }
    const capitalizeString = str => str.replace(/b[a-z]/g, char => char.toUpperCase());
    //capitalizeString('niem vui lap trinh'); /* 'Niem Vui Lap Trinh' */

    function arrangeSchedOrder(q, qual) {
        let time, hours, mins;
        h += 1; console.log(h);
        const def = ":";
        ({ artist: { name }, time } = qual);

        if (!q.length) { // q.length === 0
            //console.log("There are no Records");
            q.push(qual); //console.log(q[h]);
        } else {
            initial +=1;
            let t;
            ({ time: t } = q[h-1]); console.log(t);
            const timeObj = {
                hours: t.split(":")[0],
                mins: t.split(":")[1],
                newHours: time.split(":")[0],
                newmMins: time.split(":")[1]
            }

            let figure = (timeObj.newHours === timeObj.hours) 
                ? timeObj.newmMins : timeObj.newHours; console.log(figure);
            let cron = (timeObj.newHours === timeObj.hours) ? "mins" : "hours"; //console.log(timeObj[`${cron}`]);
            (figure < timeObj[`${cron}`]) ? q.splice(h-1, 0, qual) : q.push(qual);
        }

        return q;
    }

      /**
    * Swap the elements in an array at indexes x and y.
    *
    * @param (a) The array.
    * @param (x) The index of the first element to swap.
    * @param (y) The index of the second element to swap.
    * @return {Array} The input array with the elements swapped.
    */
    // function swapArrayElements(a, x, y) {
    //   if (a.length === 1) return a;
    //   a.splice(y, 1, a.splice(x, 1, a[y])[0]);
    //   return a;
    // };

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
