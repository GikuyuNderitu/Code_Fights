function minimalBasketPrice(maxPrice, vendorsDelivery, vendorsProducts) {
    var vendors = vendorsProducts.map((val, idx)=>{
        return {
            products: val,
            time: vendorsDelivery[idx],
            vendor: idx
        }
    })

    //Map possible buying options to the minimum number of vendors needed to fulfill an order (implement a rectangle array)
    var needs = vendors.map((val,idx)=>{
      var notFound = []
      val.products.forEach((val, i)=>{
          if(val===-1) notFound.push(i)
      })

      return {
        needed: notFound,
        num: notFound.length,
        index: idx
      }
    })

    var toCover = needs.filter(val=>{return val.num > 0})
    var selfFulfill = needs.filter(val=> val.num ===0)

    //Map an array of objects with a value that contains vendors that will cover their product deficiency
    var coverage = toCover.map((curVend, idx)=>{

      curVend.viableVendors = curVend.needed.map((need,idx)=>{
        //Filter out the vendors that can cover the hole[s] that the current vendor has
        return {
          vendors: vendors.filter(vendor=>{return vendor.products[need] >= 1}),
          indexCovered: curVend.needed[idx]
        }
      })

      return curVend
    })

    selfFulfill = selfFulfill.filter((curVend, idx)=>{
      return vendors.find(val => val.vendor === curVend.index).products.reduce((prev, cur)=>{return prev+cur}) <= maxPrice
    })

    //Map coverage array to objects that will have their prospective products' aggregates totals under the maxPrice
    /*
      useable: true||false,
      vendorIndex: 0 <= indicies <= vendors.length,
      paired index: []
    */
    var costEffectivePairs = coverage.map((curVend, idx)=>{
      console.log('Evaluating vendor '+curVend.index);
      console.log('Length is '+ coverage.length);
      var canUse = false
      var curcost = vendors.find(val => val.vendor === curVend.index).products
      .reduce((prev, cur)=>{
        if(cur === -1) cur = 0
        return prev+cur
      },0)
      var reduceVend = {}
      console.log(curcost);

      //Filter out vendors that when combined with the current vendor, cannot meet the cost threshold(<=maxPrice)
      var returnedVendors = curVend.viableVendors.map((val,idx)=>{

        var mappedValues = val.vendors.map(vendor=>{
          return{
            cost: vendor.products[val.indexCovered],
            idx: vendor.vendor
          }
        }).filter(vendor=>{return vendor.cost + curcost <= maxPrice})

        console.log(mappedValues);

        return mappedValues
      })
      /*filter out possiblities whern the returned vendors has a length>1
        if returnedVendors.length > 1
          //iterate over first dimension and return  total a match with the indexes that pass the filter
          var matches = returnedVendors.map(val,idx=>{
          if(returnedVendors.indexOf(val)!==idx)
            //iterate over second dimension and return result
            var match =val.filter(vendor=>{
            return vendor.cost
          })
          if(match.length>0)

        })
      */
      returnedVendors = returnedVendors.map((val,idx)=>{
        var reducer = curcost
        console.log(returnedVendors.length);

      })


      //console.log(returnedVendors);


      return {
        useable: canUse,
        vendorIndex: curVend.index,
        pairs: returnedVendors
      }
    })

    //console.log(costEffectivePairs);
    //console.log(coverage[2].viableVendors[1].vendors);

    //Map buying options with prices and delivery times

    //filter
    var validVendors =[]

    var selectVendors = function(obj, idx, arr){
        return validVendors.includes(obj.vendor)
    }

    return vendors.filter(selectVendors).map(val=>{return val.vendor})
}

minimalBasketPrice(7,[5, 4, 2, 3], [[1,1,1],
 [3,-1,3],
 [-1,2,2],
 [5,-1,-1]])
