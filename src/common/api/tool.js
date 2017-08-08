import qs from "qs"
import "whatwg-fetch"
import fetchJsonp from "fetch-jsonp"

function _get(url,baseargs){
    return new Promise((resolve,reject)=>{
        fetch(url+(baseargs?('?'+qs.stringify(baseargs)):''),{
            credentials:'include',
            headers: {
                'Content-Type': 'json'
            }
        })
        .then((data)=>{
            return data.json()
        })
        .then((res)=>{
            resolve(res.respD)
        })
        .catch(e=>{
            console.error(e)
        })
    })
    
  
}

function _mergePostData(data) {
  let urlEncodedData = ""
  let urlEncodedDataPairs = []
  for(name in data) {
      if(typeof data[name] !="object"){
            urlEncodedDataPairs.push(encodeURIComponent(name) + '=' + data[name])
      }else{
            urlEncodedDataPairs.push(encodeURIComponent(name) + '=' + encodeURIComponent(JSON.stringify(data[name])))
      }

  }
  urlEncodedData = urlEncodedDataPairs.join('&').replace(/%20/g, '+')
  return urlEncodedData
}

function _post(url,baseargs){
    return new Promise((resolve,reject)=>{
        fetch(url,{
            credentials:'include',
            method:'POST',
            body:_mergePostData(baseargs),
            headers: {
                'Content-Type': 'json'
            }
        })
        .then((data)=>{
            return data.json()
        })
        .then((res)=>{
            
            resolve(res.respD)
        })
        .catch(e=>{
            console.error(e)
        })
    })
    
}

function _fetchJonp(url,baseargs){
    return new Promise((resolve,reject)=>{
        fetchJsonp(url+(baseargs?('?'+qs.stringify(baseargs)):''))
        .then((data)=>{
            return data.json()
        })
        .then((res)=>{
            resolve(res.respD)
        })
        .catch(e=>{
            console.error(e)
        })
    })
        
}

function _local(res){
    return new Promise((resolve,reject)=>{
        resolve(res)
    });
}

export function local(urls){
    let _obj={};
    for (let item in urls){
        _obj[item] = function(baseargs){
            return _local(urls[item]);
        }
    }
    return _obj
}

export function get(urls){
    let _obj={};
    for (let item in urls){
        _obj[item] = function(baseargs){
            return _get(urls[item],baseargs);
        }
    }
    return _obj
}

export function post(urls){
    let _obj={};
    for (let item in urls){
        _obj[item] = function(baseargs){
            return _post(urls[item],baseargs);
        }
    }
    return _obj
}

export function jsonp(urls){
    let _obj={};
    for (let item in urls){
        _obj[item] = function(baseargs){
            return _fetchJonp(urls[item],baseargs);
        }
    }
    return _obj
}

export function all(getUrls,postUrls,fetchJsonpUrls){
    const _obj = {
        ...get(getUrls),
        ...post(postUrls),
        ...jsonp(fetchJsonpUrls)
    }
    return _obj;
}