const fi = (function() {
  return {
    libraryMethod: function() {
      return 'Start by reading https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0'
    },
    
    each: function(coll, itr) {
      const newColl = (coll instanceof Array) ? coll.slice() : Object.values(coll)

      for (let i=0; i<newColl.length;i++)
      itr(newColl[i])

      return coll 
    },

    map: function(coll, itr) {
      if (!(coll instanceof Array))
      coll = Object.values(coll)

      const newArr = []

      for (let i=0;i<coll.length;i++)
        newArr.push(itr(coll[i]))

        return newArr
    },

    reduce: function(c=[], callback=() => {}, acc) {
      let coll = c.slice(0)

      if (!acc) {
        acc = coll[0]
        coll = coll.slice(1)
      }

      let len = coll.length;

      for (let i=0;i<len;i++) {
        acc = callback(acc, coll[i], coll)
      }
      return acc;
    },


    find: function(coll, pred) {
      if (!(coll instanceof Array))
      coll = Object.values(coll)

      for (let i=0;i<coll.length;i++)
      if (pred(coll[i])) return coll[i]
      
      return undefined

    },

    
    filter: function(coll, pred) {
      if (!(coll instanceof Array))
      coll = Object.values(coll)

      const newArr = []

      for (let i=0;i<coll.length;i++)
      if (pred(coll[i])) newArr.push (coll[i])

      return newArr
    },


    size: function(coll) {
      return (coll instanceof Array) ? coll.length : Object.keys(coll).length
    },


    first: function(coll, stop=false) {
      return (stop) ? coll.slice(0, stop) : coll[0]
    },


    last: function(coll, start=false) {
      return (start) ? coll.slice(coll.length-start, coll.length) : coll[coll.length-1]
    },


    compact: function(coll) {
      const bad = new Set([false, null, 0, "", undefined, NaN])
      return coll.filter(e => !bad.has(e))
    },


    sortBy: function(coll, cb) {
      const newArr = [...coll]
      return newArr.sort(function(a, b) {
        return cb(a) - cb(b)
      })
    },

    unpack: function(rec, arr) {
      for (let val of arr)
      rec.push(val)
    },

    flatten: function(coll, shallow, newArr=[]) {
      if (!Array.isArray(coll)) return newArr.push(coll)
      if (shallow) {
        for (let val of coll)
          Array.isArray(val) ? this.unpack(newArr, val) : newArr.push(val)
      } else {
        for (let val of coll) {
          this.flatten(val, false, newArr)
        }
      }
      return newArr
    },


    uniqSorted: function(coll, itr) {
      const sorted = [coll[0]]
      for (let i=1;i<coll.length;i++) {
        if (sorted[i-1] !== coll[i])
        sorted.push(coll[i])
      }
      return sorted 
    },


    uniq: function(coll, sorted=false, itr=false) {
      if (sorted) {
        return fi.uniqSorted(coll, itr)
      } else if (!itr) {
        return Array.from(new Set(coll))
      } else {
        const modVals = new Set()
        const uniqVals = new Set()
        for (let val of coll) {
          const moddedVal = itr(val)
          if (!modVals.has(moddedVal)) {
            modVals.add(moddedVal)
            uniqVals.add(val)
          }
        }
        return Array.from(uniqVals)
      }
    },


    keys: function(obj) {
      const keys=[]
      for (let key in obj){
        keys.push(key)
      }
      return keys
    },


    values: function(obj) {
      const values=[]
      for(let key in obj){
        values.push(obj[key])
      }
      return values 
    },


    functions: function(obj) {
      const functionNames=[]
      for(let key in obj) {
        if (typeof obj[key] === "function"){
          functionNames.push(key)
        }
      }
      return functionNames.sort()
    },







  }
})()

fi.libraryMethod()
