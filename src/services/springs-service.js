import apiFetch from "./api-fetch"

export async function getSprings(brand, model, pos, year, vers ){
  const searchUrls = []
  if(brand) searchUrls.push(`brand=${brand}`)
  if(model) searchUrls.push(`model=${model}`)
  if(pos) searchUrls.push(`position=${pos}`)
  if(year) searchUrls.push(`year=${year}`)
  if(vers) searchUrls.push(`version=${vers}`)
  const url = 'codes?' + searchUrls.join('&&')
  const codes =  await apiFetch(url)
  console.log("CODES",codes)
  return codes
  
}