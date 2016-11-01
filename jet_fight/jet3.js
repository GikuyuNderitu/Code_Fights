function minimalBasketPrice(maxPrice, vendorsDelivery, vendorsProducts) {
    var vendors = vendorsProducts.map((val, idx)=>{
        return {
            products: val,
            time: vendorsDelivery[idx],
            vendor: idx
        }
    })

    //Map possible buying options to the minimum number of vendors needed to fulfill an order (implement a rectangle array)
    var needs = vendors.map(val=>{
      var notFound = []
      val.products.forEach((val, i)=>{
          if(val===-1) notFound.push(i)
      })

      return {
        needed: notFound,
        num: notFound.length
      }
    })

    var toCover = needs.filter(val=>{return val.num > 0})

    toCover.forEach((vendor, idx, arr)=>{
      vendor.needed.forEach(prod=>{

      })
    })

    console.log(toCover);

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
