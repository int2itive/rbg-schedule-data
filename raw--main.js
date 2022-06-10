var ready = (callback) => {
  if (document.readyState != "loading") callback();
  else document.addEventListener("DOMContentLoaded", callback);
}

ready(() => { 
  /* Do things after DOM has fully loaded */

  const wrapper = document.querySelector('.rbg--schedule-wrap');
  const { length, 0: first, [length - 1]: last } = data; console.log(first);

  for(let key of Object.keys(first)) {
    if (key === "schedule") {
    // Next line appears to work on multiple word strings only
    //console.log(`%c ${key.replace(/b[a-z]/g, char => char.toUpperCase())}`, 'font-size: 3em; color: #f57f25;');
    // A less elegant solution to the preferred regex implementation on ln 19
    //console.log(`%c ${key.charAt(0).toUpperCase() + key.slice(1)}`, 'font-size: 3em; color: #f57f25;');
    console.log(`%c ${key.replace(/\w/, firstLetter => firstLetter.toUpperCase())}`, 'font-size: 3em; color: #f57f25;');
    //console.log(first[key]);
    const tap = [];
    var init = -1;

    let m = first[key],
        ret = [];

    console.log(m);

        let qualifiers = m.reduce(arrangeSchedOrder, []);
        let qualFinalised = Array.from(new Set(qualifiers));
 
        console.log(qualFinalised);

        m.forEach((person, index) => {
            init += 1;
            // const { status, 
            //     artist: {name}, 
            //     time, 
            //     duration } = person;
            tap[index] = person;

            // if (tap.length > 1) {
            //     let time, hours, mins;
            //     const def = ":";
            //     ({ time } = person);
            //     hours = time.split(":")[0]
            //     mins = time.split(":")[1];
            //     console.log(`${hours}${def}${mins}`);
            // }
            //console.log(`%c ${name}: ${time}, 
 //${duration}`, 'font-size: 1.3em; color: firebrick;');
            //console.log(`${time.split(":")[0]}`)
            // console.log(tap.length);
            // console.log({ artist: {name} } = tap[index]);
        });
    }

  }

    const capitalizeString = str => str.replace(/b[a-z]/g, char => char.toUpperCase());
    //capitalizeString('niem vui lap trinh'); /* 'Niem Vui Lap Trinh' */

    function arrangeSchedOrder(q, qual) {
        let time, hours, mins;
        const def = ":";
        ({ artist: { name }, time } = qual);

        if (q.length === 0) { 
            q.push(qual);
        } else {
            // console.log(q.length);
            console.log(q.length);
            console.log(name);
            //console.log(qual);
            let t;
            hours = time.split(":")[0];
            mins = time.split(":")[1];
            // console.log(hours);
            q.forEach((rec, index) => {
                let cron;
                ({ time: t } = rec);
                let figure = (hours === t.split(":")[0]) ? mins : hours;
                cron = (figure === hours) ? 0 : 1;
                if (figure < t.split(":")[cron]) { 
                    q.splice(index, 0, qual);
                }
            });
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
    function swapArrayElements(a, x, y) {
      if (a.length === 1) return a;
      a.splice(y, 1, a.splice(x, 1, a[y])[0]);
      return a;
    };

});
