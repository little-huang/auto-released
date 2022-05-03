
function merge(left: Record<string, any>, right: Record<string, any>) {
  
  const data = {}
  
  Object.keys(left).forEach(key => {
    
    if (right[key]) {
      data[key] = right[key]
    } else {
      data[key] = left[key]
    }
    
  })
  
  return data
  
}

export {
  merge
}

export default {
  merge
}
